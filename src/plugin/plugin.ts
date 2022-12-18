/**
 * This file runs within Figma and has access to the Figma project
 */

import type { Message } from '../ui/types';

const API_KEY_FIGMA_STORAGE_KEY = 'beta_key';

async function runPlugin() {
  // ? Initialize text box & fonts
  // Get the selected text
  const selection = figma.currentPage.selection;

  // Ensure exactly 1 node selected and it's a text node
  if (selection.length !== 1 || selection[0].type !== 'TEXT') {
    return figma.closePlugin('Writer says: Please select a single text layer');
  }

  const textBox = selection[0] as TextNode;

  // Load all fonts for the currently selected text box
  const fonts = textBox.getRangeAllFontNames(0, textBox.characters.length);

  try {
    await Promise.all(fonts.map(figma.loadFontAsync));
  } catch (e: any) {
    return figma.closePlugin(
      'Writer says: Please install or replace missing fonts'
    );
  }

  // ? Get API key
  // Check for API key in local storage
  const apiKey = await figma.clientStorage.getAsync(API_KEY_FIGMA_STORAGE_KEY);

  // Prepare message to send from Figma to UI
  const message: Message = { type: 'F2U_init' };

  if (apiKey) {
    message.data = { apiKey };
  }

  // Send the message and show
  figma.showUI(__html__, { width: 300, height: 502 });
  figma.ui.postMessage(message);

  // ? Handle response from UI
  figma.ui.onmessage = async (messageStr: string) => {
    const u2fMessage: Message = JSON.parse(messageStr);

    // Check the message type
    switch (u2fMessage.type) {
      // * Handle write
      case 'U2F_write': {
        // Update text box
        textBox.characters = u2fMessage.data;
        return;
      }

      // * Handle cache key
      case 'U2F_cache_key': {
        // Cache the valid key in figma storage
        const validatedKey = u2fMessage.data;
        await figma.clientStorage.setAsync(
          API_KEY_FIGMA_STORAGE_KEY,
          validatedKey
        );
        return;
      }

      // * Handle close
      case 'U2F_close': {
        // Close the plugin, show message if present
        figma.closePlugin(u2fMessage.error);
      }
    }
  };
}

runPlugin();

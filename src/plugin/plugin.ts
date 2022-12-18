// @ts-ignore
async function runPlugin() {
  console.log('plugin start');

  // Show the plugin UI
  figma.showUI(__html__, { width: 320, height: 394 });

  // Get the selected text
  const selection = figma.currentPage.selection;

  // Ensure exactly 1 node selected and it's a text node
  if (selection.length !== 1 || selection[0].type !== 'TEXT') {
    figma.closePlugin('Please make sure you select a single text layer');
  }

  const textBox = selection[0] as TextNode;

  // Load all fonts for the currently selected text box
  const fonts = textBox.getRangeAllFontNames(0, textBox.characters.length);

  try {
    await Promise.all(fonts.map(figma.loadFontAsync));
  } catch (e) {
    console.log('error:', e);
    figma.closePlugin('Please install or replace missing fonts');
  }

  // Await message from input
  figma.ui.onmessage = async (message) => {
    console.log('onmessage called');
    // TODO: update the UI with the confirm prompt

    // Update the textbox with the result
    textBox.characters = message;

    // End
    figma.closePlugin();
  };
}

runPlugin();

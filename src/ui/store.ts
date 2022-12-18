import { createGlobalState } from 'react-hooks-global-state';

import type { State } from './types';

const initialState: State = {
  // Online status
  online: window.navigator.onLine,
  // UI screens
  showKeyEntry: false,
  showSettings: false,
  // Notifications
  showNotification: false,
  notificationError: '',
  notificationMessage: '',
  // Loading
  loading: false,
  // Key
  apiKey: '',
  apiKeyInput: '',
  // Form state
  contentType: 'product copy',
  subject: '',
  wordCount: undefined,
  tone: 'neutral',
  readingLevel: 'child',
  didWrite: false,
};

export const useGlobalState = createGlobalState(initialState).useGlobalState;

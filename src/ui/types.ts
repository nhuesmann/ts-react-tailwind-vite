export interface Message {
  type: 'F2U_init' | 'U2F_cache_key' | 'U2F_write' | 'U2F_close';
  data?: any;
  error?: string;
}

export interface FigmaToUiMessage {
  data: {
    pluginMessage: Message;
  };
}

export interface State extends WriterPrompt {
  // Online status
  online: boolean;
  // UI screens
  showKeyEntry: boolean;
  showSettings: boolean;
  // Notifications
  showNotification: boolean;
  notificationError: string;
  notificationMessage: string;
  // Loading
  loading: boolean;
  // Key
  apiKey: string;
  apiKeyInput: string;
  // Form state
  // ...WriterPrompt
  didWrite: boolean;
}

export type ContentTypeOption =
  | 'product copy'
  | 'marketing copy'
  | 'legal copy'
  | 'a file name'
  | 'a review';
export type ToneOption = 'neutral' | 'friendly' | 'funny' | 'urgent';
export type ReadingLevelOption = 'child' | 'teen' | 'adult' | 'academic';
export type SelectOption<T> = {
  value: T;
  label: string;
};

// * NOTE: this is the same type as RequestBody from backend
export interface WriterPrompt {
  contentType: ContentTypeOption;
  subject: string;
  wordCount?: number;
  tone: ToneOption;
  readingLevel: string;
}

export interface ServerResponse {
  error?: string;
  success?: boolean;
  copy?: string;
}

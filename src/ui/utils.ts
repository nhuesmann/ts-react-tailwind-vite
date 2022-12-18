import type { Message, ServerResponse, WriterPrompt } from './types';

export const sendMessageToFigma = (message: Message) => {
  parent.postMessage(
    { pluginMessage: JSON.stringify(message) },
    { targetOrigin: '*' }
  );
};

// TODO: node_env for this vs prod endpoint? Do I care?
const API_URL_BASE = 'https://figma-writer-backend.nhuesmann.workers.dev/api';

function formatHeaders(apiKey: string) {
  return {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  };
}
export const authenticateKey = (apiKey: string): Promise<ServerResponse> => {
  const endpoint = `${API_URL_BASE}/auth`;
  return fetch(endpoint, {
    method: 'GET',
    headers: formatHeaders(apiKey),
  }).then((res) => res.json());
};

export const write = (
  apiKey: string,
  prompt: WriterPrompt
): Promise<ServerResponse> => {
  const endpoint = `${API_URL_BASE}/write`;
  return fetch(endpoint, {
    method: 'POST',
    headers: formatHeaders(apiKey),
    body: JSON.stringify(prompt),
  }).then((res) => res.json());
};

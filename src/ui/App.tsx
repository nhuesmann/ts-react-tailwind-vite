import './App.css';

import React, { useEffect } from 'react';

import {
  ErrorNotification,
  EventListener,
  KeyEntry,
  Settings,
  Writer,
} from './components';
import { useGlobalState } from './store';
import type { FigmaToUiMessage } from './types';

function App() {
  const [showKeyEntry, setShowKeyEntry] = useGlobalState('showKeyEntry');
  const [showSettings, setShowSettings] = useGlobalState('showSettings');
  const [_, setApiKey] = useGlobalState('apiKey');
  const [online, setOnline] = useGlobalState('online');
  const [error, setError] = useGlobalState('notificationError');
  const [__, setShowNotification] = useGlobalState('showNotification');

  function onSettingsClick() {
    setShowSettings(true);
  }

  function onBackArrowClick() {
    setShowSettings(false);
  }

  const handleMessage = (msg: FigmaToUiMessage) => {
    // Handle init
    if (msg.data.pluginMessage.type === 'F2U_init') {
      const apiKey = msg.data.pluginMessage.data?.apiKey;

      // If no apiKey, show key entry
      if (!apiKey?.length) {
        setShowKeyEntry(true);
        return;
      }

      // Otherwise, set in store
      setApiKey(apiKey);
    }
  };

  const handleOnlineStatusChange = () => {
    setOnline(window.navigator.onLine);
  };

  // Show/hide notification based on online status
  useEffect(() => {
    if (!online) {
      setError('Writer needs an internet connection');
      setShowNotification(true);
      return;
    }

    if (error.length && online) {
      setError('');
      setShowNotification(false);
    }
  }, [online]);

  return (
    <EventListener
      onMessage={handleMessage}
      onOnlineStatusChange={handleOnlineStatusChange}
    >
      <div className="App">
        <div className="plugin">
          {showSettings ? (
            <Settings onBackArrowClick={onBackArrowClick} />
          ) : (
            <Writer onSettingsClick={onSettingsClick} />
          )}
          {showKeyEntry ? <KeyEntry /> : null}
          <ErrorNotification dismissable={online} />
        </div>
      </div>
    </EventListener>
  );
}

export default App;

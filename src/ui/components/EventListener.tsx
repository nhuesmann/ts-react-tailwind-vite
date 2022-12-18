import React from 'react';

import type { FigmaToUiMessage } from '../types';

interface Props {
  onMessage: (message: FigmaToUiMessage) => void;
  onOnlineStatusChange: () => void;
  children?: React.ReactNode;
}

export class EventListener extends React.Component<Props> {
  componentDidMount(): void {
    window.addEventListener('message', this.handleMessage);
    window.addEventListener('online', this.handleOnlineStatusChange);
  }

  componentWillUnmount(): void {
    window.removeEventListener('message', this.handleMessage);
    window.addEventListener('offline', this.handleOnlineStatusChange);
  }

  handleMessage = (msg: FigmaToUiMessage) => {
    this.props.onMessage(msg);
  };

  handleOnlineStatusChange = () => {
    this.props.onOnlineStatusChange();
  };

  render() {
    return this.props.children;
  }
}

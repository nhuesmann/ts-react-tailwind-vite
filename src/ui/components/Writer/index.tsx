import React, { FC, MouseEventHandler } from 'react';

import { ModuleSpacing } from '../_shared';
import { Buttons } from './Buttons';
import { ContentType } from './ContentType';
import { WriterHeader } from './Header';
import { ReadingLevel } from './ReadingLevel';
import { Subject } from './Subject';
import { Tone } from './Tone';
import { WordCount } from './WordCount';

interface Props {
  onSettingsClick: MouseEventHandler;
}

// TODO: VALIDATE all fields filled, disable button until then!

export const Writer: FC<Props> = ({ onSettingsClick }) => {
  return (
    <>
      <WriterHeader onClick={onSettingsClick} />
      <div className="content-padding writer">
        <form>
          <ContentType />
          <Subject />
          <div className="row">
            <WordCount />
            <div className="horizontal-spacing" />
            <Tone />
          </div>
          <ReadingLevel />
          <ModuleSpacing />
          <Buttons />
        </form>
      </div>
    </>
  );
};

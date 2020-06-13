import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Message from '../Message/Message';
import * as S from './style';

import { authorColors } from '../../utils/colors';
import ContextActionBar from '../ContextActionsBar/ContextActionBar';
const MessageViewer = ({ media, messages, limit }) => {
  const [selectedMessages, setSelectedMessages] = useState([]);

  const participants = Array.from(
    new Set(messages.map(({ author }) => author)),
  ).filter(author => author !== 'System');

  const activeUser = participants[1];

  const colorMap = participants.reduce((obj, participant, i) => {
    return { ...obj, [participant]: authorColors[i % authorColors.length] };
  }, {});

  const renderedMessages = messages.slice(0, limit);
  const isLimited = renderedMessages.length !== messages.length;

  const updateSelectedMessages = (m, check) => {
    let newMessages = selectedMessages;
    if (check) {
      if (selectedMessages.indexOf(m) === -1) {
        newMessages = newMessages.concat(m);
      }
    }

    if (!check) {
      if (newMessages.indexOf(m) !== -1) {
        newMessages.splice(newMessages.indexOf(m), 1);
      }
    }
    setSelectedMessages(selectedMessages => [...newMessages]);
    console.log(selectedMessages, newMessages);
  };

  return (
    <S.Container>
      <ContextActionBar visible={selectedMessages.length <= 0 ? false : true} />
      {messages.length > 0 && (
        <S.P>
          <S.Info>
            Showing {isLimited ? 'first' : 'all'} {renderedMessages.length}{' '}
            messages {isLimited && <span>(out of {messages.length})</span>}
          </S.Info>
        </S.P>
      )}

      <S.List>
        {renderedMessages.map((message, i, arr) => {
          const prevMessage = arr[i - 1];
          let attachedMedia = null;
          if (media.length) {
            media.forEach(jpeg => {
              if (message.message.includes(jpeg.name)) {
                attachedMedia = jpeg;
              }
            });
          }

          return (
            <Message
              key={i} // eslint-disable-line react/no-array-index-key
              selectedMessages={selectedMessages}
              onselect={updateSelectedMessages}
              message={message}
              media={attachedMedia}
              color={colorMap[message.author]}
              isActiveUser={activeUser === message.author}
              sameAuthorAsPrevious={
                prevMessage && prevMessage.author === message.author
              }
            />
          );
        })}
      </S.List>
    </S.Container>
  );
};

MessageViewer.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      author: PropTypes.string,
      message: PropTypes.string,
    }),
  ).isRequired,
  media: PropTypes.arrayOf(PropTypes.object),
  limit: PropTypes.number,
};

MessageViewer.defaultProps = {
  limit: Infinity,
  media: null,
};

export default React.memo(MessageViewer);

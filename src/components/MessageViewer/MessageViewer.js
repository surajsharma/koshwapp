import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Message from '../Message/Message';
import * as S from './style';

import { authorColors } from '../../utils/colors';
import ContextActionBar from '../ContextActionsBar/ContextActionBar';
import TaggingWindow from '../TaggingWindow/TaggingWindow';

let setDisplayedMessagesFlag = false;

const MessageViewer = ({ media, messages, limit, deleteMessages }) => {
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [showTaggingWindow, setShowTaggingWindow] = useState(false);
  const [allCurrentTags, setCurrentTags] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);

  if (messages.length && !setDisplayedMessagesFlag) {
    setDisplayedMessagesFlag = true;
    setDisplayedMessages(messages);
  }

  const participants = Array.from(
    new Set(displayedMessages.map(({ author }) => author)),
  ).filter(author => author !== 'System');

  const activeUser = participants[1];

  const colorMap = participants.reduce((obj, participant, i) => {
    return { ...obj, [participant]: authorColors[i % authorColors.length] };
  }, {});

  const renderedMessages = displayedMessages.slice(0, limit);
  const isLimited = renderedMessages.length !== displayedMessages.length;

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
      if (newMessages.length === 0) {
        setShowTaggingWindow(false);
      }
    }
    console.log('new message s/u');
    setSelectedMessages(selectedMessages => [...newMessages]);
  };

  const uploadHandler = e => {
    console.log(e);
  };

  const linkHandler = e => {
    console.log(e);
  };

  useEffect(() => {
    console.log('rerender');
  }, [displayedMessages]);
  const deleteHandler = e => {
    let newMessages = displayedMessages;
    selectedMessages.forEach(selectedMsg => {
      displayedMessages.forEach(msg => {
        if (msg.id === selectedMsg) {
          newMessages.splice(newMessages.indexOf(msg), 1);
        }
      });
    });
    setDisplayedMessages(newMessages);
    setSelectedMessages(selectedMessages => []);
  };

  const tagHandler = e => {
    if (selectedMessages.length !== 0) {
      setShowTaggingWindow(!showTaggingWindow);
    }
  };

  const addTags = tag => {
    // add tags to all currently selected messages
    // setSelectedMessages(selectedMessages => [...newMessages]);
    let newTags = allCurrentTags;
    selectedMessages.forEach(selectedMsg => {
      displayedMessages.forEach(msg => {
        if (msg.id === selectedMsg) {
          msg.tags = tag;
          newTags = msg.tags;
        }
      });
    });

    setCurrentTags(allCurrentTags => [...newTags]);
  };

  return (
    <S.Container>
      <ContextActionBar
        uploadHandler={uploadHandler}
        linkHandler={linkHandler}
        deleteHandler={deleteHandler}
        tagHandler={tagHandler}
        visible={selectedMessages.length <= 0 ? false : true}
      />

      <TaggingWindow
        visible={showTaggingWindow && selectedMessages.length !== 0}
        tags={allCurrentTags}
        addTags={addTags}
      />

      {displayedMessages.length > 0 && (
        <S.P>
          <S.Info>
            Showing {isLimited ? 'first' : 'all'} {renderedMessages.length}{' '}
            messages{' '}
            {isLimited && <span>(out of {displayedMessages.length})</span>}
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

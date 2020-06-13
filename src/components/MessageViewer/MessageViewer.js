import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Message from '../Message/Message';
import * as S from './style';

import { authorColors } from '../../utils/colors';
import ContextActionBar from '../ContextActionsBar/ContextActionBar';
import TaggingWindow from '../TaggingWindow/TaggingWindow';

const MessageViewer = ({ media, messages, limit }) => {
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [showTaggingWindow, setShowTaggingWindow] = useState(false);
  const [allCurrentTags, setCurrentTags] = useState([]);

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
      if (newMessages.length === 0) {
        setShowTaggingWindow(false);
      }
    }
    setSelectedMessages(selectedMessages => [...newMessages]);
  };

  const uploadHandler = e => {
    console.log(e);
  };

  const linkHandler = e => {
    console.log(e);
  };

  const deleteHandler = e => {
    console.log(e);
  };

  const tagHandler = e => {
    if (selectedMessages.length !== 0) {
      setShowTaggingWindow(!showTaggingWindow);
    }
  };

  const addTags = tags => {
    // add tags to all currently selected messages
    // setSelectedMessages(selectedMessages => [...newMessages]);
    setCurrentTags(allCurrentTags => [...tags]);
    console.log(tags);
  };

  useEffect(() => {
    if (selectedMessages.length !== 0) {
      console.log('update tags');
      let newTags = allCurrentTags;
      selectedMessages.forEach(selectedMsg => {
        messages.forEach(msg => {
          if (msg.id === selectedMsg) {
            msg.tags = newTags; /*  */
          }
        });
      });
    }
  }, [setCurrentTags, allCurrentTags]);

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

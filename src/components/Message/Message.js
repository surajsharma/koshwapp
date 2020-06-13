import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../CheckBox/CheckBox';
import * as S from './style';

const intlOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const Message = ({
  media,
  message,
  color,
  isActiveUser,
  sameAuthorAsPrevious,
  onselect,
}) => {
  const [check, setCheck] = useState(true);

  const isSystem = message.author === 'System';
  const dateTime = message.date
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  const handleCheck = () => {
    setCheck(!check);
    onselect(message.id, check);
  };

  return (
    <>
      <S.Item
        isSystem={isSystem}
        isActiveUser={isActiveUser}
        sameAuthorAsPrevious={sameAuthorAsPrevious}
      >
        <S.Bubble isSystem={isSystem} isActiveUser={isActiveUser}>
          <Checkbox checked={check} onChange={handleCheck} />{' '}
          <S.Wrapper>
            <S.MessageTop>
              {!isSystem && !sameAuthorAsPrevious && (
                <S.Author color={color}>{message.author}</S.Author>
              )}
            </S.MessageTop>
            {media ? <img src={media.src} alt="img" width="200px" /> : null}
            <S.Message>{message.message}</S.Message>
          </S.Wrapper>
          {!isSystem && (
            <S.Date dateTime={dateTime}>
              {new Intl.DateTimeFormat('default', intlOptions).format(
                message.date,
              )}
            </S.Date>
          )}
        </S.Bubble>
      </S.Item>
    </>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    author: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  media: PropTypes.objectOf(PropTypes.object),
  color: PropTypes.string,
  isActiveUser: PropTypes.bool,
  sameAuthorAsPrevious: PropTypes.bool,
};

Message.defaultProps = {
  color: 'black',
  isActiveUser: false,
  sameAuthorAsPrevious: false,
  media: null,
};

export default Message;

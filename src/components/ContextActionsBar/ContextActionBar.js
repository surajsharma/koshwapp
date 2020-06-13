import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';

const ContextActionBar = ({
  visible,
  uploadHandler,
  linkHandler,
  deleteHandler,
  tagHandler,
}) => {
  const clickhandler = e => {
    console.log(e.target);
  };

  return visible ? (
    <S.Container>
      <S.Button onClick={uploadHandler}>Upload</S.Button>
      <S.Button onClick={linkHandler}>Link</S.Button>
      <S.Button onClick={deleteHandler}>Delete</S.Button>
      <S.Button secondary onClick={tagHandler}>
        Tags
      </S.Button>
    </S.Container>
  ) : null;
};

ContextActionBar.propTypes = {
  visible: PropTypes.bool.isRequired,
};

ContextActionBar.defaultProps = {};

export default ContextActionBar;

import React from 'react';
import PropTypes from 'prop-types';
import * as S from './style';

const ContextActionBar = ({ visible }) => {
  const clickhandler = e => {
    console.log(e.target);
  };

  return visible ? (
    <S.Container>
      <S.Button onClick={clickhandler}>Upload</S.Button>
      <S.Button onClick={clickhandler}>Link</S.Button>
      <S.Button onClick={clickhandler}>Delete</S.Button>
      <S.Button secondary onClick={clickhandler}>
        Tag
      </S.Button>
    </S.Container>
  ) : null;
};

ContextActionBar.propTypes = {
  visible: PropTypes.bool.isRequired,
};

ContextActionBar.defaultProps = {};

export default ContextActionBar;

import React from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';

import * as S from './style';
import 'react-tagsinput/react-tagsinput.css';

const TaggingWindow = ({ visible }) => {
  return visible ? (
    <S.Container>
      <TagsInput value={[]} onChange={() => console.log('change tags')} />
      <p>Type a tag name and press enter</p>
    </S.Container>
  ) : null;
};

TaggingWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
};

TaggingWindow.defaultProps = {};

export default TaggingWindow;

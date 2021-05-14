import React from 'react';
import PropTypes from 'prop-types';

import StoryMetadata from '../StoryMetadata/StoryMetadata';
import classes from './Comment.module.css';

import ThemeContext from '../../contexts/theme';

const Comment = (props) =>{
  const theme = React.useContext(ThemeContext);
  return(
        <div className={classes[`Comment-${theme}`]}>
        <StoryMetadata by={props.by} time={props.time}/>
            <p dangerouslySetInnerHTML={{__html: props.text}}></p>
        </div>
  );
};

Comment.propTypes = {
  by: PropTypes.string,
  time: PropTypes.number,
  text: PropTypes.string,
};

export default Comment;



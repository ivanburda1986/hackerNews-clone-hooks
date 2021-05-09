import React from 'react';
import PropTypes from 'prop-types';

import StoryMetadata from '../StoryMetadata/StoryMetadata';
import classes from './Comment.module.css';

import {ThemeConsumer} from '../../contexts/theme';


const Comment = (props) =>{
  const {theme} = React.useContext(ThemeConsumer);
  return(
        <div className={classes[`Comment-${theme}`]}>
        <StoryMetadata by={props.by} time={props.time}/>
            <p dangerouslySetInnerHTML={{__html: props.text}}></p>
        </div>
  );
};

export default Comment;

Comment.propTypes = {
  by: PropTypes.string,
  time: PropTypes.number,
  text: PropTypes.string,
};
import React from 'react';
import PropTypes from 'prop-types';

import Title from './Title';
import StoryMetadata from '../StoryMetadata/StoryMetadata';

import classes from './Story.module.css';



const Story = (props) => {
  return(
   <React.Fragment>
    <li className={classes.Story}>
     <Title data={{id: props.id, title: props.title, url: props.url}}/>
     <StoryMetadata 
      by={props.by} 
      time={props.time} 
      commentCount={props.commentCount} 
      id={props.id}
     />
   </li>
   </React.Fragment>
  );  
}

Story.propTypes = {
  id: PropTypes.number,
  url: PropTypes.string,
  title: PropTypes.string,
  by: PropTypes.string,
  time: PropTypes.number.isRequired,
  comments: PropTypes.array,
  commentCount: PropTypes.number
}

export default Story;





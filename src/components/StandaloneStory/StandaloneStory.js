import React from 'react';
import queryString from 'query-string';

import {fetchCommentedStory} from '../../utils/api';

import classes from './StandaloneStory.module.css';

import Loading from '../Loading/Loading';
import StoryMetadata from '../StoryMetadata/StoryMetadata';
import Comment from '../Comment/Comment';

//Reducer
function fetchStandaloneStoryReducer(state,action){
  if(action.type ==="fetch"){
    return{
      ...state,
      loading: true
    }
  } else if(action.type ==="success"){
    return{
      ...state,
      storyDetails: action.data.storyDetails,
      storyComments: action.data.storyComments,
      loading: false,
    }
  } else{
    throw new Error("Unsupported action type");
  }
}

//Component
const StandaloneStory =(props)=>{
  const [state, dispatch] = React.useReducer(
    fetchStandaloneStoryReducer,
    {
      storyDetails: [],
      storyComments: [],
      loading: true
    }
  );
  const id = queryString.parse(props.location.search);

  React.useEffect(()=>{
    getStory(id.id);
  },[id]);

  const getStory = (id) => {
    fetchCommentedStory(id)
      .then((data)=>{
        console.log(data);
        dispatch({type:"success", data})
      })
      .catch((error)=>console.log(error));
  };

  if(state.loading){
    return <Loading text="Loading"/>;
  }
  return(
    <React.Fragment>
    <h1 className={classes.Title}>{state.storyDetails.title}</h1>
      <StoryMetadata 
        by={state.storyDetails.by} 
        time={state.storyDetails.time} 
        commentCount={state.storyDetails.kids ? state.storyDetails.kids.length : 0} 
        id={state.storyDetails.id}
      />
      <div className={classes.Text} dangerouslySetInnerHTML={{__html: state.storyDetails.text}}></div> 
      <ul>
       {state.storyComments.map((comment)=><Comment 
          key={comment.id}
          id={comment.id}
          text={comment.text}
          by={comment.by}
          time={comment.time}
        />)}
      </ul>
    </React.Fragment>
  );
}

export default StandaloneStory;

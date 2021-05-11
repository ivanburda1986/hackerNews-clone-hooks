import React from 'react';

import Loading from '../../components/Loading/Loading';
import Story from '../../components/Story/Story';

import {fetchStories} from '../../utils/api';


function fetchStoriesReducer(state, action){
if(action.type === "success"){
    return{
      stories: action.stories,
      loading: false,
      error: null,
    }
  }else if(action.type === "error"){
    return{
      ...state,
      error: action.message,
      loading: false,
    }
  } else{
    throw new Error ("That action type is not supported.");
  }
}

const StoriesFeed = (props) => {
  const [storyType, setStoryType] = React.useState(props.storyType);
  const [state, dispatch] = React.useReducer(
    fetchStoriesReducer,
    {
      stories: [],
      loading: true,
      error: null,
    }
  );

  React.useEffect(()=>{
    setStoryType(props.storyType);
  },[props]);

  React.useEffect(()=>{
    fetchStories(storyType)
    .then((data)=>dispatch({
      type: 'success',
      stories: data,
    }))
    .catch(({message})=>dispatch({
      type: 'error',
      message,
    }))
  },[storyType]);

  let storiesDisplay = [...state.stories];
  storiesDisplay = storiesDisplay.map(story=>(
      <Story
        key={story.id}
        id={story.id}
        url={story.url}
        title={story.title}
        by={story.by}
        time={story.time}
        comments={story.kids}
        commentCount={story.kids ? story.kids.length : 0}
      />
    ));

    if(storiesDisplay.length===0){
      storiesDisplay = <p>No stories yet</p>
    }

    if(state.loading){
      return <Loading text="Loading"/>
    } 

    return(
      <React.Fragment>
        <ul>
          {storiesDisplay}
        </ul>
      </React.Fragment>
    );
};

export default StoriesFeed;
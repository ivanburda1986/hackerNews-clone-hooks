import React from 'react';
import queryString from 'query-string';

import Loading from '../Loading/Loading';
import Story from '../Story/Story';

import classes from './User.module.css';

import {getHumanDate} from '../../utils/convertors';
import {getUserData, getItemDetails} from '../../utils/api';

//Reducers
function userReducer(state,action){
  if(action.type === "fetch"){
    return{
      ...state,
      userLoading: true
    }
  } else if(action.type === "success"){
    return{
      ...state,
      userDetails: action.data,
      userLoading: false,
    }
  } else {
    throw new Error ("Unsupported action type");
  }
}

function storiesReducer(state,action){
  if(action.type === "fetch"){
    return{
      ...state,
      storyLoading: true
    }
  } else if(action.type === "success"){
    return{
      ...state,
      storyDetails: action.data,
      storyLoading: false,
    }
  } else {
    throw new Error ("Unsupported action type");
  }
}

//Component
const User = (props)=>{
  const id = queryString.parse(props.location.search);

  const[user,setUser] = React.useReducer(userReducer,{userDetails: [], userLoading: true});
  const[stories,setStories] = React.useReducer(storiesReducer,{storyDetails: [], storyLoading: true});

  React.useEffect(()=>{
    getUser();
  },[getUser])

  const getUser = () => {
    getUserData(id.id)
      .then((data)=>setUser({
        type: "success",
        data: data
      }))
      .catch((error)=>console.log(error));
  };

  React.useEffect(()=>{
    if(user.userDetails.submitted !==undefined){
      getUsersStories(user.userDetails.submitted);
    }
  },[user]);

  const getUsersStories = async (storyIds) => {
    console.log("Started fetching user's stories");
    const data = [];
    for(let index = 0; index < storyIds.length; index++){
      const story = storyIds[index];
      const storyDetails = await getItemDetails(story);
      if(storyDetails.type === "story" && !storyDetails.deleted){
        data.push(storyDetails);
      }
    }
    console.log("Finished fetching user's stories");
    setStories({
      type:"success",
      data: data
    })
  };

  const userDisplay = () => {
    if(user.userLoading){
      return <Loading text="Loading"/>
    } else {
      return (
        <div className={classes.UserDisplay}>
          <h1 className={classes.Header}>{user.userDetails.id}</h1>
          <p>{`Joined on ${getHumanDate(user.userDetails.created)}, has karma ${user.userDetails.karma}`}</p>
          <p dangerouslySetInnerHTML={{__html: user.userDetails.about}}></p>
        </div>
      );
    }
  };

  const storiesDisplay = () => {
    if(stories.storyLoading){
      return <Loading text="Loading"/>;
    } else if(stories.storyDetails.length === 0){
        return(<p>No posts yet</p>)
    }
     else {
      return (
        stories.storyDetails.map((story)=>
        <Story 
          key={story.id} 
          id={story.id} 
          title={story.title} 
          url={story.url} 
          by={story.by} 
          time={story.time} 
          commentCount={story.kids ? story.kids.length : 0}
        />)
      );
    }
  };

  return(
    <React.Fragment>
      {userDisplay()}
      <h1 className={classes.Header}>Posts</h1>
      {storiesDisplay()}
    </React.Fragment>
  )
}

export default User;

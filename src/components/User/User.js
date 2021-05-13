import React from 'react';
import queryString from 'query-string';

import Loading from '../Loading/Loading';
import Story from '../Story/Story';

import classes from './User.module.css';

import {getHumanDate} from '../../utils/convertors';
import {getUserData, getItemDetails} from '../../utils/api';


const User = (props) =>{
  const [userDetailsState, setUserDetailsState] = React.useState([]);
  const [storyDetailsState, setstoryDetailsState] = React.useState([]);
  const [userLoading, setUserLoading] = React.useState(false);
  const [storiesLoading, setStoriesLoading] = React.useState(false);
  
  

  React.useEffect(()=>{
    const id = queryString.parse(props.location.search);
    getUser(id.id);
  },[props]);
  
  const getUser = (id) => {
    setUserLoading(true);
    getUserData(id)
      .then((data)=>{
        setUserDetailsState(data);
        console.log(data);
        setUserLoading(false);
      })
      .catch((error)=>console.log(error));
  };

  React.useEffect(()=>{
    if(userDetailsState.submitted!==undefined){
      console.log("Comment IDs: ",userDetailsState.submitted);
      getUsersStories(userDetailsState.submitted);
    }
  },[userDetailsState]);

  const getUsersStories = (ids) => {
    setStoriesLoading(true);
    let updatedStories = [];
    ids.forEach((id)=>{
        getItemDetails(id)
        .then((data)=>{
        if (data.type === "story"){
          updatedStories.push(data);
        } else{
          setStoriesLoading(false);
        }
        })
        .catch((error)=>console.log(error));
      })
    setstoryDetailsState(updatedStories);
    setStoriesLoading(false);
  };

    const storiesDisplay = () => {
      if(storiesLoading){
        return <Loading text="Loading"/>;
      } else {
        return (
          storyDetailsState.map((story)=>
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

    const userDisplay = () => {
      if(userLoading){
        return <Loading text="Loading"/>
      } else {
        return(
          <div className={classes.UserDisplay}>
            <h1 className={classes.Header}>{userDetailsState.id}</h1>
            <p>{`Joined on ${getHumanDate(userDetailsState.created)}, has karma ${userDetailsState.karma}`}</p>
            <p dangerouslySetInnerHTML={{__html: userDetailsState.about}}></p>
          </div>
        );
      }
    };

    let userContent = userDisplay();
    let storiesContent = storiesDisplay();
    return(
      <React.Fragment>
        {userContent}
        <h1 className={classes.Header}>Posts</h1>
        {storyDetailsState.length === 0 ? <p>No posts yet</p>:null }
      <ul>
        {storiesContent}
      </ul>
      </React.Fragment>
    )
};

export default User;
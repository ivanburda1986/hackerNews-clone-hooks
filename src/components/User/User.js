import React from 'react';
import queryString from 'query-string';

import Loading from '../Loading/Loading';
import Story from '../Story/Story';

import classes from './User.module.css';

import {getHumanDate} from '../../utils/convertors';
import {getUserData, getItemDetails} from '../../utils/api';


function fetchUserDataReducer (state, action){
  if(action.type === "fetching"){
    return{
      ...state,
      loading: true
    }
  } else if(action.type === "success"){
    return{
      ...state,
      data: action.data,
      loading: false,
    }
  } else if(action.type === "error"){
    return{
      ...state,
      error: action.message,
      loading: false,
    }
  } else{
    throw new Error ("That action type is not supported.");
  }
}

const User = (props) =>{
  const [state, dispatch] = React.useReducer(fetchUserDataReducer,{
    data: {
      userData: {},
      storiesData: new Array({ivan:"ivan"},{ivan:"ivan"},{ivan:"ivan"},{ivan:"ivan"},{ivan:"ivan"})
    },
    loading: false,
    error: null,
  });
  const [loadStories, setloadStories] = React.useState(false);

  // Fetch user data
  React.useEffect(()=>{
    const id = queryString.parse(props.location.search);
    fetchUserData(id.id);
  },[props]);

  const fetchUserData = (id) => {
    let combinedData = {
      userData: {...state.data.userData},
      storiesData: state.data.storiesData
    }
    dispatch({
      type: "fetching",
      loading: true,
    })
    getUserData(id)
      .then((data)=>combinedData.userData = data)
      .then(()=>dispatch({
        type: "success",
        data: combinedData
      }))
      .catch((error)=>console.log(error));
    setloadStories(true)
  };

  // Fetch stories
  React.useEffect(()=>{
    if(state.data.userData !== undefined && loadStories === true){

      fetchUsersStories();
      setloadStories(false);
    }
  },[state.data.userData]);

  const fetchUsersStories = () => {
    let combinedData = {
      userData: {...state.data.userData},
      storiesData: state.data.storiesData
    };

    dispatch({
      type: "fetching",
      loading: true,
    });

    for(let i = 0; i<combinedData.userData.submitted.length; i++){
      getItemDetails(combinedData.userData.submitted[i])
      .then((data)=>{
      if (data.type === "story" && !data.deleted){
        combinedData.storiesData.push(data);
      }})
      .catch((error)=>console.log(error));
      if(i === combinedData.userData.submitted.length-1){

        dispatch({
          type: "success",
          data: combinedData
        })
      }
    }
  };

  //Display user data
     const userDisplay = () => {
      if(state.data.userData !== undefined){
        const {id, created, karma, about} = state.data.userData;
          return(
            <div className={classes.UserDisplay}>
              <h1 className={classes.Header}>{id}</h1>
              <p>{`Joined on ${getHumanDate(created)}, has karma ${karma}`}</p>
              <p dangerouslySetInnerHTML={{__html: about}}></p>
            </div>
          );
      }
     };
  
  //Display stories
  const storiesDisplay = () =>{
    let stories = state.data.storiesData;
    console.log(stories);
    /* if(stories !== undefined){
      if(state.loading){
        return <Loading text="Loading"/>
      }

      if(stories.length===0){
        stories = <p>No stories yet</p>
      }

      return stories.map(story=>(
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
    } */
  }

    return(
      <React.Fragment>
        {userDisplay()}
        <h1 className={classes.Header}>Posts</h1>
      <ul>
        {storiesDisplay()}
      </ul>
      </React.Fragment>
    )
};

export default User;
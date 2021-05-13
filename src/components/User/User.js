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
      storiesData: []
    },
    loading: false,
    error: null,
  });

  React.useEffect(()=>{
    const id = queryString.parse(props.location.search);
    fetchUserData(id.id);
  },[props]);
  
  const fetchUserData = (id) => {
    let combinedData = {
      userData: {...state.data.userData},
      storiesData: [...state.data.storiesData]
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
  };

  React.useEffect(()=>{
    if(state.data.userData !== undefined){
      console.log("ivan");
    }
  },[state]);

  const fetchUsersStories = (ids) => {
    let combinedData = {
      userData: {...state.data.userData},
      storiesData: [...state.data.storiesData]
    }
/*     dispatch({
      type: "fetching",
      loading: true,
    }) */
    console.log(combinedData.userData.submitted);
    /* ids.forEach((id)=>{
        getItemDetails(id)
        .then((data)=>{
        if (data.type === "story"){
          combinedData.storiesData.push(data);
        }})
        .catch((error)=>console.log(error));
      })
      dispatch({
        type: "success",
        data: combinedData
      }) */
  };



     const userDisplay = () => {
       
       /* if(state.loading){
         return <Loading text="Loading"/>
       } else {
         return(
           <div className={classes.UserDisplay}>
             <h1 className={classes.Header}>{id}</h1>
             <p>{`Joined on ${getHumanDate(created)}, has karma ${karma}`}</p>
             <p dangerouslySetInnerHTML={{__html: about}}></p>
           </div>
         );
       } */
     }; 

    return(
      <React.Fragment>
        <h1 className={classes.Header}>Posts</h1>
      <ul>

      </ul>
      </React.Fragment>
    )
};

export default User;
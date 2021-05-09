import React from 'react';
import queryString from 'query-string';

import Loading from '../Loading/Loading';
import Story from '../Story/Story';

import classes from './User.module.css';

import {getHumanDate} from '../../utils/convertors';
import {getUserData, getItemDetails} from '../../utils/api';


export default class User extends React.Component{
  state = {
    userDetails: [],
    storyDetails: [],
    userLoading: false,
    storiesLoading: false,
  }

  componentDidMount(){
    const id = queryString.parse(this.props.location.search);
    this.getUser(id.id);
  }

  getUser = (id) => {
    this.setState({
      userLoading: true,
    });
    getUserData(id)
      .then((data)=>{
        this.setState({
          userDetails: data,
          userLoading: false,
        })
      })
      .then(()=>{this.getUsersStories(this.state.userDetails.submitted);})
      .catch((error)=>console.log(error));
  };

  getUsersStories = (ids) => {
    this.setState({
      storiesLoading: true,
    });
    ids.forEach((id)=>{
      getItemDetails(id)
      .then((data)=>{
       if (data.type === "story"){
        this.setState({
          storyDetails: this.state.storyDetails.concat(data),
          storiesLoading: false,
        })
       } else{
        this.setState({
          storiesLoading: false,
        })
       }
      })
      .catch((error)=>console.log(error));
    })
  };

    storiesDisplay = () => {
      if(this.state.storiesLoading){
        return <Loading text="Loading"/>;
      } else {
        return (
          this.state.storyDetails.map((story)=>
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

    userDisplay = () => {
      if(this.state.userLoading){
        return <Loading text="Loading"/>
      } else {
        return(
          <div className={classes.UserDisplay}>
            <h1 className={classes.Header}>{this.state.userDetails.id}</h1>
            <p>{`Joined on ${getHumanDate(this.state.userDetails.created)}, has karma ${this.state.userDetails.karma}`}</p>
            <p dangerouslySetInnerHTML={{__html: this.state.userDetails.about}}></p>
          </div>
        );
      }
    };

  render(){
    const userContent = this.userDisplay();
    const storiesContent = this.storiesDisplay();
    return(
      <React.Fragment>
        {userContent}
        <h1 className={classes.Header}>Posts</h1>
        {this.state.storyDetails.length === 0 ? <p>No posts yet</p>:null }
      <ul>
        {storiesContent}
      </ul>
      </React.Fragment>
    )
  }
};
import React from 'react';
import queryString from 'query-string';

import {fetchCommentedStory} from '../../utils/api';

import classes from './StandaloneStory.module.css';

import Loading from '../Loading/Loading';
import StoryMetadata from '../StoryMetadata/StoryMetadata';
import Comment from '../Comment/Comment';

export default class StandaloneStory extends React.Component{
  state = {
    story: [],
    comments: [],
    loading: false,
  }

  componentDidMount(){
    const id = queryString.parse(this.props.location.search);
    this.getStory(id.id);
  }

  getStory = (id) => {
    this.setState({
      loading: true,
    });
    fetchCommentedStory(id)
      .then((data)=>{
        this.setState({
          story: data.storyDetails,
          comments: data.storyComments,
          loading: false,
        })
      })
      .catch((error)=>console.log(error));
  };

  render(){
    if(this.state.loading){
      return <Loading text="Loading"/>;
    }
    return(
      <React.Fragment>
        <h1 className={classes.Title}>{this.state.story.title}</h1>
        <StoryMetadata 
          by={this.state.story.by} 
          time={this.state.story.time} 
          commentCount={this.state.story.kids ? this.state.story.kids.length : 0} 
          id={this.state.story.id}
        />
        <div className={classes.Text} dangerouslySetInnerHTML={{__html: this.state.story.text}}></div>
        <ul>
          {this.state.comments.map((comment)=><Comment 
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
};

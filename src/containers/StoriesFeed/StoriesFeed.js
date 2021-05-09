import React from 'react';

import Loading from '../../components/Loading/Loading';
import Story from '../../components/Story/Story';

import {fetchStories} from '../../utils/api';

export default class StoriesFeed extends React.Component{
  state = {
    storyType: this.props.storyType,
    stories: [],
    loading: false,
  }

  componentDidMount(){
    this.fetchStoriesFeed();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.storyType!==this.state.storyType){
      this.fetchStoriesFeed();
    }
  };

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.storyType!==prevState.storyType){
      return {storyType: nextProps.storyType};
    }
    else return null;
  };

  fetchStoriesFeed = () => {
    this.setState({
      loading: true,
    });

    fetchStories(this.state.storyType)
      .then((data)=>{
        this.setState({
          stories: data,
          loading: false,
        })
      })
  };

  render(){
    let stories = [...this.state.stories];
    stories = stories.map(story=>(
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

    if(stories.length===0){
      stories = <p>No stories yet</p>
    }

    if(this.state.loading){
      return <Loading text="Loading"/>
    } 

    return(
      <React.Fragment>
        <ul>
          {stories}
        </ul>
      </React.Fragment>
    );
    
  };

}  
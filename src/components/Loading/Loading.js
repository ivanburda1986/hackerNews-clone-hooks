import React from 'react';
import PropTypes from 'prop-types';

import classes from './Loading.module.css';

export default class Loading extends React.Component{
  state = {
    content: this.props.text,
  }

  componentDidMount () {
    const {text } = this.props;
    //Setting a variable in the way 'this.interval' in a function then the variable becomes globally accessible als from other functions
    this.interval =  window.setInterval(()=> {
     this.state.content === (text + '...') ? this.setState({content: text}): this.setState(({content})=>({content:content +'.'}))
   }, 200);
 }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render(){
    return(
      <p className={classes.Loading}>
        {this.state.content}
      </p>
    );
  }
};

Loading.propTypes = {
  text: PropTypes.string.isRequired,
};

Loading.defaultProps = {
  text: 'Loading',
}


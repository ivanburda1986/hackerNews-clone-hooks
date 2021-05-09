import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Title.module.css';

const Title =(props)=>{
  return props.data.url ? 
  <a className={classes.Title} href={props.data.url }>{props.data.title}</a> :
  <Link className={classes.Title} to={`/story?id=${props.data.id}`}>{props.data.title}</Link>
}

export default Title;

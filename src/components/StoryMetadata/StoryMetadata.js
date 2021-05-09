import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './StoryMetadata.module.css';
import classesGlobal from '../../global.module.css';

import {getHumanDate} from '../../utils/convertors';

import {ThemeConsumer} from '../../contexts/theme';

const StoryMetadata = (props) => {
  const {theme} = React.useContext(ThemeConsumer);

  let time = getHumanDate(props.time);
  let wordWith = typeof props.commentCount === "number" ? "with":null;
  let wordComments = typeof props.commentCount === "number" ? "comments":null;
  return(
        <div className={classes.StoryDetails}>
          <div className={classesGlobal[`text-${theme}`]}>
            by<span/>{<Link to={"/user?id="+props.by}><span className={classesGlobal[`link-${theme}`]}>{props.by}</span></Link>}<span/>
            on<span/>{time}<span/>
            {wordWith}<span/>
            {typeof props.commentCount === "number" ? <Link to={`/story?id=${props.id}`}><span className={classesGlobal[`link-${theme}`]}>{props.commentCount}</span></Link> : null}<span/>
            {wordComments}
          </div>
        </div>
  );
};

StoryMetadata.propTypes = {
  by: PropTypes.string,
  time: PropTypes.number,
  id: PropTypes.number,
  commentCount: PropTypes.number
};

export default StoryMetadata;

import React from 'react';
import {NavLink} from 'react-router-dom';
import {ThemeConsumer} from '../../contexts/theme';
import classes from './Navigation.module.css';
import classesGlobal from '../../global.module.css';


const Navigation = (props) =>{
  const getLinkClasses = (theme) => {
    return [classes.Link, theme === "dark" ? classesGlobal.navlinkInactiveDark : classesGlobal.navlinkInactiveLight].join(" ");
  };

  const {theme, toggleTheme} = React.useContext(ThemeConsumer);

  return (
        <nav className={classes.Navigation}>
        <ul>
          <li><NavLink to="/" exact activeClassName={classes.Active} className={getLinkClasses(theme)}>Top</NavLink></li>
          <li><NavLink to="/new" exact activeClassName={classes.Active} className={getLinkClasses(theme)}>New</NavLink></li>
        </ul>
        <button onClick={()=>toggleTheme()}>{theme==="light" ? '🔦' : '💡'}</button>
      </nav>
  );
}

export default Navigation;
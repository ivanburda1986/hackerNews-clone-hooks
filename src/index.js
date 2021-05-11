import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import {ThemeProvider} from './contexts/theme';
import './index.module.css';
import classes from './index.module.css';
import classesGlobal from './global.module.css';

import Loading from './components/Loading/Loading';
import Navigation from './components/Navigation/Navigation';

/* Background colors */
const darkBackgroundColor = '#3d3d3d';
const lightBackgroundColor = '#ffffff';

/* Lazy loading */
const Stories = React.lazy(()=>import('./containers/StoriesFeed/StoriesFeed'));
const StandaloneStory = React.lazy(()=>import('./components/StandaloneStory/StandaloneStory'));
const User = React.lazy(()=>import('./components/User/User'));


const App = ()=>{
  const [theme, setTheme] = React.useState("light");
  const toggleTheme = () => setTheme((theme) => theme === "light" ? "dark" : "light");

  React.useEffect(()=>{
    document.body.style = `background-color: ${theme === 'light' ? lightBackgroundColor : darkBackgroundColor}`;
  },[theme]);

  return(
    <React.Fragment>
      <React.Suspense fallback={<Loading />}> {/* React.Suspense including fallback is needed in order to support the lazy loading */}
        <ThemeProvider value = {theme}>
          <BrowserRouter>
          <div className={classesGlobal[`bg-${theme}`]}>
            <div className={classes.wrapper}>
              <Navigation toggleTheme={toggleTheme}/>
              <Switch>
                  <Route path="/" exact render={()=><Stories storyType="top"/>}/>
                  <Route path="/new" exact render={()=><Stories storyType="new"/>}/>
                  <Route path="/story" component={StandaloneStory}/>
                  <Route path="/user" component={User}/>
                  {/* This is a 404 fallback which redirects to the main route */}
                  <Redirect to="/"/>
              </Switch>
            </div>
          </div>
          </BrowserRouter>
        </ThemeProvider>
      </React.Suspense>
    </React.Fragment> 
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

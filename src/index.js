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
const darkBackgroundColor = '#343434';
const lightBackgroundColor = '#ffffff';

/* Lazy loading */
const Stories = React.lazy(()=>import('./containers/StoriesFeed/StoriesFeed'));
const StandaloneStory = React.lazy(()=>import('./components/StandaloneStory/StandaloneStory'));
const User = React.lazy(()=>import('./components/User/User'));

class App extends React.Component{
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({theme})=>({
        theme: theme === 'light' ? 'dark' : 'light'
      }));
      document.body.style = `background-color: ${this.state.theme === 'light' ? darkBackgroundColor : lightBackgroundColor}`;
    }
  }

  render(){
    return(
      <React.Fragment>
        <React.Suspense fallback={<Loading />}> {/* React.Suspense including fallback is needed in order to support the lazy loading */}
          <ThemeProvider value = {this.state}>
            <BrowserRouter>
            <div className={classesGlobal[`bg-${this.state.theme}`]}>
              <div className={classes.wrapper}>
                <Navigation/>
                <Switch>
                    <Route path="/" exact render={(props)=><Stories storyType="top"/>}/>
                    <Route path="/new" exact render={(props)=><Stories storyType="new"/>}/>
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
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

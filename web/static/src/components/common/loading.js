import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Dimmer, Loader } from 'semantic-ui-react';
//import style from './style.sass';

function Loading(props) {
  return (
    <Dimmer key={Math.floor(Math.random() * 115)} active>
      <Loader>Loading</Loader>
    </Dimmer>
  )
}

export default Loading;
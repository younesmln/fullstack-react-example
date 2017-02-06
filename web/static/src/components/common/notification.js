import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { notificationText } from '../../selectors/uiSelector';
import { hideNotification } from '../../reducers/uiReducer';

function Notification({text, type, dispatch}) {
  return (
    text ? (<Message {...{[type]: true}} floating compact
               onDismiss={() => dispatch(hideNotification())}
               content={text}
               style={{paddingLeft: '5em', paddingRight: '5em'}}
      />) : null
  )
}

function mapStateToProps(state) {
  return {
    ...notificationText(state)
  }
}

export default connect(mapStateToProps)(Notification);
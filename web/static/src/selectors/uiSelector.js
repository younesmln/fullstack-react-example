import { createSelector } from 'reselect';

const uiState = state => state.ui;

export const loading = createSelector(uiState, (ui) => ui.get("loading"));

export const notificationText = createSelector(uiState, (ui) => (
  {text: ui.getIn(["notification", "text"]), type: ui.getIn(["notification", "type"])}
));
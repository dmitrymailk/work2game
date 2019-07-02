import { combineReducers } from 'redux';
import sectionApp from './actions/sectionApp';
import trelloKey from './actions/trelloKey';
import incSection from './actions/incSection'
import achieveEvent from './actions/achieveEvent'


export default combineReducers({
  sectionApp,
  trelloKey,
  incSection,
  achieveEvent
})
import Selectors from './selectors.js';
import { local, session } from './storage.js';
import indexOf from './indexOf.js';
import { onEvent, onEventOnce, offEvent, dispatch } from './listenerEvent.js';
import ClassList from './classList.js';
import {mouseEvent} from './mouseEvent.js';
mouseEvent();


export default {
    Selectors,
    local,
    session,
    indexOf,
    onEvent,
    onEventOnce,
    offEvent,
    dispatch,
    ClassList
}
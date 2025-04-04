

function isValidElement($elem) {
    if (!($elem instanceof Element)) {
        throw new Error("The parameter $elem must be a DOM element.");
    } 
    return true;
}

function isValidEvent(eventName) {
    if(typeof document.body[`on${eventName}`] === "undefined") {
        throw new Error(`The event "${eventName}" is not a valid DOM event.`);
    }
    return true
}

function isValidCallback($callback) {
    if (typeof $callback !== 'function') {
        throw new Error("The parameter $callback must be a function.");
    }
    return true;
}


function onEvent($elem, $event, $callback, $capture = false, $once = false) {
    if(isValidElement($elem) && isValidEvent($event) && isValidCallback($callback)) {
        $elem.addEventListener($event, $callback, {capture: $capture, once: $once});
    }
}

function onEventOnce($elem, $event, $callback, $capture = false) {
    onEvent($elem, $event, $callback, $capture, true);
}

function offEvent($elem, $event, $callback, $capture = false) {
    if(isValidElement($elem) && isValidEvent($event) && isValidCallback($callback)) {
        $elem.removeEventListener($event, $callback, $capture);
    }
}

function dispatch($elem, $event) {
    $elem.dispatchEvent(new Event($event));
};

export { onEvent, onEventOnce, offEvent, dispatch }
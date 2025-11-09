
function methodToPrototype(eventName) {
    const methodName = `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`; // Es: 'click' -> 'onClick'

    
    Object.defineProperty(Element.prototype, methodName, {
        value: function(callback) {
          if (typeof callback !== 'function') {
            throw new Error("The callback parameter must be a function.");   }
      
          this.addEventListener(eventName, (event) => {
            const targetElement = event.srcElement || event.target;
            callback(event, targetElement)
          });
        },
        writable: true,
        configurable: true,
        enumerable: true // It will not show 'onClick' among the element's properties
    });
}

export function mouseEvent() {
    const events = [
        'click', 'dblclick', 'mousedown', 'mouseup',
        'mouseenter', 'mouseleave', 'mouseout', 'mouseover',
        'wheel'
    ];
    
    events.forEach(event => methodToPrototype(event));
};

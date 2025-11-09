
/**
 * Methods to manage Events
 */
export const EventsMixin = {
    _initEvents() {
        if(!this._eventHandlers) {
            this._eventHandlers = new Map();
        }
    },

    /**
     * Add event listener
     */
    on(event, handlerOrSelector, handler) {
        this._initEvents();

        if (typeof handlerOrSelector === 'function') {
            // Event listener semplice
            this.element.addEventListener(event, handlerOrSelector);
            this._storeHandler(event, handlerOrSelector);
        } else {
            // Event delegation
            const selector = handlerOrSelector;
            const delegateHandler = (e) => {
                const target = e.target.closest(selector);
                if (target && this.element.contains(target)) {
                    handler.call(target, e);
                }
            };
            this.element.addEventListener(event, delegateHandler);
            this._storeHandler(event, delegateHandler);
        }
        return this;
    },

    /**
     * Remove event listener
     */
    off(event, handler) {
        this.element.removeEventListener(event, handler);
        this._removeHandler(event, handler);
        return this;
    },

    /**
     * Add listeners that work once time
     */
    once(event, handler) {
        const onceHandler = (e) => {
            handler.call(this.element, e);
            this.off(event, onceHandler);
        };
        return this.on(event, onceHandler);
    },

    /**
     * Trigger custom event
     */
    trigger(event, detail) {
        const evt = new CustomEvent(event, {
            detail,
            bubbles: true,
            cancelable: true
        });
        this.element.dispatchEvent(evt);
        return this;
    },

    /**
     * Save handler reference for cleanup
     * @private
     */
    _storeHandler(event, handler) {
        if (!this._eventHandlers.has(event)) {
            this._eventHandlers.set(event, []);
        }
        this._eventHandlers.get(event).push(handler);
    },

    /**
     * Remove handler reference
     * @private
     */
    _removeHandler(event, handler) {
        if (this._eventHandlers.has(event)) {
            const handlers = this._eventHandlers.get(event);
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    },

    /**
     * Remove all event listener
     */
    offAll(event) {
        if (this._eventHandlers.has(event)) {
            const handlers = this._eventHandlers.get(event);
            handlers.forEach(handler => {
                this.element.removeEventListener(event, handler);
            });
            this._eventHandlers.delete(event);
        }
        return this;
    }
}
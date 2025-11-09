
/**
 * Mthods for conditional execution
 */
export const Conditional = {
    /**
     * Conditional when (when/then pattern)
     */
    when(condition) {
        const isTrue = typeof condition === 'function' ? 
            condition(this.element) : 
            Boolean(condition);
        
        return new ConditionalWrapper(this, isTrue);
    },

    /**
     * exacute callback on truth condition
     */
    if(condition, callback) {
        const isTrue = typeof condition === 'function' ? 
            condition(this.element) : 
            Boolean(condition);
        
        this._lastCondition = isTrue;

        if (isTrue && typeof callback === 'function') {
            callback.call(this, this);
        }
        
        return this;
    },

    /**
     * Execute callback on false condition (uses cached condition from last if())
     */
    else(callback) {
        // Reuse condition of if()
        if (this._lastCondition === false && typeof callback === 'function') {
            callback.call(this, this);
        }
        
        // clean cache
        this._lastCondition = undefined;
        
        return this;
    },

    /**
     * Execute callback on false condition
     */
    unless(condition, callback) {
        const isTrue = typeof condition === 'function' ? 
            condition(this.element) : 
            Boolean(condition);
        
        if (!isTrue && typeof callback === 'function') {
            callback.call(this, this);
        }
        
        return this;
    }
}

class ConditionalWrapper {
    constructor(selector, condition) {
        this.selector = selector;
        this.condition = condition;
    }

    then(callback) {
        if (this.condition && typeof callback === 'function') {
            //TODO resolve callback
            callback(this.selector);
        }
        return this.selector;
    }

    otherwise(callback) {
        if (!this.condition && typeof callback === 'function') {
            // callback(this.selector);
        }
        return this.selector;
    }
}
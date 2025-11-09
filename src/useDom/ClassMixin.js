
/**
 * Methods to mangage classes
 */
export const ClassMixin = {
    exclude: ['undefined', 'null', '0', 'false'],
    /**
     * Add one or more class to the element
     * @param {string} classes - Class name to add.
     * @return {this} - Instance for chain
     */
    addClass(...classes) {
        const classNames = classes
            .flat()
            .join(' ')
            .split(' ')
            .filter(Boolean);
        
        this.element.classList.add(...classNames);
        return this;
    },

    /**
     * Remove one o more class
     */
    removeClass(...classes) {
        const classNames = classes
            .flat()
            .join(' ')
            .split(' ')
            .filter(Boolean);
        
        this.element.classList.remove(...classNames);
        return this;
    },

    /**
     * Replace classes
     */
    replaceClass(oldToken, newToken) {
        if (!this.hasClass(oldToken)) return 

        if (this._isValidToken(newToken)) {
            this.removeClass(oldToken);
            this.addClass(newToken);
        }

        return this;
    },

    /**
     * Toggle class
     */
    toggleClass(className, force) {
        this.element.classList.toggle(className, force);
        return this;
    },

    /**
     * Check exist class
     */
    hasClass(className) {
        return this.element.classList.contains(className);
    },

    /**
     * Get/Set style CSS
     */
    css(prop, value) {
        if (typeof prop === 'object') {
            Object.entries(prop).forEach(([k, v]) => {
                this.element.style[k] = v;
            });
            return this;
        }

        if (value === undefined) {
            return getComputedStyle(this.element)[prop];
        }

        this.element.style[prop] = value;
        return this;
    },

    /**
     * Obtain computed style
     */
    getComputedStyles() {
        return window.getComputedStyle(this.element);
    },

    /**
     * Show element
     */
    show(display = 'block') {
        this.element.style.display = display;
        return this;
    },

    /**
     * Hide element
     */
    hide() {
        this.element.style.display = 'none';
        return this;
    },

    /**
     * Toggle visibility
     */
    toggle() {
        const isHidden = this.css('display') === 'none';
        return isHidden ? this.show() : this.hide();
    },


    //TODO apply
    getTokens() {
        if(this.element.className.trim().length === 0) {
            return []
        }
        return this.element.className.split(" ").filter(Boolean);
    },

    setTokens(list) {
        if (!Array.isArray(list)) {
            throw new TypeError('Expected an array of class names');
        }
        if(list) {
            this.element.className = '';
            this.element.classList.add(...list);
        }
    },

    _isValidToken(token) {
        if(!Boolean(token) || typeof token !== 'string' || token.trim() === "" || this.exclude.includes(token)) {
            throw new TypeError('Invalid token');
        } else {
            return true
        }
    }
}
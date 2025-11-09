
/**
 * Methods to manage element content
 * HTML, Text, Append, Prepend, etc.
 */
export const ContentMixin = {
    /**
     * Get/Set innerHTML
     */
    html(value) {
        if (value === undefined) {
            return this.element.innerHTML;
        }
        this.element.innerHTML = value;
        return this;
    },

    /**
     * Get/Set textContent
     */
    text(value) {
        if (value === undefined) {
            return this.element.textContent;
        }
        this.element.textContent = value;
        return this;
    },

    /**
     * Clear content
     */
    empty() {
        this.element.innerHTML = '';
        return this;
    },

    /**
     * Append content to the end
     */
    append(content) {
        if (typeof content === 'string') {
            this.element.insertAdjacentHTML('beforeend', content);
        } else {
            const el = this._extractElement(content);
            this.element.appendChild(el);
        }
        return this;
    },

    /**
     * Prepend content
     */
    prepend(content) {
        if (typeof content === 'string') {
            this.element.insertAdjacentHTML('afterbegin', content);
        } else {
            const el = this._extractElement(content);
            this.element.insertBefore(el, this.element.firstChild);
        }
        return this;
    },

    /**
     * Insert content before element
     */
    before(content) {
        if (typeof content === 'string') {
            this.element.insertAdjacentHTML('beforebegin', content);
        } else {
            const el = this._extractElement(content);
            this.element.parentNode?.insertBefore(el, this.element);
        }
        return this;
    },

    /**
     * Insert content after element
     */
    after(content) {
        if (typeof content === 'string') {
            this.element.insertAdjacentHTML('afterend', content);
        } else {
            const el = this._extractElement(content);
            this.element.parentNode?.insertBefore(el, this.element.nextSibling);
        }
        return this;
    },

    /**
     * Clona element
     */
    clone(deep = true) {
        return new DomSelector(this.element.cloneNode(deep));
    },

    /**
     * Remove element from DOM
     */
    remove() {
        const parent = this.element.parentElement;
        if (parent) {
            parent.removeChild(this.element);
            return true;
        }
        return false;
    },

    /**
     * Helper to extract
     * @private
     */
    _extractElement(content) {
        return content instanceof DomBase ? content.element : content;
    }
}
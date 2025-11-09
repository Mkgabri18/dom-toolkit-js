/**
 * Methods to manage attributes, data-attributes and properties
 */
export const AttributesMixin = {
    /**
     * Get/Set/Remove attributo
     */
    attr(name, value) {
        if (typeof name === 'object') {
            Object.entries(name).forEach(([k, v]) => this.attr(k, v));
            return this;
        }

        if (value === undefined) {
            return this.element.getAttribute(name);
        }

        if (value === null) {
            this.element.removeAttribute(name);
        } else {
            this.element.setAttribute(name, value);
        }

        return this;
    },

    /**
     * Check attribute exist
     */
    has(name) {
        return this.element.hasAttribute(name);
    },

    /**
     * Remove attribute
     */
    remove(name) {
        this.element.removeAttribute(name);
        return this;
    },

    /**
     * Get/Set data attribute
     */
    data(key, value) {
        if (typeof key === 'object') {
            Object.assign(this.element.dataset, key);
            return this;
        }

        if (value === undefined) {
            return this.element.dataset[key];
        }

        this.element.dataset[key] = value;
        return this;
    },

    /**
     * Get/Set proprietà dell'elemento
     */
    prop(name, value) {
        if (typeof name === 'object') {
            Object.entries(name).forEach(([k, v]) => {
                this.element[k] = v;
            });
            return this;
        }

        if (value === undefined) {
            return this.element[name];
        }

        this.element[name] = value;
        return this;
    },

    /**
     * Get/Set value (per input)
     */
    val(value) {
        if (value === undefined) {
            return this.element.value;
        }
        this.element.value = value;
        return this;
    }
}
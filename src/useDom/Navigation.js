
/**
 * Methods to navigate DOM structure
 * Parent -> Child -> Sibling
 */
export const NavigationMixin = {
    /**
     * Obtain first element
     */
    firstChild() {
        const child = this.element.firstElementChild;
        return child ? new DomSelector(child) : null;
    },

    /**
     * Obtain last element
     */
    lastChild() {
        const child = this.element.lastElementChild;
        return child ? new DomSelector(child) : null;
    },

    /**
     * Obtain next sibling
     */
    nextSibling() {
        const sibling = this.element.nextElementSibling;
        return sibling ? new DomSelector(sibling) : null;
    },

    /**
     * Obtain previous sibling
     */
    prevSibling() {
        const sibling = this.element.previousElementSibling;
        return sibling ? new DomSelector(sibling) : null;
    },

    /**
     * Obtain parent element
     */
    parent() {
        const parent = this.element.parentElement;
        return parent ? new DomSelector(parent) : null;
    },

    /**
     * Obtain all match children
     */
    children(selector) {
        const children = Array.from(this.element.children);
        const filtered = selector ? 
            children.filter(child => child.matches(selector)) : 
            children;
        return new DomCollection(filtered);
    },

    /**
     * Find closest ancestor
     */
    closest(selector) {
        const el = this.element.closest(selector);
        return el ? new DomSelector(el) : null;
    },

    /**
     * Find descendants
     */
    find(selector) {
        const elements = Array.from(this.element.querySelectorAll(selector));
        return new DomCollection(elements);
    }

}
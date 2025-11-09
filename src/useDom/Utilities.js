
/**
 * Utility methods and helpers
 */
export const UtilityMixin = {
    /**
     * Check void element
     */
    isEmpty() {
        return this.element.childElementCount === 0 && 
               !this.element.textContent.trim();
    },

    /**
     * Check visible element
     */
    isVisible() {
        return !!(
            this.element.offsetWidth || 
            this.element.offsetHeight || 
            this.element.getClientRects().length
        );
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(threshold = 0) {
        const rect = this.element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
        const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

        return vertInView && horInView;
    },

    /**
     * Obtain element size
     */
    rect() {
        return this.element.getBoundingClientRect();
    },

    /**
     * Obtain element measures
     */
    dimensions() {
        const rect = this.rect();
        const styles = this.getComputedStyles();
        
        return {
            width: rect.width,
            height: rect.height,
            outerWidth: rect.width + 
                parseFloat(styles.marginLeft) + 
                parseFloat(styles.marginRight),
            outerHeight: rect.height + 
                parseFloat(styles.marginTop) + 
                parseFloat(styles.marginBottom)
        };
    },

    /**
     * Obtain/Set focus
     */
    focus() {
        this.element.focus();
        return this;
    },

    /**
     * Remove focus
     */
    blur() {
        this.element.blur();
        return this;
    },

    /**
     * Check if has focus
     */
    hasFocus() {
        return document.activeElement === this.element;
    },

    /**
     * Scroll elment in viewport
     */
    scrollIntoView(options = { behavior: 'smooth', block: 'center' }) {
        this.element.scrollIntoView(options);
        return this;
    }
}
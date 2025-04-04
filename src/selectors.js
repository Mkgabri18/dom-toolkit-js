import ClassList from './classList.js';
import DomSelector from './domSelector.js';
import ValidationString from './Validators/ValidationString.js';

/**
* Selects a single HTML element based on the provided ID selector.
* If the selector does not start with '#', it will be prepended automatically.
* Funciton selectId manage selector with '#' , example: '#element' or 'element'.
*
* @param {string} selector - The ID selector to match.
* @param {Document|Element} [parent=document] - The parent element to search within.
* @throws {Error} If the provided selector is an empty string.
* @returns {Element|null} The matched HTML element, or null if no match is found.
*/
export default class Selectors {

    static document = () => {
        return window.document;
    };
    
    static getClass(elDOM) {
        if(!elDOM) {
            throw new Error('Invalid Element');
        }
        return new ClassList(elDOM);
    }

    /**
     * This method takes a DOM element, wraps it with a `ClassList` instance,
     * and dynamically binds all methods of the `ClassList` instance to the DOM element.
     * Each method is attached with a suffix `Class` to the DOM element.
     * @param {HTMLElement} elDom - The DOM element to which class management methods will be attached.
     */
    static attachClassManager(elDom) {
        const elem = new ClassList(elDom);
        Object.getOwnPropertyNames(elem)
            .filter(method => typeof elem[method] === 'function')
            .forEach(method => {
                elDom[method + 'Class'] = elem[method].bind(elem);
            });

    };

    static attachDomSelector(elDom) {
        const elem = new DomSelector(elDom);

        Object.entries(elem).forEach(([key, method]) => {
            if (typeof method === 'function') {
                Object.defineProperty(elDom, key, {
                    value: method.bind(elem),
                    writable: true,
                    configurable: true,
                    enumerable: false
                });
            }
        });
    };

    constructor() {
        Selectors.parent = Selectors.document();
    }

    select(selector) {
        // Validate Selector
        ValidationString.sanitizeSelector(selector);

        return Selectors.parent.querySelector(selector);
    }

    selectAll(selector) {
        // Validate Selector
        ValidationString.sanitizeSelector(selector);

        return Array.from(Selectors.parent.querySelectorAll(selector))
    }

    selectId(selector) {
        // Validate Selector
        ValidationString.sanitizeSelector(selector);

        if (selector.startsWith('#')) {
            selector = selector.slice(1);
        }

        const targetElement = Selectors.parent.getElementById(selector);
        if (!targetElement) {
            console.error(`Element with ID "${selector}" not found.`);
            return null;
        }
        
        Selectors.attachClassManager(targetElement);
        Selectors.attachDomSelector(targetElement);
        return targetElement;
    }

    selectClasses(selector) {
        // Validate Selector
        ValidationString.sanitizeSelector(selector);

        if (selector.startsWith('.')) {
            selector = selector.slice(1);
        }

        try {
            const elements = Array.from(Selectors.parent.getElementsByClassName(selector));
            elements.forEach(Selectors.attachClassManager);
            return elements;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    selectTag(selector) {
        // Validate Selector
        ValidationString.sanitizeSelector(selector);

        return Selectors.parent.getElementsByTagName(selector);
    }

}

// Mixin methods from DomSelector
Object.assign(Selectors.prototype, DomSelector);
import {DomSelector} from './useDom/DomSelector.js';
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

    static document = () => window.document;
    static parent = null;

    /**
     * Attach all methods from DomSelector in a native element
     * The element become "enhanced" with utility DOM
     * @param {HTMLElement} elDom - DOM element to improve
     * @returns {HTMLElement} element improved
     */
    static attachDomSelector(elDom) {
        if (!elDom || elDom.nodeType !== 1) {
            console.warn('attachDomSelector: elemento non valido', elDom);
            return elDom;
        }

        // Avoid reattach enhanced
        if (elDom._domEnhanced) {
            return elDom;
        }
        
        try {
            const element = new DomSelector(elDom);

            // Sign enhanced
            Object.defineProperty(elDom, '_domEnhanced', {
                value: true,
                writable: false,
                configurable: false,
                enumerable: false
            });

            Object.entries(element).forEach(([key, method]) => {
                if (typeof method === 'function') {
                    Object.defineProperty(elDom, key, {
                        value: method.bind(element),
                        writable: true,
                        configurable: true,
                        enumerable: false
                    });
                }
            });

            return elDom;
        } catch (error) {
            console.log("Error in attachDomSelector", error);
            return elDom;
        }
    };

    /**
     * Attach DomSelector collection
     * @param {Array|NodeList|HTMLCollection} elements - Element collection
     * @returns {Array} Array element improved
     */
    static attachToCollection(elements) {
        return Array.from(elements).map(el => Selectors.attachDomSelector(el));
    }

    constructor() {
        Selectors.parent = Selectors.document();
    }

    select(selector) {
        // Validate Selector
        ValidationString.sanitizeSelector(selector);

        const element = Selectors.parent.querySelector(selector);
        return element ? Selectors.attachDomSelector(element) : null;
    }

    selectId(selector) {
        // Validate Selector
        ValidationString.sanitizeSelector(selector);

        const id = selector.startsWith('#') ? selector.slice(1) : selector;

        const targetElement = Selectors.parent.getElementById(id);
        if (!targetElement) {
            console.error(`Element with ID "${id}" not found.`);
            return null;
        }
        
        return Selectors.attachDomSelector(targetElement);
    }

    selectAll(selector) {
        // Validate Selector
        ValidationString.sanitizeSelector(selector);
        try {
            const collection = DomSelector.all(selector)
            if (!collection) {
                console.error(`Element with selector "${selector}" not found.`);
                return null;
            }

            return collection
        } catch (error) {
            console.error(`Errore in selectAll per "${selector}":`, error);
            return new DomCollection([]);
        }
    }

    selectClasses(selector) {
        // Validate Selector
        ValidationString.sanitizeSelector(selector);

        const className = selector.startsWith('.') ? selector.slice(1) : selector;

        try {
            const elements = DomSelector.all(className);
            if (elements.length === 0) {
                console.warn(`Not found element with class "${className}".`);
            }
            return Selectors.attachToCollection(elements);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    selectTag(selector) {
        // Validate Selector
        ValidationString.sanitizeSelector(selector);

        try {
            const elements = Array.from(Selectors.parent.getElementsByTagName(tagName));
            
            if (elements.length === 0) {
                console.warn(`Not found element with tag "${tagName}".`);
            }

            return Selectors.attachToCollection(elements);
        } catch (error) {
            console.error(`Errore in selectTag for "${tagName}":`, error);
            return [];
        }

        // return Selectors.parent.getElementsByTagName(selector);
    }

}

// Mixin methods from DomSelector
// Object.assign(Selectors.prototype, new DomSelector());
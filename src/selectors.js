import ClassList from './classList.js';

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
    
    static selectorValidity(selector) {
        if(typeof selector === 'string' && selector === "") {
            throw new Error("Invalid selector string void " + selector);
        }
    }

    static getClass(elDOM) {
        if(!elDOM) {
            throw new Error('Invalid Element');
        }
        return new ClassList(elDOM);
    }

    static attachClassManager(elDom) {
        const elem = new ClassList(elDom);
        Object.getOwnPropertyNames(elem)
            .filter(method => typeof elem[method] === 'function')
            .forEach(method => {
                elDom[method+'Class'] = elem[method].bind(elem);
            });
    };

    constructor() {
        Selectors.parent = document;
    }

    select(selector) {
        // Validate Selector
        Selectors.selectorValidity(selector);

        return Selectors.parent.querySelector(selector);
    }

    selectAll(selector) {
        // Validate Selector
        Selectors.selectorValidity(selector);

        return Array.from(Selectors.parent.querySelectorAll(selector))
    }

    selectId(selector) {
        // Validate Selector
        Selectors.selectorValidity(selector);

        if (selector.startsWith('#')) {
            selector = selector.slice(1);
        }

        try {
            const elDom = Selectors.parent.getElementById(selector);
            if (!elDom) {
                throw new Error(`Element with ID "${selector}" not found.`);
            }
            
            Selectors.attachClassManager(elDom);
            return elDom;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    selectClasses(selector) {
        // Validate Selector
        Selectors.selectorValidity(selector);

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
        Selectors.selectorValidity(selector);

        return Selectors.parent.getElementsByTagName(selector);
    }

}

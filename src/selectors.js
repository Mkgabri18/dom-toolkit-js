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
export default function Selectors() {
    let parent = document;

    function selectorValidity(selector) {
        if(typeof selector === 'string' && selector === "") {
            throw new Error("Invalid selector string void " + selector);
        }
    }
    
    function getClass(elDOM) {
        if(!elDOM) {
            throw new Error('Invalid Element');
        }
        return new ClassList(elDOM);
    }

    function attachClassManager(elDom) {
        const elem = new ClassList(elDom);
        Object.getOwnPropertyNames(elem)
        .filter(method => typeof elem[method] === 'function')
        .forEach(method => {
            elDom[method+'Class'] = elem[method].bind(elem);
        });
    };

    function select(selector) {
        // Validate Selector
        selectorValidity(selector);

        return parent.querySelector(selector);
    }

    function selectAll(selector) {
        // Validate Selector
        selectorValidity(selector);

        return Array.from(parent.querySelectorAll(selector))
    }

    function selectId(selector) {
        // Validate Selector
        selectorValidity(selector);

        if (selector.startsWith('#')) {
            selector = selector.slice(1);
        }

        try {
            const elDom = parent.getElementById(selector);
            if (!elDom) {
                throw new Error(`Element with ID "${selector}" not found.`);
            }
            
            attachClassManager(elDom);
            return elDom;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    function selectClasses(selector) {
        // Validate Selector
        selectorValidity(selector);

        if (selector.startsWith('.')) {
            selector = selector.slice(1);
        }

        try {
            const elements = Array.from(parent.getElementsByClassName(selector));
            elements.forEach(attachClassManager);
            return elements;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    function selectTag(selector) {
        // Validate Selector
        selectorValidity(selector);

        return parent.getElementsByTagName(selector);
    }

    return {
        select,
        selectAll,
        selectId,
        selectClasses,
        selectTag,
        getClass
    }
}

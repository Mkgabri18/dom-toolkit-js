import indexOf from "./indexOf.js";

/**
 * ClassList is a utility for managing class names of an HTML element.
 *
 * @param {HTMLElement} element - The HTML element to manage class names for.
 * @returns {Object} - An object with methods for managing class names.
 */
export default function ClassList(element) {
    if (!(element instanceof Element)) {
        throw new TypeError('ClassList requires an HTML Element');
    }

    const elem = element;

    const exclude = ['undefined', 'null', '0', 'false']

    /**
     * Adds a class name to the element.
     * @param {string} token - The class name to add.
     * @return {void} - No return value.
     */
    function add(token) {
        const currentList = getTokens();
        //* Exclude NaN undefined null 0 false spaces and other
        if(checkToken(token)) {
            if (!contains(token)) {
                //* multiple tokens available
                let list = currentList.concat(token.split(" "));
                setTokens(list);
            }
        }
        return this
    }
    function remove(token) {
        let tokens = token.split(' ');
        tokens.forEach(subToken => {
            let currentList = getTokens()
            if(checkToken(subToken)) {
                let index = indexOf(currentList, subToken)
                if (index > -1) {
                    currentList.splice(index, 1)
                    setTokens(currentList)
                }
            }
        });
        return this
    }
    function contains(token) {
        return indexOf(getTokens(), token) > -1
    }

    function toggle(token, force) {
        //TODO: add force parameter
        if(checkToken(token)) {
            const hasClass = contains(token);

            if (typeof force === 'boolean') {
                force ? add(token) : remove(token);
                return force;
            }
            
            hasClass ? remove(token) : add(token);
            return !hasClass;
        }

        return false;
    }

    function replace(oldToken, newToken) {
        if (!contains(oldToken)) {
            return false
        }
        if(checkToken(oldToken)) {
            remove(oldToken)
            add(newToken)
        }
    }
    function $toString() {
        return elem.className
    }
    function item(index) {
        return elem.classList.item(index)
    }
    function getTokens() {
        if(elem.className.trim().length === 0) {
            return []
        }
        return elem.className.split(" ").filter(Boolean);
    }
    function setTokens(list) {
        if (!Array.isArray(list)) {
            throw new TypeError('Expected an array of class names');
        }
        if(list) {
            elem.className = '';
            elem.classList.add(...list);
        }
    }
    function checkToken(token) {
        if(!Boolean(token) || typeof token !== 'string' || token.trim() === "" || exclude.includes(token)) {
            throw new TypeError('Invalid token');
        } 
        
        if (exclude.includes(token)) {
            throw new TypeError(`Token cannot be one of: ${exclude.join(', ')}`);
        }

        return true
    }

    return {
        add
        ,remove
        ,contains
        ,toggle
        ,replace
        ,toString: $toString
        ,item
    }
}


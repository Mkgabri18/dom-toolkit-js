
/**
 * ClassList is a utility for managing class names of an HTML element.
 *
 * @param {HTMLElement} element - The HTML element to manage class names for.
 * @returns {Object} - An object with methods for managing class names.
 */

export default function ClassList(element) {
    let target = element;

    const exclude = ['undefined', 'null', '0', 'false']

    /**
     * Adds a class name to the element.
     * @param {string} token - The class name to add.
     * @return {void} - No return value.
     */
    function add(token) {
        let currentList = getTokens();
        //* Exclude NaN undefined null 0 false spaces and other
        if(_isValidToken(token)) {
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
            if(_isValidToken(subToken)) {
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
        if(_isValidToken(token)) {
            const hasClass = contains(token);

            if (typeof force === 'boolean') {
                force ? add(token) : remove(token);
                return force;
            }

            hasClass ? remove(token) : add(token);
            return !hasClass
        }
    }
    function replace(oldToken, newToken) {
        if (!contains(oldToken)) {
            return false
        }
        if(_isValidToken(oldToken)) {
            remove(oldToken)
            add(newToken)
        }
    }
    function $toString() {
        return target.className
    }
    function item(index) {
        return target.classList.item(index)
    }
    function getTokens() {
        if(target.className.trim().length === 0) {
            return []
        }
        return target.className.split(" ").filter(Boolean);
    }
    function setTokens(list) {
        if (!Array.isArray(list)) {
            throw new TypeError('Expected an array of class names');
        }
        if(list) {
            target.className = '';
            target.classList.add(...list);
        }
    }
    function _isValidToken(token) {
        if(!Boolean(token) || typeof token !== 'string' || token.trim() === "" || exclude.includes(token)) {
            throw new TypeError('Invalid token');
        } else {
            return true
        }
    }
    function indexOf(list, token) {
        if (!Array.isArray(list)) {
            throw new TypeError('First argument must be an array');
        }
        return list.indexOf(token);
    }



    return {
        add
        ,remove
        ,contains
        ,toggle
        ,replace
        , toString: $toString
        , length: 0
        , item
    }
}

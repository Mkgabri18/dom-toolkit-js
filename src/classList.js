/**
 * ClassList is a utility for managing class names of an HTML element.
 *
 * @param {HTMLElement} $elem - The HTML element to manage class names for.
 * @returns {Object} - An object with methods for managing class names.
 */
export default function ClassList($elem) {
    let elem = $elem;

    const exclude = ['undefined', 'null', '0', 'false']

    /**
     * Adds a class name to the element.
     * @param {string} token - The class name to add.
     * @return {void} - No return value.
     */
    function add(token) {
        // console.log("token: " + token);
        let currentList = getTokens();
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
        let currentList = getTokens()
        if(checkToken(token)) {
            let index = indexOf(getTokens(), token)
            if (index > -1) {
                currentList.splice(index, 1)
                setTokens(currentList)
            }
        }
        return this
    }
    function contains(token) {
        return indexOf(getTokens(), token) > -1
    }
    function toggle(token) {
        //TODO: add force parameter
        if(checkToken(token)) {
            if (contains(token)) {
                remove(token)
                return false
            } else {
                add(token)
                return true
            }
        }
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





export default function DomSelector ($elem) {
    let elem = $elem;

    function firstChild() {
        // From child utils
        return elem.firstElementChild || null;
    }

    function lastChild(element) {
        // From child utils
        return element.lastElementChild || null;
    }
    function nextSibling(element) {
        // From element manipulation utils
        return element.nextElementSibling || null;
    }

    function prevSibling(element) {
        // From element manipulation utils
        return element.previousElementSibling || null;
    }

    function isEmpty(element) {
        // From child utils
        return element.childElementCount === 0;
    }

    function parent(element) {
        // From element manipulation utils
        return element.parentElement || null;
    }

    function remove(element) {
        // From element manipulation utils
        const parent = this.parent(element);

        if (!parent) return false;

        parent.removeChild(element);
        return true;
    }

    function create(tag) {
        // From element manipulation utils
        return document.createElement(tag);
    }

    function getComputedStyles(element) {
        // From window utils
        return window.getComputedStyle(element);
    }

    function insertBefore(element, newElement) {
        if (!(element instanceof Element) || !(newElement instanceof Element)) {
            throw new TypeError('Both arguments must be DOM elements');
        }
        // From element manipulation utils
        let parent = this.parent(element);
        //TODO check if element is NODE
        if (!parent) {
            return;
        }
        
        const nextSibling = this.nextSibling(element);
        if (nextSibling) {
            parent.insertBefore(newElement, nextSibling);
        } else {
            parent.appendChild(newElement);
        }
    }

    function insertAfter(element, newElement) {
        if (!(element instanceof Element) || !(newElement instanceof Element)) {
            throw new TypeError('Both arguments must be DOM elements');
        }
        
        // From element manipulation utils
        let parent = this.parent(element);
        //TODO check if element is NODE
        if (!parent) {
            return;
        }
        parent.insertBefore(newElement, element.nextSibling);
    }

    function clone(element) {
        // From element manipulation utils
        return element.cloneNode(true);
    }

    function isInViewport(element) {
        // From window utils
    }
    
    function inHtml(value) {
        // From element manipulation utils
        if(value === undefined) {
            return elem.innerHTML;
        }

        elem.innerHTML = value;
        return elem
    }

    return {
        firstChild,
        lastChild,
        nextSibling,
        prevSibling,
        isEmpty,
        parent,
        remove,
        create,
        getComputedStyles,
        insertBefore,
        insertAfter,
        clone,
        isInViewport,
        inHtml,
    }
}
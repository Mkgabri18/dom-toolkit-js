import { AttributesMixin } from './Attributes.js';
import { ClassMixin } from './ClassMixin.js';
import { Conditional } from './Conditional.js';
import { ContentMixin } from './Content.js';
import {DomBase} from './DomBase.js';
import { EventsMixin } from './Events.js';
import { NavigationMixin } from './Navigation.js';
import { UtilityMixin } from './Utilities.js';


export class DomSelector extends DomBase {
    constructor(element) {
        super(element);

        Object.assign(this,
            AttributesMixin,
            ClassMixin,
            EventsMixin,
            NavigationMixin,
            ContentMixin,
            UtilityMixin,
            Conditional
        );
    }

    // Static factory method
    static from(selector) {
        return new DomSelector(selector);
    }

    static all(selector, context = document) {
        const elements = Array.from(context.querySelectorAll(selector));
        return new DomCollection(elements);
    }

    static create(tag) {
        // From element manipulation utils
        const el = document.createElement(tag);
        const selector = new DomSelector(el);
        return selector;
    }
 
}


class DomCollection {
    constructor(elements) {
        this.elements = Array.isArray(elements) ? elements : [elements];
        this.length = this.elements.length;

        // Make collection iterable
        this[Symbol.iterator] = function* () {
            for (const el of this.elements) {
                yield new DomSelector(el);
            }
        };
    }

    // Applica un'operazione a tutti gli elementi
    each(callback) {
        this.elements.forEach((el, index) => {
            callback(new DomSelector(el), index, this);
        });
        return this;
    }

    // Filtra la collezione
    filter(selector) {
        const filtered = this.elements.filter(el => el.matches(selector));
        return new DomCollection(filtered);
    }

    // Return first element as DomSelector
    first() {
        return this.length > 0 ? new DomSelector(this.elements[0]) : null;
    }

    // Return last element as DomSelector
    last() {
        return this.length > 0 ? new DomSelector(this.elements[this.length - 1]) : null;
    }

    // Batch operations - applica metodi a tutti gli elementi
    addClass(...classes) {
        return this.each(el => el.addClass(...classes));
    }

    removeClass(...classes) {
        return this.each(el => el.removeClass(...classes));
    }

    css(prop, value) {
        return this.each(el => el.css(prop, value));
    }

    on(event, handler) {
        return this.each(el => el.on(event, handler));
    }

    attr(name, value) {
        return this.each(el => el.attr(name, value));
    }

    text(value) {
        if (value === undefined) {
            return this.elements.map(el => el.textContent);
        }
        return this.each(el => new DomSelector(el).text(value));
    }

    html(value) {
        if (value === undefined) {
            return this.elements.map(el => el.innerHTML);
        }
        return this.each(el => new DomSelector(el).html(value));
    }
}



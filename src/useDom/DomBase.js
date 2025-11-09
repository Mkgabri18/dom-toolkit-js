// ============================================================================
// BASE CLASS - Core functionality
// ============================================================================

/**
 * Classe base con funzionalità essenziali
 * Gestisce la validazione e l'accesso all'elemento
 */
export class DomBase {
    constructor(element) {
        this.element = this._resolveElement(element);
        this._validateElement();
    }

    /**
     * Risolve l'input in un elemento DOM
     * @private
     */
    _resolveElement(element) {
        if (typeof element === 'string') {
            return document.querySelector(element);
        }
        
        if (element instanceof DomBase) {
            return element.element;
        }
        
        return element;
    }

    /**
     * Valida che l'elemento sia valido
     * @private
     */
    _validateElement() {
        if (!this.element || this.element.nodeType !== 1) {
            throw new TypeError('DomSelector requires a valid DOM element');
        }
    }

    /**
     * Accesso all'elemento nativo
     */
    get native() {
        return this.element;
    }

    /**
     * Verifica se l'elemento esiste nel DOM
     */
    exists() {
        return document.contains(this.element);
    }

    /**
     * Rappresentazione stringa
     */
    toString() {
        return this.element.outerHTML;
    }
}
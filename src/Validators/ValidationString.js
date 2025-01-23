export default class ValidationString {
    constructor() {
        if (new.target === ValidationString) {
            throw new Error("Cannot instantiate an abstract class directly.");
        }
    }

    selecId(key) {
        // Controllo base per stringa non vuota
        if (typeof key !== "string" || key.trim() === "") {
            throw new Error("The key must be a non-empty string.");
        }
        console.log("Validation passed for key:", key);
    }
}
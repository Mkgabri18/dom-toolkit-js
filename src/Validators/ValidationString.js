
const ValidationString = {
    sanitizeSelector(key) {
        // Basic check for a non-empty string
        if (typeof key !== "string" || key.trim() === "") {
            throw new Error("The key must be a non-empty string.");
        }
        console.log("Validation passed for key:", key);
    }
}

export default ValidationString;
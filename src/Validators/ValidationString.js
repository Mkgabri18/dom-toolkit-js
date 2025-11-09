
const ValidationString = {
    sanitizeSelector(key) {
        // Basic check for a non-empty string
        if (typeof key !== "string" || key.trim() === "") {
            throw new Error("The key must be a non-empty string.");
        }
    }
}

export default ValidationString;
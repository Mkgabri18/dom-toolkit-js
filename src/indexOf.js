

/**
 * Finds the index of a specified element in an array.
 * @param {Array} arr - The array to search within.
 * @param {*} obj - The element to find the index of.
 * @returns {number} The index of the element in the array, or -1 if not found.
 */
export default function(arr, obj) {
  if (!Array.isArray(arr)) {
    throw new TypeError('First argument must be an array');
  }
  
  return arr.indexOf(obj);
};

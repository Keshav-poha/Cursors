// index.js

/**
 * Greets the world or a given name.
 * @param {string} [name="World"] - The name to greet.
 * @returns {string} The greeting message.
 */
function greet(name = "World") {
  return `Hello, ${name}!`;
}

module.exports = {
  greet
};

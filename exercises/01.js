// ## Part 1 — Variables, Arrow Functions, Destructuring, Spread
// ### Exercise 1 — `const` and `let`
// Identify which variables should be `const` and which should be `let`. Rewrite the block.

// This is a test to see everything works

let movieTitle = "Inception";
const releaseYear = 2010;
let isWatched = false;
let rating = 8.8;

// Later in the code:
isWatched = true;
rating = 8.8 + 0.2;
movieTitle = "Interstellar"; // should this be allowed?

console.log(movieTitle, releaseYear, isWatched, rating);


const formatTitle = (title, year) => {
  return title + " (" + year + ")";
}

const isHighRated = (movie) => {
  return movie.rating >= 8.0;
}

const double = (n) => n*2;

const toSummary = (movie) => ({ title: movie.title, rating: movie.rating });

console.log(formatTitle("Inception", 2010)); // "Inception (2010)"
console.log(isHighRated({ rating: 9.0 })); // true
console.log(double(5)); // 10
console.log(toSummary({ title: "Dune", rating: 8.0 })); // { title: "Dune", rating: 8 }

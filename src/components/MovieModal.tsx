import {useEffect} from "react"
import {Heart, Star} from "lucide-react"
import type {Genre, Movie} from "../types"
import {getBackdropUrl, getPosterUrl} from "../data/sampleMovies"
import {getGenreNames} from "../data/genres"
import {useFavoriteStatus} from "../context/AppContext"

interface MovieModalProps {
    movie: Movie
    genres?: Genre[]
    onClose: () => void
}

const MovieModal = ({movie, genres: genreList = [], onClose}: MovieModalProps) => {
    const {isFav, toggle: toggleFavorite} = useFavoriteStatus(movie)

    // Close on Escape; the cleanup removes the listener when the modal unmounts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose()
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    const genres = getGenreNames(movie.genre_ids, genreList)
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"
    const releaseFormatted = movie.release_date
        ? new Date(movie.release_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "Unknown Release Date"
    const trailerQuery = `${movie.title} trailer ${movie.release_date?.slice(0, 4) ?? ""}`

    return (
        <div className="modal-overlay active" onClick={onClose}>
            <div
                className="modal-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-movie-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="modal-close-btn"
                    aria-label="Close"
                    onClick={onClose}
                >
                    &times;
                </button>

                <div
                    className="modal-backdrop-hero"
                    style={{backgroundImage: `url("${getBackdropUrl(movie.backdrop_path)}")`}}
                />

                <div className="modal-body">
                    <img
                        className="modal-poster"
                        src={getPosterUrl(movie.poster_path)}
                        alt={movie.title}
                    />

                    <div className="modal-content-details">
                        <h2 className="modal-title" id="modal-movie-title">{movie.title}</h2>

                        <div className="modal-meta-row">
                            <span className="rating-badge">
                                <Star/>
                                {rating} / 10
                            </span>
                            {movie.vote_count > 0 && (
                                <span className="modal-meta-item">
                                    {movie.vote_count.toLocaleString()} Ratings
                                </span>
                            )}
                            <span className="modal-meta-item">{releaseFormatted}</span>
                            {movie.popularity ? (
                                <span className="modal-meta-item">
                                    Popularity: {Math.round(movie.popularity)}
                                </span>
                            ) : null}
                        </div>

                        <div className="movie-genres-tags">
                            {genres.map((genre) => (
                                <span key={genre} className="genre-tag">{genre}</span>
                            ))}
                        </div>

                        <div className="modal-overview">
                            <h4 className="modal-overview-heading">Overview</h4>
                            <p>{movie.overview || "No plot synopsis available."}</p>
                        </div>

                        <div className="modal-footer-actions">
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={toggleFavorite}
                            >
                                <Heart fill={isFav ? "currentColor" : "none"}/>
                                {isFav ? "In Watchlist" : "Add to Watchlist"}
                            </button>
                            <a
                                className="btn-secondary"
                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(trailerQuery)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Watch Trailer
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieModal

import {useState} from "react"
import {AlertTriangle} from "lucide-react"
import MovieList from "../components/MovieList"
import MovieModal from "../components/MovieModal"
import {useMovies} from "../hooks/useMovies"
import {useGenres} from "../hooks/useGenres"
import type {Movie} from "../types"

interface HomePageProps {
    searchQuery?: string
    // Shown while the live fetch is loading or after it fails (placeholder data)
    fallbackMovies?: Movie[]
}

const HomePage = ({searchQuery = "", fallbackMovies}: HomePageProps) => {
    const {movies, isLoading, error} = useMovies()
    const {genres} = useGenres()
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

    const hasLiveData = !isLoading && !error
    const showFallback = !hasLiveData && fallbackMovies !== undefined
    const visibleMovies = showFallback ? fallbackMovies : movies

    const filteredMovies = visibleMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <main className="main-container">
            <h1>Movie App</h1>
            {showFallback && (
                <p className="empty-text">
                    {isLoading
                        ? "Loading live movies…"
                        : "Live data unavailable, showing sample movies."}
                </p>
            )}
            {!showFallback && isLoading && (
                <div className="movies-grid">
                    {Array.from({length: 8}).map((_, index) => (
                        <div key={index} className="skeleton-card"/>
                    ))}
                </div>
            )}
            {!showFallback && !isLoading && error && (
                <div className="empty-state">
                    <div className="empty-icon">
                        <AlertTriangle/>
                    </div>
                    <p className="empty-title">Something went wrong</p>
                    <p className="empty-text">{error}</p>
                </div>
            )}
            {(hasLiveData || showFallback) && (
                <MovieList
                    movies={filteredMovies}
                    genres={genres}
                    onMovieClick={setSelectedMovie}
                />
            )}
            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    genres={genres}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </main>
    )
}

export default HomePage

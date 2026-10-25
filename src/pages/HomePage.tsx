import {useState} from "react"
import {AlertTriangle} from "lucide-react"
import MovieList from "../components/MovieList"
import MovieModal from "../components/MovieModal"
import {useMovies} from "../hooks/useMovies"
import {useGenres} from "../hooks/useGenres"
import type {Movie} from "../types"

interface HomePageProps {
    searchQuery?: string
}

const HomePage = ({searchQuery = ""}: HomePageProps) => {
    const {movies, isLoading, error} = useMovies()
    const {genres} = useGenres()
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <main className="main-container">
            <h1>Movie App</h1>
            {isLoading && (
                <div className="movies-grid">
                    {Array.from({length: 8}).map((_, index) => (
                        <div key={index} className="skeleton-card"/>
                    ))}
                </div>
            )}
            {!isLoading && error && (
                <div className="empty-state">
                    <div className="empty-icon">
                        <AlertTriangle/>
                    </div>
                    <p className="empty-title">Something went wrong</p>
                    <p className="empty-text">{error}</p>
                </div>
            )}
            {!isLoading && !error && (
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

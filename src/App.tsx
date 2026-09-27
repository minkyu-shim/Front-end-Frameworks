import {useState} from "react"
import {AlertTriangle} from "lucide-react"
import SearchBar from "./components/SearchBar"
import MovieList from "./components/MovieList"
import {useMovies} from "./hooks/useMovies"

function App() {
    const [query, setQuery] = useState("")
    const {movies, isLoading, error} = useMovies()

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="app-layout">
            <header className="site-header">
                <div className="header-inner">
                    <div className="brand-logo">
                        <span className="logo-dot"/>
                        <span className="logo-text">Movie App</span>
                    </div>
                    <SearchBar query={query} onChange={setQuery}/>
                </div>
            </header>
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
                {!isLoading && !error && <MovieList movies={filteredMovies}/>}
            </main>
        </div>
    )
}

export default App

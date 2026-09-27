import { SAMPLE_MOVIES } from "../data/sampleMovies"
import type { Movie } from "../types"

interface FetchMoviesParams {
    search?: string
    genre?: number | string
    sort?: string
    onlyFavorites?: boolean
    page?: number
    signal?: AbortSignal
}

interface FetchMoviesResult {
    results: Movie[]
    total_pages: number
    total_results: number
    isLiveApi: boolean
}

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || ""

async function fetchMovies({
    search,
    page = 1,
    signal,
}: FetchMoviesParams = {}): Promise<FetchMoviesResult> {
    if (!API_KEY || API_KEY === "your_api_key_here") {
        const results = search
            ? SAMPLE_MOVIES.filter((movie) =>
                  movie.title.toLowerCase().includes(search.toLowerCase())
              )
            : SAMPLE_MOVIES

        return {
            results,
            total_pages: 1,
            total_results: results.length,
            isLiveApi: false,
        }
    }

    const endpoint = search
        ? `${BASE_URL}/search/movie?query=${encodeURIComponent(search)}&page=${page}`
        : `${BASE_URL}/movie/popular?page=${page}`

    const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        signal,
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch movies (${response.status})`)
    }

    const data = await response.json()

    return {
        results: data.results ?? [],
        total_pages: data.total_pages ?? 1,
        total_results: data.total_results ?? (data.results?.length ?? 0),
        isLiveApi: true,
    }
}

export const movieService = { fetchMovies }

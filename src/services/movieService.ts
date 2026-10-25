import type { Genre, Movie } from "../types"

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

async function tmdbGet(path: string, signal?: AbortSignal) {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        signal,
    })

    if (!response.ok) {
        throw new Error(
            `TMDB request failed (${response.status}). Check VITE_TMDB_API_KEY in your .env file.`
        )
    }

    return response.json()
}

async function fetchMovies({
    search,
    page = 1,
    signal,
}: FetchMoviesParams = {}): Promise<FetchMoviesResult> {
    const path = search
        ? `/search/movie?query=${encodeURIComponent(search)}&page=${page}`
        : `/movie/popular?language=en-US&page=${page}`

    const data = await tmdbGet(path, signal)

    return {
        results: data.results ?? [],
        total_pages: data.total_pages ?? 1,
        total_results: data.total_results ?? (data.results?.length ?? 0),
        isLiveApi: true,
    }
}

async function fetchGenres(signal?: AbortSignal): Promise<Genre[]> {
    const data = await tmdbGet("/genre/movie/list?language=en", signal)
    return data.genres ?? []
}

export const movieService = { fetchMovies, fetchGenres }

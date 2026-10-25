import { useEffect, useState } from "react"
import { movieService } from "../services/movieService"
import type { Genre } from "../types"

// Same shape as useMovies, but reads data.genres from the genre list endpoint.
// On failure the list stays empty and getGenreNames falls back to the static map.
export function useGenres(): { genres: Genre[] } {
    const [genres, setGenres] = useState<Genre[]>([])

    useEffect(() => {
        const controller = new AbortController()

        async function loadGenres() {
            try {
                const results = await movieService.fetchGenres(controller.signal)
                setGenres(results)
            } catch {
                // Non-critical: keep the static genre names
            }
        }

        loadGenres()

        return () => controller.abort()
    }, [])

    return { genres }
}

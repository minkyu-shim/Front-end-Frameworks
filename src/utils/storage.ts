import type { Movie } from "../types"

const FAVORITES_KEY = "cinegrid_favorites"
const THEME_KEY = "cinegrid_theme"
const API_KEY_KEY = "cinegrid_api_key"

export function getFavorites(): Movie[] {
    try {
        const raw = localStorage.getItem(FAVORITES_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export function toggleFavorite(movie: Movie): Movie[] {
    const favorites = getFavorites()
    const isFavorite = favorites.some((favorite) => favorite.id === movie.id)
    const updated = isFavorite
        ? favorites.filter((favorite) => favorite.id !== movie.id)
        : [...favorites, movie]

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
    return updated
}

export function getTheme(): "dark" | "light" {
    return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark"
}

export function setTheme(theme: "dark" | "light"): void {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.setAttribute("data-theme", theme)
}

export function getApiKey(): string {
    return localStorage.getItem(API_KEY_KEY) ?? ""
}

export function setApiKey(key: string): void {
    localStorage.setItem(API_KEY_KEY, key.trim())
}

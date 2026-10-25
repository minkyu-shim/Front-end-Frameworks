import type { Movie, Theme } from "../types"

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

export function saveFavorites(favorites: Movie[]): void {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

export function getTheme(): Theme {
    return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark"
}

export function setTheme(theme: Theme): void {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.setAttribute("data-theme", theme)
}

export function getApiKey(): string {
    return localStorage.getItem(API_KEY_KEY) ?? ""
}

export function setApiKey(key: string): void {
    localStorage.setItem(API_KEY_KEY, key.trim())
}

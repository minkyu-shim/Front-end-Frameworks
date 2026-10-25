import {createContext, useContext, useEffect, useReducer} from "react"
import type {ReactNode} from "react"
import type {Movie, Theme} from "../types"
import {getFavorites, getTheme, saveFavorites, setTheme} from "../utils/storage"

// 1. State shape and actions
type State = {
    theme: Theme
    favorites: Movie[]
}

type Action =
    | { type: "SET_THEME" }
    | { type: "TOGGLE_FAVOURITE"; payload: Movie }

// 2. Reducer — pure function, no side effects (localStorage is synced in useEffect below)
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_THEME":
            return {
                ...state,
                theme: state.theme === "dark" ? "light" : "dark",
            }
        case "TOGGLE_FAVOURITE": {
            const exists = state.favorites.some((movie) => movie.id === action.payload.id)
            return {
                ...state,
                favorites: exists
                    ? state.favorites.filter((movie) => movie.id !== action.payload.id)
                    : [...state.favorites, action.payload],
            }
        }
        default:
            return state
    }
}

// 3. What consumers receive
type AppContextType = {
    theme: Theme
    toggleTheme: () => void
    favorites: Movie[]
    toggleFavorite: (movie: Movie) => void
    isFavorite: (id: number) => boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// 4. Provider — wraps the app and owns the state
export const AppProvider = ({children}: { children: ReactNode }) => {
    // Lazy initializer: read localStorage once on mount, not on every render
    const [state, dispatch] = useReducer(reducer, undefined, () => ({
        theme: getTheme(),
        favorites: getFavorites(),
    }))

    // Sync theme to localStorage + <html data-theme>
    useEffect(() => {
        setTheme(state.theme)
    }, [state.theme])

    useEffect(() => {
        saveFavorites(state.favorites)
    }, [state.favorites])

    const toggleTheme = () => dispatch({type: "SET_THEME"})

    const toggleFavorite = (movie: Movie) =>
        dispatch({type: "TOGGLE_FAVOURITE", payload: movie})

    const isFavorite = (id: number) =>
        state.favorites.some((movie) => movie.id === id)

    return (
        <AppContext.Provider
            value={{
                theme: state.theme,
                toggleTheme,
                favorites: state.favorites,
                toggleFavorite,
                isFavorite,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

// 5. Custom hook — fails loudly when used outside the Provider
// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider")
    }
    return context
}

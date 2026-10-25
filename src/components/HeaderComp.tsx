import {NavLink} from "react-router-dom"
import {Heart, Moon, Sun} from "lucide-react"
import {useAppContext} from "../context/AppContext"
import SearchBar from "./SearchBar"

interface HeaderProps {
    searchQuery: string
    onChange: (value: string) => void
}

const HeaderComponent = ({searchQuery, onChange}: HeaderProps) => {
    const {theme, toggleTheme, favorites} = useAppContext()

    return (
        <header className="site-header">
            <div className="header-inner">
                <div className="header-left">
                    <div className="brand-logo">
                        <span className="logo-dot"/>
                        <span className="logo-text">CINE&middot;GRID</span>
                    </div>
                    <nav className="header-nav">
                        <NavLink to="/" end>Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </nav>
                </div>

                <div className="header-search">
                    <SearchBar query={searchQuery} onChange={onChange}/>
                </div>

                <div className="header-actions">
                    <button type="button" className="btn-icon-label">
                        <Heart/>
                        Watchlist {favorites.length}
                    </button>
                    <button
                        type="button"
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                    >
                        {theme === "dark" ? <Sun/> : <Moon/>}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default HeaderComponent

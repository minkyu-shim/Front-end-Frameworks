import {Search} from "lucide-react"

interface SearchBarProps {
    query: string
    onChange: (value: string) => void
}

const SearchBar = ({query, onChange}: SearchBarProps) => {
    return (
        <div className="search-input-wrapper">
            <Search className="search-icon"/>
            <input
                type="text"
                className="search-input"
                placeholder="Search movies..."
                value={query}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    )
}

export default SearchBar

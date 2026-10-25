import {useState} from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {AppProvider} from "./context/AppContext"
import HeaderComponent from "./components/HeaderComp"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import NotFoundPage from "./pages/NotFoundPage"
import {SAMPLE_MOVIES} from "./data/sampleMovies"

function App() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <AppProvider>
            <BrowserRouter>
                <div className="app-layout">
                    <HeaderComponent searchQuery={searchQuery} onChange={setSearchQuery}/>
                    <Routes>
                        <Route
                            path="/"
                            element={<HomePage searchQuery={searchQuery} fallbackMovies={SAMPLE_MOVIES}/>}
                        />
                        <Route path="/about" element={<AboutPage/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </AppProvider>
    )
}

export default App

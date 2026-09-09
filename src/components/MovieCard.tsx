import {Movie} from "../types"

const MovieCard = {{title, id}: Movie} => {
    return (
        <section className="movie-card">
            <h2 className="movie-title">{title}</h2>
            <p>id: {id}</p>
        </section>
    )
}

export default MovieCard

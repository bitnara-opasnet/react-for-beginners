import { useEffect, useState } from "react";
import Movie from "../compoments/Movie"
import styles from "./Home.module.css"


function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async() => {
        const response = await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`)
                                .then((res) => res.json());
        setMovies(response.data.movies);
        setLoading(false);
    };
    useEffect(() => {
        getMovies();
    }, []);
    // console.log(movies)
    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loader}>
                    <span>Loading...</span>
                </div>
            ) : (
                <div className={styles.movies}>
                    {movies.map(movie => (
                        <Movie 
                            key={movie.id} 
                            movie={movie}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
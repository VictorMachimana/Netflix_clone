import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);

    // A snippet of code which runs based on a specific condition/variable
    useEffect(() => {
        // e.g https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
        // if [], run once then row loads, and don't run it again || or [movies] - it will run everytime movies changes(dependencies)
    }, [fetchUrl]); //when ever your using any variable in the useEffect from outside useEffect you have to put it in the array, because it's a dependent

    // console.log(movies);
    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
                {/* several row_poster */}

                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                        alt={movie?.name || movie?.title || movie?.original_name}
                    />
                ))}
            </div>
        </div>
    );
}

export default Row;

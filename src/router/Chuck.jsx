import { useState, useEffect } from "react";


const Chuck = () => {
    const [jokesList, setJokesList] = useState([]);
    useEffect(() => {
        const timer = setInterval( () => {
            fetch("https://api.chucknorris.io/jokes/random")
                .then(res => res.json())
                .then(data => {
                    setJokesList(data);
                    console.log(jokesList);
                });
        }, 3000);
        return () => clearInterval(timer);
    });

    return (
        <div>

            <div className="result-box form-control w-50 mt-3" aria-readonly>
                <p className="mt-3">created at: {jokesList.created_at}</p>
                <p>icon url: <img src={jokesList.icon_url} /></p>
                <p>id: {jokesList.id}</p>
                <p>updated at: {jokesList.updated_at}</p>
                <p>url: {jokesList.url}</p>
                <p>value: {jokesList.value}</p>
            </div>

        </div>
    )
}

export default Chuck;
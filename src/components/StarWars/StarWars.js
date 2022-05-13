import { useState } from 'react';
import StarChar from '../StarChar/StarChar';
import "./StarWars.css";

function StarWars() {
    const [number, setNumber] = useState(1);
    const [data, setData] = useState(null);
    const [list, setList] = useState([]);
    const [movieList, setMovieList] = useState([]);

    function fetchData() {

        const path=`https://swapi.dev/api/people/${number}/`;
        fetch(path).then((data) => {
            const json = data.json();
            return json;
        }).then((result) => {
            const name = result.name;
            const height = result.height; 
            const mass = result.mass;
            const hairColor = result.hair_color;
            const eyeColor = result.eye_color;
            const films = result.films;
            const homeWorldUrl = result.homeworld;

            fetch(homeWorldUrl).then((data) => {
                const homeJson = data.json();
                return homeJson;
            }).then((result) => {
                const homeWorldName = result.name;
                const homeWorldPopulation = result.population;
                const homeWorldClimate = result.climate;
                const homeWorldTerrain = result.terrain;
                Promise.all(films.map(film => fetch(film))).then((resArray) => {
                    return Promise.all(resArray.map(res => res.json()));
                }).then((filmsJSON) => {
                    filmsJSON.map((film) => {
                        setMovieList([...movieList, film.title])
                    })
                })
                setData({
                    name,
                    height,
                    mass,
                    hairColor,
                    eyeColor,
                    homeWorldUrl,
                    films,
                    homeWorldName,
                    homeWorldPopulation,
                    homeWorldClimate,
                    homeWorldTerrain,
                    movieList
                })
            })
            // console.log(films);
            console.log(movieList)
        })
    }
    return (
        <div className="StarWars">
            <div className='StarCharData'>
                {data ? <StarChar {...data}/>: <p>Ready</p>}
            </div>
            <div className='formList'>
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        fetchData();
                        console.log(number)
                    }}>
                        <div>
                            <h3>You will be unable to enter the number 17 or any number greater than 83</h3>
                            <h3>Try and see</h3>
                            <input
                                placeholder='Enter a Number'
                                onChange={(e) => {
                                    if (e.target.value === 17) {
                                        e.target.value = 18
                                    } else if (e.target.value > 83){
                                        e.target.value = 83
                                    }
                                    setNumber(e.target.value)
                                }}/>
                            <button type='submit'>Submit</button>
                            <button type='button' onClick={() => {
                                setList([...list, data])
                            }}>Save</button>
                        </div> 
                    </form>
                </div>
                <div>
                    <div className='savedListHeader'>
                        <h1>List of Saved Characters</h1>
                    </div>
                    <div className='savedList'>
                        {list.map((item, index) => {
                            return <StarChar key={index} name={item.name} height={item.height} mass={item.mass} hairColor={item.hairColor} eyeColor={item.eyeColor} homeWorldName={item.homeWorldName}
                            homeWorldPopulation={item.homeWorldPopulation} homeWorldClimate={item.homeWorldClimate} homeWorldTerrain={item.homeWorldTerrain} movieList={item.movieList} />
                        })}
                    </div>
                </div>
            </div>
            
            
            
            
        </div>
    )
};
export default StarWars;

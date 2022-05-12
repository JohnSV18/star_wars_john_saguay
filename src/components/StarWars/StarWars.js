import { useState } from 'react';
import StarChar from '../StarChar/StarChar';
import "./StarWars.css";

function StarWars() {
    const [number, setNumber] = useState(1);
    const [data, setData] = useState(null);
    const [list, setList] = useState([]);
    const [homeWorld, setHomeWorld] = useState(null)

    async function fetchData() {
        const path=`https://swapi.dev/api/people/${number}/`;
        const res = await fetch(path);
        const json = await res.json();
        const name = json.name;
        const height = json.height; 
        const mass = json.mass;
        const hairColor = json.hair_color;
        const eyeColor = json.eye_color;
        const films = json.films;
        const homeWorldUrl = json.homeworld;
        setData({
            name,
            height,
            mass,
            hairColor,
            eyeColor,
            homeWorldUrl,
            films
        });
        console.log(data);
    }
    async function fetchHomeWorld(url) {
        const res = await fetch(url);
        const json = await res.json();
        console.log(json)
        return json;
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
                            <h3>Please enter a number that is NOT 17 or greater than 83.</h3>
                            <h3> If you enter 17 it will automatically be set as 18</h3>
                            <h3>If you enter a number greater than 83 it will automatically be set to 83</h3>
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
                                fetchHomeWorld(data.homeWorldUrl).then((homeWorldData) => {
                                    const homeWorldName = homeWorldData.name;
                                    const homeWorldPopulation = homeWorldData.population;
                                    const homeWorldClimate = homeWorldData.climate;
                                    const homeWorldTerrain = homeWorldData.terrain;
                                    // const filmsRes = await Promise.all(films.map(film => fetch(film)))
                                    // Get an array of Promises, these are the responses
                                    Promise.all(data.films.map(film => fetch(film))).then(resArray => {
                                        return Promise.all(resArray)
                                    }).then(filmsJSON => {
                                        filmsJSON.map(film => {
                                            fetch(film).then(() => {
                                                console.log(film)
                                            })
                                        // console.log(resArray)
                                        })
                                    })
                                                        
                                    setData({
                                        ...data,
                                        homeWorldName,
                                        homeWorldPopulation,
                                        homeWorldClimate,
                                        homeWorldTerrain
                                    })
                                    setList([...list, data])
                                //   console.log(homeWorld)
                                })
                                // console.log(list)
                            }}>Save</button>
                        </div> 
                    </form>
                </div>
                <div className="savedList">
                    {list.map((item, index) => {
                        return <StarChar key={index} name={item.name} height={item.height} mass={item.mass} hairColor={item.hairColor} eyeColor={item.eyeColor} homeWorldName={item.homeWorldName}
                        homeWorldPopulation={item.homeWorldPopulation} homeWorldClimate={item.homeWorldClimate} homeWorldTerrain={item.homeWorldTerrain} />
                    })}
                </div>
            </div>
            
            
            
            
        </div>
    )
};
export default StarWars;

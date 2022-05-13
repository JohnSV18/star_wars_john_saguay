import "./StarChar.css";
function StarChar(props) {
    // const { starChar } = props;

    return(
        <div className="StarChar">
            <h1 className="firstName">Name: {props.name}</h1>
            <p className="height">Height: {props.height}</p>
            <p>Mass: {props.mass}</p>
            <p>Hair Color: {props.hairColor}</p>
            <p>Eye Color: {props.eyeColor}</p>
            <p>Home World: {props.homeWorldName}</p>
            <p>Home World Population: {props.homeWorldPopulation}</p>
            <p>Home World Climate: {props.homeWorldClimate}</p>
            <p>Home World Terrain: {props.homeWorldTerrain}</p>
            <p>Movies: {props.movieList}</p>
            
        </div>
    )
}
export default StarChar;
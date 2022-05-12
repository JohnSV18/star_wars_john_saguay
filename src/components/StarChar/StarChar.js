import "./StarChar.css";
function StarChar(props) {
    // const { starChar } = props;

    return(
        <div className="StarChar">
            <h1 className="firstName">Name: {props.name}</h1>
            <h2 className="height">Height: {props.height}</h2>
            <h2>Mass: {props.mass}</h2>
            <h2>Hair Color: {props.hairColor}</h2>
            <h2>Eye Color: {props.eyeColor}</h2>
            <h3>Home World: {props.homeWorldName}</h3>
            <h3>Home World Population: {props.homeWorldPopulation}</h3>
            <h3>Home World Climate: {props.homeWorldClimate}</h3>
            <h3>Home World Terrain: {props.homeWorldTerrain}</h3>
            
        </div>
    )
}
export default StarChar;
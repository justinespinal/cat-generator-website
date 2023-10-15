
const APIOutput = ({ outputs, onSubmit, setBan}) => {
    return (
        <div>
            <h2>Tripping on Cats</h2>
            <h3>Discover cats from your wildest dreams!</h3>
            <h3>😺😸😹😻😼😽🙀😿😾</h3>
            {outputs.image ? (
                <div>
                    <h2>{outputs.name}</h2>
                    <div>
                        <button onClick={()=>{setBan(outputs.breed)}}>{outputs.breed}</button>
                        <button onClick={()=>{setBan(`${outputs.weight}`)}}>{outputs.weight}</button>
                        <button onClick={()=>{setBan(outputs.location)}}>{outputs.location}</button>
                        <button onClick={()=>{setBan(`${outputs.age}`)}}>{outputs.age}</button>
                    </div>
                    <br/>
                    <img
                        className="img"
                        src={outputs.image}
                        alt="Random cat"
                    />
                </div>
            ) : (
                <div> </div>
            )}
            <button className="button" onClick={onSubmit}>Cat time!</button>
        </div>
    );
}

export default APIOutput;
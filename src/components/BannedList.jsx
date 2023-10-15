
const BannedList = ({ bannedList, removeBanned }) => {
    return (
        <div className="banned-list">
        <h2>Banned List</h2>
        <h3>Select an attribute in your listing to ban it</h3>
        <ul>
            {bannedList.map((name, index) => (
            <li key={index}>
                <button onClick={() => removeBanned(name)}>{name}</button>
            </li>
            ))}
        </ul>
        </div>
    );
}

export default BannedList;
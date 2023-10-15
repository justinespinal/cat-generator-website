import { useState } from 'react'
import './App.css'
import APIOutput from './components/APIOutput';
import BannedList from './components/BannedList';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [outputs, setOutputs] = useState({
    name: "",
    breed: "",
    weight: "",
    location: "",
    age: "",
    image: ""
  });

  const [banned, setBanned] = useState([]);

  const catNames = [
    "Lily", "Nala", "Oliver", "Bella", "Lucy", 
    "Milo", "Charlie", "Max", "Jack", "Luna"
  ];

const getRandomCatName = () => {
  const randomIndex = Math.floor(Math.random() * catNames.length);
  return catNames[randomIndex];
}

  const makeQuery = () => {
    return 'https://api.thecatapi.com/v1/images/search?api_key=' + ACCESS_KEY + '&limit=1';
  };

  const callAPI = async (query) => {
    try {
        const response = await fetch(query);
        if (!response.ok) {
            console.error("Failed API call with status:", response.status);
            return null;
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error in callAPI:", error);
        return null;
    }
}

const setBan = (value) => {
  if(!banned.includes(value)){
    setBanned([...banned, value]);
  }
}

const removeBanned = (value) => {
  setBanned(banned.filter((item) => item !== value));
}

const fetchValidCat = async () => {
  const query = makeQuery();
  const response = await callAPI(query);

  if (response && response.length > 0) {
    if (response[0].breeds && response[0].breeds.length > 0) {
      const name = getRandomCatName();
      const breed = response[0].breeds[0].name;
      const weight = `${response[0].breeds[0].weight.metric} lbs`;
      const location = response[0].breeds[0].origin;
      const age = `${response[0].breeds[0].life_span} years`;

      if(banned.includes(breed) || banned.includes(name) || banned.includes(location) || banned.includes(age) || banned.includes(weight)) {
        console.log("Banned breed. Making another API call...");
        return fetchValidCat();
      } else {
        return {
          name: name,
          breed: breed,
          weight: weight,
          location: location,
          age: age,
          image: response[0].url
        };
      }
    } else {
      console.log("No breed information. Making another API call...");
      return fetchValidCat();
    }
  } else {
    console.error("Unexpected API response format:", response);
    return null;
  }
}

const onSubmit = async (e) => {
  console.log("Button clicked. Making API call...");

  const validCat = await fetchValidCat();
  if(validCat) {
    setOutputs(validCat);
  }
}
  return (
    <div className='main-screen'>
      <div className='api'>
        <APIOutput
          outputs={outputs}
          onSubmit={onSubmit}
          ban={banned}
          setBan={setBan}
        />
      </div>
      <div className='banned'>
        <BannedList
        bannedList={banned}
        removeBanned={removeBanned}/>
        
      </div>
    </div>
  )
}

export default App;
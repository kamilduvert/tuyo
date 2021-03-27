import React, { useState } from 'react';
import axios from 'axios';

import './styles.scss';

const Search = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [location, setLocation] = useState('');
    const [timer, setTimer] = useState(null);
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    })

    const handleChange = (newValue) => {
        setLocation(newValue);
    }

    const handleSelect = (value) => {
        setSuggestions([]);
        getLatLngApi(location);
        setLocation(value);
    }

    const geoCodingApi = (value) => {
        const APIkey = "77e8019269af16b13512c46943760330";

        if (!value || value.length <= 5) {
            return
        }

        setTimer(clearTimeout(timer));
        setTimer(window.setTimeout(() => {
            axios.get(`http://api.positionstack.com/v1/forward?access_key=${APIkey}&query=${value}`)
                .then((response) => {
                    setSuggestions(response.data.data);
                })
                .catch((error) => {
                    return error;
                });
        }, 1000))
    };

    const getLatLngApi = (value) => {
        const APIkey = "77e8019269af16b13512c46943760330"
        if (!value) {
            return
        }
        setTimer(clearTimeout(timer));
        setTimer(window.setTimeout(() => {
            axios.get(`http://api.positionstack.com/v1/forward?access_key=${APIkey}&query=${value}`)
                .then((response) => {
                    setCoordinates({
                        lat: response.data.data[0].latitude,
                        lng: response.data.data[0].longitude
                    });
                });
        }, 1000))
    };

    return (
        <form
            className="home__seach-form"
            onSubmit={(e) => {
                e.preventDefault();
                setLocation('');
                console.log(coordinates);
            }}
        >
            <input
                placeholder="Où voulez-vous partir ?"
                type="text"
                value={location}
                onChange={(e) => {
                    handleChange(e.target.value);
                    geoCodingApi(e.target.value);
                }}
                list="places_suggestions"
                onSelect={(e) => {
                    handleSelect(e.target.value);
                    setSuggestions([]);
                }}
            />
            <button type="submit"><i className="fas fa-search"></i></button>
            <datalist id="places_suggestions">
                {suggestions.map((suggestion, index) => {
                    return <option value={suggestion.label} key={index} onClick={() => {
                        setLocation(suggestion.label);
                    }}></option>
                })}
            </datalist>
        </form>
    )
}

export default Search;
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
    const [names, setNames] = useState([]);
    const [tribes, setTribes] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedName, setSelectedName] = useState('');
    const [selectedTribe, setSelectedTribe] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        // Fetch data for dropdowns
        const fetchData = async () => {
            try {
                const [namesResponse, tribesResponse, yearsResponse] = await Promise.all([
                    axios.get('/api/names'),
                    axios.get('/api/tribes'),
                    axios.get('/api/years')
                ]);

                setNames(namesResponse.data);
                setTribes(tribesResponse.data);
                setYears(yearsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log({ selectedName, selectedTribe, selectedYear });
    };

    return (
        <div>
            <h1>Attendance Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <select
                        id="name"
                        value={selectedName}
                        onChange={(e) => setSelectedName(e.target.value)}
                    >
                        <option value="">Select a name</option>
                        {names.map(name => (
                            <option key={name.id} value={name.id}>{name.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="tribe">Tribe:</label>
                    <select
                        id="tribe"
                        value={selectedTribe}
                        onChange={(e) => setSelectedTribe(e.target.value)}
                    >
                        <option value="">Select a tribe</option>
                        {tribes.map(tribe => (
                            <option key={tribe.id} value={tribe.id}>{tribe.tribe}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="year">Year Level:</label>
                    <select
                        id="year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">Select a year level</option>
                        {years.map(year => (
                            <option key={year.id} value={year.id}>{year.year}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Attendance;

"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

const Attendance = () => {
    const [names, setNames] = useState([]);
    const [tribes, setTribes] = useState([]);
    const [years, setYears] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [selectedTribe, setSelectedTribe] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [qrValue, setQrValue] = useState('');

    useEffect(() => {

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

        const qrData = `ID: ${studentId}, Year: ${selectedYear}, Tribe: ${selectedTribe}, Name: ${selectedName}`;
        setQrValue(qrData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Attendance Form</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="year" className="block text-gray-700 font-medium mb-2">Year Level:</label>
                        <select
                            id="year"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-150 ease-in-out transform hover:scale-105 w-full"
                        >
                            <option value="">Select a year level</option>
                            {years.map(year => (
                                <option key={year.id} value={year.id}>{year.year}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="tribe" className="block text-gray-700 font-medium mb-2">Tribe:</label>
                        <select
                            id="tribe"
                            value={selectedTribe}
                            onChange={(e) => setSelectedTribe(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-150 ease-in-out transform hover:scale-105 w-full"
                        >
                            <option value="">Select a tribe</option>
                            {tribes.map(tribe => (
                                <option key={tribe.id} value={tribe.id}>{tribe.tribe}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name:</label>
                        <select
                            id="name"
                            value={selectedName}
                            onChange={(e) => setSelectedName(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-150 ease-in-out transform hover:scale-105 w-full"
                        >
                            <option value="">Select a name</option>
                            {names.map(name => (
                                <option key={name.id} value={name.id}>{name.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="studentId" className="block text-gray-700 font-medium mb-2">Student ID:</label>
                        <input
                            type="text"
                            id="studentId"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="Enter Student ID"
                            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-150 ease-in-out transform hover:scale-105 w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-150 ease-in-out transform hover:scale-105"
                    >
                        Submit
                    </button>
                </form>

                { }
                {qrValue && (
                    <div className="mt-8 text-center">
                        <h2 className="text-xl font-semibold mb-4">QR Code:</h2>
                        <QRCode value={qrValue} size={256} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Attendance;

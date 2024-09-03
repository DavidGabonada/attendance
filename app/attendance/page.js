"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tribus, setTribus] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedTribu, setSelectedTribu] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get('http://localhost/tribu/tribu.php?action=get_attendance');
                if (Array.isArray(response.data)) {
                    setAttendanceData(response.data);
                    setFilteredData(response.data);

                    const uniqueTribus = [...new Set(response.data.map(entry => entry.tribu))];
                    const uniqueYears = [...new Set(response.data.map(entry => entry.year))];

                    setTribus(uniqueTribus);
                    setYears(uniqueYears);
                } else {
                    setError('Invalid data format');
                }
            } catch (error) {
                setError('Error fetching attendance data');
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

    useEffect(() => {
        const filtered = attendanceData.filter(entry => {
            return (
                (selectedTribu === '' || entry.tribu === selectedTribu) &&
                (selectedYear === '' || entry.year === selectedYear)
            );
        });
        setFilteredData(filtered);
    }, [selectedTribu, selectedYear, attendanceData]);

    if (loading) {
        return <div className="p-8 bg-gray-50 min-h-screen text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-8 bg-gray-50 min-h-screen text-center text-red-600">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white p-6 text-center shadow-lg">
                <h1 className="text-4xl font-bold">Attendance Dashboard</h1>
            </header>

            {/* Main Content */}
            <main className="flex-grow p-8">
                <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6">Attendance List</h2>

                    <div className="mb-6 flex gap-4">
                        <select
                            className="p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
                            value={selectedTribu}
                            onChange={(e) => setSelectedTribu(e.target.value)}
                        >
                            <option value="">Select Tribu</option>
                            {tribus.map((tribu, index) => (
                                <option key={index} value={tribu}>{tribu}</option>
                            ))}
                        </select>

                        <select
                            className="p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value="">Select Year</option>
                            {years.map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tribu</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time In</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Out</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredData.length > 0 ? (
                                    filteredData.map((entry, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{entry.name || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">{entry.year || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">{entry.tribu || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">{entry.timeIn || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">{entry.timeOut || 'N/A'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center">
                <p className="text-sm">© 2024 Attendance Dashboard. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Attendance;

"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [category, setCategory] = useState('Magic');
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchReports();
    }, [category]);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/reports', {
                params: { category },
            });
            if (response.data) {
                setReports(response.data);
            } else {
                console.error('No data received from API');
                setReports([]);
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
            setReports([]);
            alert('Failed to fetch reports. Please try again later.');
        }
        setLoading(false);
    };

    const handleSearch = () => {
        const filteredReports = reports.filter((report) =>
            report.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setReports(filteredReports);
    };

    const chartData = [
        { month: "First Year", attendance: 186 },
        { month: "Second Year", attendance: 305 },
        { month: "Third Year", attendance: 237 },
        { month: "Fourth Year", attendance: 273 },
    ];

    return (
        <div className="flex flex-col md:flex-row p-8 bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen">
            {/* Left Side: List of Students */}
            <div className="flex-1 bg-white p-8 rounded-xl shadow-xl mb-6 md:mb-0 md:mr-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Attendance Report</h1>
                <div className="flex flex-col gap-4 mb-8">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="All">All Tribes</option>
                        <option value="Magic">Magic</option>
                        <option value="Mage">Mage</option>
                        <option value="Fighter">Fighter</option>
                        <option value="Support">Support</option>
                        <option value="Assassin">Assassin</option>
                        <option value="Marksman">Marksman</option>
                        <option value="Jungler">Jungler</option>
                        <option value="Tank">Tank</option>
                    </select>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search Students"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="p-3 border rounded-l-md flex-grow text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            onClick={handleSearch}
                            className="p-3 bg-purple-500 text-white rounded-r-md hover:bg-purple-600 transition-all duration-300"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {loading && (
                    <div className="flex justify-center items-center my-6">
                        <div className="w-10 h-10 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
                    </div>
                )}

                <table className="min-w-full bg-white border rounded-lg shadow-lg text-gray-800">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left font-semibold">Name</th>
                            <th className="p-4 text-left font-semibold">Year Level</th>
                            <th className="p-4 text-left font-semibold">Time In</th>
                            <th className="p-4 text-left font-semibold">Time Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.filter(report => report.tribe === category).map((report) => (
                            <tr key={report.name} className="border-t hover:bg-purple-50 transition-colors duration-200">
                                <td className="p-4">{report.name}</td>
                                <td className="p-4">{report.yearLevel}</td>
                                <td className="p-4">{report.timeIn}</td>
                                <td className="p-4">{report.timeOut}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Right Side: Radar Chart */}
            <div className="flex-1 flex justify-center items-center">
                <Card className="w-full h-full">
                    <CardHeader className="items-center pb-4">
                        <CardTitle>{category} Attendance</CardTitle>
                        <CardDescription>
                            Showing attendance for the different year levels
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-0">
                        <div className="flex justify-center">
                            <RadarChart width={700} height={700} data={chartData}>
                                <PolarAngleAxis dataKey="month" tick={{ fontSize: 12 }} />
                                <PolarGrid />
                                <Tooltip formatter={(value) => `${value} students`} />
                                <Radar name="Attendance" dataKey="attendance" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            </RadarChart>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Showing attendance for {category}
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Academic Year Overview
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Reports;

"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import necessary charting library

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchReports(); // Fetch reports when the component loads
    }, []);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/reports', {
                params: {
                    date,
                    category
                }
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
        }
        setLoading(false);
    };

    const handleFilter = () => {
        fetchReports(); // Fetch reports based on the selected filters
    };

    const chartData = {
        labels: reports.map(report => report.name),
        datasets: [
            {
                label: 'Reports by Date',
                data: reports.map(report => new Date(report.date).getTime()),
                backgroundColor: 'rgba(76, 175, 80, 0.6)',
            },
        ],
    };

    return (
        <div
            style={{
                padding: '40px',
                fontFamily: '"Arial", sans-serif',
                backgroundColor: '#f4f4f4',
                minHeight: '100vh',
                color: '#333',
            }}
        >
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '2rem', color: '#2196f3', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Reports Dashboard</h1>
            </header>

            {/* Filter Bar */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', justifyContent: 'flex-start' }}>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        flex: '1',
                        backgroundColor: '#fff',
                        transition: '0.3s',
                    }}
                    onFocus={(e) => e.target.style.border = '1px solid #2196f3'}
                    onBlur={(e) => e.target.style.border = '1px solid #ccc'}
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        flex: '1',
                        backgroundColor: '#fff',
                        transition: '0.3s',
                    }}
                    onFocus={(e) => e.target.style.border = '1px solid #2196f3'}
                    onBlur={(e) => e.target.style.border = '1px solid #ccc'}
                >
                    <option value="">Select Category</option>
                    <option value="sales">Sales</option>
                    <option value="inventory">Inventory</option>
                    <option value="finance">Finance</option>
                    <option value="support">Support</option>
                </select>
                <button
                    onClick={handleFilter}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#2196f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        flex: 'none',
                        transition: '0.3s',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1976d2'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#2196f3'}
                >
                    Apply Filter
                </button>
            </div>

            {/* Loading Indicator */}
            {loading && <p style={{ color: '#2196f3', fontStyle: 'italic' }}>Loading reports...</p>}

            {/* Graphical Representation */}
            <div style={{ marginBottom: '30px', backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2 style={{ marginBottom: '10px', color: '#333' }}>Reports Overview</h2>
                <div style={{ height: '300px', width: '100%' }}>
                    <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: true }} height={300} />
                </div>
            </div>

            {/* Reports Table */}
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    backgroundColor: '#fff',
                    color: '#333',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                }}
            >
                <thead>
                    <tr>
                        <th style={{ padding: '12px', backgroundColor: '#2196f3', color: '#fff', textAlign: 'left', fontWeight: 'bold' }}>Report Name</th>
                        <th style={{ padding: '12px', backgroundColor: '#2196f3', color: '#fff', textAlign: 'left', fontWeight: 'bold' }}>Date</th>
                        <th style={{ padding: '12px', backgroundColor: '#2196f3', color: '#fff', textAlign: 'left', fontWeight: 'bold' }}>Category</th>
                        <th style={{ padding: '12px', backgroundColor: '#2196f3', color: '#fff', textAlign: 'left', fontWeight: 'bold' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length > 0 ? (
                        reports.map(report => (
                            <tr key={report.id}>
                                <td style={{ padding: '15px', borderBottom: '1px solid #ddd', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                                    {report.name}
                                </td>
                                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>{report.date}</td>
                                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>{report.category}</td>
                                <td style={{ padding: '15px', borderBottom: '1px solid #ddd' }}>
                                    <button
                                        style={{
                                            padding: '8px 15px',
                                            backgroundColor: '#4caf50',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            transition: '0.3s',
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#388e3c'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#4caf50'}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f1f1f1' }}>No reports found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                <button
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        backgroundColor: '#2196f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: '0.3s',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1976d2'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#2196f3'}
                >
                    Previous
                </button>
                <button
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#2196f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: '0.3s',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1976d2'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#2196f3'}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Reports;

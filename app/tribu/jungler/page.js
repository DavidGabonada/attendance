"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Update import for Next.js App Router

// Sample data
const sampleData = [
    { name: 'John Doe', yearLevel: 'First Year', timeIn: '08:00 AM', timeOut: '05:00 PM' },
    { name: 'Jane Smith', yearLevel: 'First Year', timeIn: '09:00 AM', timeOut: '06:00 PM' },
    { name: 'Alice Johnson', yearLevel: 'First Year', timeIn: '07:30 AM', timeOut: '04:30 PM' },
    // Add more sample data as needed
];

const JunglerList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterYearLevel, setFilterYearLevel] = useState('');
    const router = useRouter(); // Use the updated import

    // Filtering logic
    const filteredJunglers = sampleData
        .filter((jungler) =>
            jungler.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((jungler) =>
            filterYearLevel ? jungler.yearLevel === filterYearLevel : true
        );

    // Handle logo click
    const handleLogoClick = () => {
        router.back(); // Navigate back to the previous page
    };

    return (
        <div
            style={{
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                backgroundImage: 'url(/images/green.jpg)', // Set your background image here
                backgroundSize: 'cover', // Ensure the image covers the entire container
                backgroundPosition: 'center', // Center the background image
                backgroundAttachment: 'fixed', // Fix the background image during scroll
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Slightly stronger shadow for better effect
                color: '#fff', // Ensure text is readable on the background
                minHeight: '100vh', // Ensure the container covers the full viewport height
                position: 'relative', // To position the overlay
                overflow: 'hidden', // Prevent scrollbars from appearing
            }}
        >
            <div
                style={{
                    position: 'sticky', // Stick the header to the top
                    top: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly dark background for better readability
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.3)', // Light border for header
                    zIndex: 1000, // Ensure the header is above other elements
                }}
            >
                <img
                    src="/images/jungler.jpg"
                    alt="Logo"
                    style={{
                        width: '60px',
                        height: '60px',
                        marginRight: '15px',
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 255, 255, 0.6)', // Light border for logo
                        objectFit: 'cover', // Ensures the image covers the entire area
                    }}
                    onClick={handleLogoClick}
                />
                <h1
                    style={{
                        fontSize: '28px', // Larger title for better prominence
                        color: '#fff', // Adjust text color to be readable on the background
                    }}
                >
                    Jungler List
                </h1>
            </div>

            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '20px',
                }}
            >
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid rgba(255, 255, 255, 0.5)', // Light border for search input
                        width: '220px', // Slightly wider search input
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background for readability
                    }}
                />

                <select
                    value={filterYearLevel}
                    onChange={(e) => setFilterYearLevel(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid rgba(255, 255, 255, 0.5)', // Light border for select
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light background for readability
                        color: '#333', // Text color to make it readable
                        zIndex: 10, // Ensure it appears above other elements
                    }}
                >
                    <option value="">All Year Levels</option>
                    <option value="First Year">First Year</option>
                    {/* Add more year levels if needed */}
                </select>
            </div>

            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly more opaque background for the table
                    borderRadius: '5px',
                    overflow: 'hidden', // To ensure rounded corners work properly
                }}
            >
                <thead>
                    <tr>
                        <th
                            style={{
                                padding: '12px',
                                textAlign: 'left',
                                backgroundColor: '#333',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderBottom: '2px solid rgba(255, 255, 255, 0.3)', // Light border for header cells
                            }}
                        >
                            Name
                        </th>
                        <th
                            style={{
                                padding: '12px',
                                textAlign: 'left',
                                backgroundColor: '#333',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderBottom: '2px solid rgba(255, 255, 255, 0.3)', // Light border for header cells
                            }}
                        >
                            Year Level
                        </th>
                        <th
                            style={{
                                padding: '12px',
                                textAlign: 'left',
                                backgroundColor: '#333',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderBottom: '2px solid rgba(255, 255, 255, 0.3)', // Light border for header cells
                            }}
                        >
                            Time In
                        </th>
                        <th
                            style={{
                                padding: '12px',
                                textAlign: 'left',
                                backgroundColor: '#333',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderBottom: '2px solid rgba(255, 255, 255, 0.3)', // Light border for header cells
                            }}
                        >
                            Time Out
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredJunglers.map((item, index) => (
                        <tr
                            key={index}
                            style={{
                                backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)', // Slightly different background for alternating rows
                            }}
                        >
                            <td
                                style={{
                                    padding: '12px',
                                    textAlign: 'left',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)', // Light border for table cells
                                    color: '#333',
                                }}
                            >
                                {item.name}
                            </td>
                            <td
                                style={{
                                    padding: '12px',
                                    textAlign: 'left',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)', // Light border for table cells
                                    color: '#333',
                                }}
                            >
                                {item.yearLevel}
                            </td>
                            <td
                                style={{
                                    padding: '12px',
                                    textAlign: 'left',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)', // Light border for table cells
                                    color: '#333',
                                }}
                            >
                                {item.timeIn}
                            </td>
                            <td
                                style={{
                                    padding: '12px',
                                    textAlign: 'left',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)', // Light border for table cells
                                    color: '#333',
                                }}
                            >
                                {item.timeOut}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JunglerList;

"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaUserPlus, FaTimes, FaCheck } from 'react-icons/fa'; // Optional icons

export default function AttendanceDashboard() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentId, setNewStudentId] = useState('');
  const [newStudentYear, setNewStudentYear] = useState('');
  const [newStudentTribu, setNewStudentTribu] = useState('');
  const [tribus, setTribus] = useState([]);

  const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];
  const router = useRouter();

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost/tribu/tribu.php?action=get_students');
      if (Array.isArray(res.data)) {
        setStudents(res.data);
      } else {
        console.error('Fetched data is not an array:', res.data);
      }
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get('http://localhost/tribu/tribu.php?action=get_attendance');
      setAttendance(res.data);
    } catch (error) {
      console.error('Error fetching attendance', error);
    }
  };

  const fetchTribus = async () => {
    try {
      const res = await axios.get('http://localhost/tribu/tribu.php?action=get_tribus');
      if (Array.isArray(res.data)) {
        setTribus(res.data);
      } else {
        console.error('Fetched tribus data is not an array:', res.data);
      }
    } catch (error) {
      console.error('Error fetching tribus', error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
    fetchTribus();
  }, []);

  const handleMarkAttendance = async (studentId) => {
    try {
      await axios.post('http://localhost/tribu/tribu.php?action=mark_attendance', { studentId });
      fetchAttendance();
    } catch (error) {
      console.error('Error marking attendance', error);
    }
  };

  const handleAddStudent = async () => {
    try {
      await axios.post('http://localhost/tribu/tribu.php?action=add_student', {
        name: newStudentName,
        studentId: newStudentId,
        year: newStudentYear,
        tribu: newStudentTribu
      });
      fetchStudents();
      setNewStudentName('');
      setNewStudentId('');
      setNewStudentYear('');
      setNewStudentTribu('');
      setIsAddStudentModalOpen(false);
    } catch (error) {
      console.error('Error adding student', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleViewAttendance = () => {
    router.push('/attendance');
  };

  const handleViewReports = () => {
    router.push('/reports');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0 md:static`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold">Dashboard</h2>
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white focus:outline-none md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <a href="#" onClick={() => setIsAddStudentModalOpen(true)} className="flex items-center space-x-2 p-4 bg-green-600 hover:bg-green-700 rounded-lg">
                <FaUserPlus className="text-white" />
                <span>Add Student</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={handleViewAttendance} className="flex items-center space-x-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg">
                <span>Attendance</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={handleViewReports} className="flex items-center space-x-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg">
                <span>Attendance Reports</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className={`flex-1 p-8 bg-gray-50 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Attendance Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { image: '/images/fighter.jpg', title: 'Fighter', tribu: 'Fighter' },
            { image: '/images/jungler.jpg', title: 'Jungler', tribu: 'Jungler' },
            { image: '/images/assassin.jpg', title: 'Assassin', tribu: 'Assassin' },
            { image: '/images/mage.jpg', title: 'Mage', tribu: 'Mage' },
            { image: '/images/magic.jpg', title: 'Magic', tribu: 'Magic' },
            { image: '/images/marksman.jpg', title: 'Marksman', tribu: 'Marksman' },
            { image: '/images/support.jpg', title: 'Support', tribu: 'Support' },
            { image: '/images/tank.jpg', title: 'Tank', tribu: 'Tank' },
          ].map((card, index) => (
            <a
              key={index}
              href={`/components/${card.tribu.toLowerCase()}`}
              className="relative h-80 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </main>

      {/* Add Student Modal */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Add Student</h2>
              <button
                onClick={() => setIsAddStudentModalOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="studentName" className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                id="studentName"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter student name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="studentId" className="block text-gray-700 font-medium mb-2">Student ID</label>
              <input
                type="text"
                id="studentId"
                value={newStudentId}
                onChange={(e) => setNewStudentId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter student ID"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="studentYear" className="block text-gray-700 font-medium mb-2">Year</label>
              <select
                id="studentYear"
                value={newStudentYear}
                onChange={(e) => setNewStudentYear(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                <option value="" disabled>Select Year</option>
                {years.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="studentTribu" className="block text-gray-700 font-medium mb-2">Tribu</label>
              <select
                id="studentTribu"
                value={newStudentTribu}
                onChange={(e) => setNewStudentTribu(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                <option value="" disabled>Select Tribu</option>
                {tribus.map((tribu, index) => (
                  <option key={index} value={tribu}>{tribu}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsAddStudentModalOpen(false)}
                className="flex items-center bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                <FaTimes className="mr-2" />
                Cancel
              </button>
              <button
                onClick={handleAddStudent}
                className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                <FaCheck className="mr-2" />
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const JobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    useEffect(() => {
        // Fetch initial job data
        fetchJobs();
    }, []);

    useEffect(() => {
        // Fetch filtered jobs whenever searchTerm changes
        const delayDebounceFn = setTimeout(() => {
            fetchJobs(searchTerm);
        }, 300); // Adjust delay as needed

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const fetchJobs = async (query = '') => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8080/jobPosts?query=${query}`); // Include query parameter in API call
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (job) => {
        navigate('/edit-job', { state: { job } });
    };

    const handleDelete = async (jobId) => {
        // ... (your existing handleDelete logic)
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container">
            <h1 className="text-center my-4 text-2xl text-white">All Available Jobs</h1>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by keyword..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="job-cards-container">
                {/* ... (rest of your job cards rendering logic) */}
            </div>
        </div>
    );
};

export default JobListings;
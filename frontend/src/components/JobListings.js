import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const JobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null);  // Create a ref for the search input

    useEffect(() => {
        // Fetch initial job data on component mount
        fetchJobs();
    }, []);

    useEffect(() => {
        // Debounce search to avoid excessive API calls
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) {
                searchJobs(searchTerm);
            } else {
                fetchJobs(); // Fetch all jobs if search is cleared
            }
        }, 300); // Adjust delay as needed

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const fetchJobs = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/jobPosts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const searchJobs = async (query) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/jobPosts/${query}`);
            setJobs(response.data);
        } catch (error) {
            console.error('Error searching jobs:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (job) => {
        navigate('/edit-job', { state: { job } });
    };

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                const response = await fetch(`http://localhost:8080/jobPost/${jobId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    // Update the job list after successful deletion
                    fetchJobs();
                } else {
                    console.error('Error deleting job:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting job:', error);
            }
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Ensure the input remains focused during re-render
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [searchTerm]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1 className="text-center my-4 text-2xl text-white">All Available Jobs</h1>

            <div className="mb-4">
                <input
                    ref={inputRef}  // Attach the ref to the search input
                    type="text"
                    placeholder="Search by keyword..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="job-cards-container">
                {jobs.map(job => (
                    <div key={job.postId} className="job-card bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-xl font-bold mb-2 text-white">{job.postProfile}</h2>
                        <p className="text-gray-300 mb-4">{job.postDesc}</p>

                        <div className="flex justify-between items-center text-sm text-gray-400">
                            <div>
                                <span className="font-semibold">Experience:</span> {job.reqExperience} years
                            </div>
                            <div>
                                <span className="font-semibold">Tech Stack:</span> {job.techStack.join(', ')}
                            </div>
                        </div>

                        <div className="ubuttons flex justify-end mt-4">
                            <button
                                onClick={() => handleEdit(job)}
                                className="ubutton1 font-bold py-1 px-2 rounded mr-2 flex items-center"
                            >
                                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                            </button>
                            <button
                                onClick={() => handleDelete(job.postId)}
                                className="ubutton2 font-bold py-1 px-2 rounded flex items-center"
                            >
                                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobListings;

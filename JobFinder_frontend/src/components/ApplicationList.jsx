import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { getUserApplications, login } from '../api';
import { Link } from 'react-router-dom';

const ApplicationList = () => {
    const userId = localStorage.getItem("userProfile");
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            const data = await getUserApplications();
            setApplications(data);
            console.log(data);
            
        };
        fetchApplications();
    }, [userId]);

    return (

        <Card>
            <Card.Header>Your Applications</Card.Header>
            <ListGroup variant="flush">
                {applications.length > 0 ? (
                    applications.map((app) => (
                        <ListGroup.Item key={app._id}>
                            <h5>{app.job.title}</h5>
                            <p>Status: {app.status}</p>
                            <p>Applied on: {new Date(app.appliedDate).toLocaleDateString()}</p>
                            <Link to={`/jobs/${app.job._id}`}>
                                <Button variant="primary">View Details</Button>
                            </Link>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>No applications found.</ListGroup.Item>
                )}
            </ListGroup>
        </Card>
    );
};

export default ApplicationList;

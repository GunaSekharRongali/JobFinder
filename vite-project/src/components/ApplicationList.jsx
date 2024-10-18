import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { getUserApplications, login } from '../api';

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

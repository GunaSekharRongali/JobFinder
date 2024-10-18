import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { getAllJobs } from '../api';
import { Link } from 'react-router-dom';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const data = await getAllJobs();
            setJobs(data);
        };
        fetchJobs();
    }, []);

    return (
        <Row>
            {jobs.map((job) => (
                <Col key={job._id} md={4} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>{job.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                            <Card.Text>{job.description.slice(0, 100)}...</Card.Text>
                            {job.remote? (<Card.Text>Remote Job</Card.Text>) :""}
                            <Card.Text><strong>Location:</strong> {job.location}</Card.Text>
                            <Card.Text><strong>Job Type:</strong> {job.type}</Card.Text>
                            <Link to={`/jobs/${job._id}`}>
                                <Button variant="primary">View Details</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default JobList;

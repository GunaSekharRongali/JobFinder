import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, CardText } from 'react-bootstrap';
import { getJobById, applyToJob } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { addAppliedJob } from '../redux/actions'; 

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    const dispatch = useDispatch();
    const appliedJobs = useSelector(state => state.appliedJobs);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            const data = await getJobById(id);
            setJob(data);
        };
        fetchJob();
    }, [id]);

    const isJobApplied = appliedJobs.includes(id);

    const handleApply = async () => {
        try {
            // console.log(job);
            const data = await applyToJob(job._id);
            dispatch(addAppliedJob(data._id));
            console.log(isJobApplied);
            alert("Applied successfully");
            // navigate("./jobs");
        }catch (error) {
            console.log(error);
        }
    };

    if (!job) return <p>Loading...</p>;

    return (
        <Card>
            <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                {job.remote? (<Card.Text>Remote Job</Card.Text>) :""}
                <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                <Card.Text>{job.description}</Card.Text>
                <Card.Text>
                    <strong>Location:</strong> {job.location}
                </Card.Text>
                <Card.Text><strong>Job Type:</strong> {job.type}</Card.Text>
                <Card.Text><strong>Salary:</strong> {job.salary}</Card.Text>
                <Card.Text><strong>Posted on:</strong> {new Date(job.postedDate).toLocaleDateString()}</Card.Text>
                <CardText>
                    <strong>Required Skills:</strong>
                    {
                    job.skills.map((skill) => (
                        <p key={skill}>{skill}</p>
                    ))
                }
                </CardText>
                <Button variant="success" 
                    onClick={handleApply} 
                    disabled={isJobApplied}>
                    {isJobApplied ? 'Applied' : 'Apply Now'}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default JobDetails;

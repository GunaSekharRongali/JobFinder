import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, CardText, Toast } from 'react-bootstrap';
import { getJobById, applyToJob, getUserApplications } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { addAppliedJob } from '../redux/actions'; 

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [isJobApplied, setIsJobApllied] = useState(false);
    const [applications, setApplications] = useState([]);

    const dispatch = useDispatch();
    const appliedJobs = useSelector(state => state.job.appliedJobs);
    console.log(appliedJobs);

    function name() {
            if (appliedJobs) {
                applications.map((item)=>{
                    if (item.job._id === job._id) {
                        setIsJobApllied(true)
                    }
                })
                console.log(isJobApplied);
                
            }
        }

    useEffect(()=>{
        name()
    })

    useEffect(() => {
        const fetchJob = async () => {
            const data = await getJobById(id);
            setJob(data);
        };
        fetchJob();

        const fetchApplications = async () => {
            const data = await getUserApplications();
            setApplications(data);
            console.log(data);
            
        };
        fetchApplications();

        name()
    }, [id]);
    
    
    const handleApply = async () => {
        try {
            // console.log(job);
            const data = await applyToJob(job._id);
            dispatch(addAppliedJob(job._id));
            setIsJobApllied(true);
            setShowToast(true);
        }catch (error) {
            console.log(error);
        }
    };

    if (!job) return <p>Loading...</p>;

    return (
        <>
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
                    <ul>{
                    job.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                    ))
                    
                }
                </ul>
                </CardText>
                <Button variant="success" 
                    onClick={handleApply}
                    disabled={isJobApplied}>
                    {isJobApplied ? 'Applied' : 'Apply Now'}
                </Button>
            </Card.Body>
        </Card>
        <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            style={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                }}
                >
            <Toast.Header>
                <strong className="me-auto">Job Application</strong>
            </Toast.Header>
            <Toast.Body>Successfully applied to the job!</Toast.Body>
        </Toast>
       

        </>
    );
};

export default JobDetails;

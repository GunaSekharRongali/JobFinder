// import React, { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { getUserProfile, updateUserProfile } from '../api';

// const UserProfile = () => {
//     const userId = 'USER_ID'; // Replace with actual user ID
//     const [profile, setProfile] = useState({
//         username: '',
//         email: '',
//         preferences: {
//             location: '',
//             jobType: '',
//             industry: '',
//             experienceLevel: ''
//         }
//     });

//     useEffect(() => {
//         const fetchProfile = async () => {
//             const data = await getUserProfile(userId);
//             setProfile(data);
//         };
//         fetchProfile();
//     }, [userId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProfile({ ...profile, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await updateUserProfile(userId, profile);
//         alert('Profile updated successfully!');
//     };

//     return (
//         <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formUsername">
//                 <Form.Label>Username</Form.Label>
//                 <Form.Control
//                     type="text"
//                     name="username"
//                     value={profile.username}
//                     onChange={handleChange}
//                 />
//             </Form.Group>
//             <Form.Group controlId="formEmail">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                     type="email"
//                     name="email"
//                     value={profile.email}
//                     onChange={handleChange}
//                 />
//             </Form.Group>
//             <h4>Preferences</h4>
//             <Form.Group controlId="formLocation">
//                 <Form.Label>Location</Form.Label>
//                 <Form.Control
//                     type="text"
//                     name="preferences.location"
//                     value={profile.preferences.location}
//                     onChange={handleChange}
//                 />
//             </Form.Group>
//             <Form.Group controlId="formJobType">
//                 <Form.Label>Job Type</Form.Label>
//                 <Form.Control
//                     type="text"
//                     name="preferences.jobType"
//                     value={profile.preferences.jobType}
//                     onChange={handleChange}
//                 />
//             </Form.Group>
//             <Button variant="primary" type="submit" className="mt-3">
//                 Update Profile
//             </Button>
//         </Form>
//     );
// };

// export default UserProfile;



import React, { useEffect, useState} from 'react';
import { Form, Button, Badge, Container, Row, Col, Card } from 'react-bootstrap';
import { createUserProfile, getUserProfile, updateUserProfile } from '../api';  // Assuming API functions are defined
import { useNavigate } from 'react-router-dom';

const CreateUserProfile = () => {  // Replace with actual user ID
    const navigate = useNavigate();
    const item = localStorage.getItem("userProfile");
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        education: '',
        skills: [],
        languages: [],
        experience: [],
        certifications: [],
        location: '',
        preferedJobType: ''
    });

    const [profileUpdate, setProfileUpdate] = useState(false);

    const getData = async()=>{
        try{
            const data = await getUserProfile();
            console.log(data);
            
            setProfile(data);
            setProfileUpdate(true);
            localStorage.setItem("userProfile", JSON.stringify(data._id));
        }catch(error){
            console.log(error);
        }
    }


    useEffect(()=>{
        getData();
    },[])


    const [newSkill, setNewSkill] = useState('');
    const [newCertification, setNewCertification] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    const [newExperience, setNewExperience] = useState('');


    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    // Handle adding new skills
    const handleAddSkill = () => {
        if (newSkill) {
            setProfile((prevProfile) => ({
                ...prevProfile,
                skills: [...prevProfile.skills, newSkill]
            }));
            setNewSkill('');  // Clear input field
        }
    };

    // Handle adding new certifications
    const handleAddCertification = () => {
        if (newCertification) {
            setProfile((prevProfile) => ({
                ...prevProfile,
                certifications: [...prevProfile.certifications, newCertification]
            }));
            setNewCertification('');  // Clear input field
        }
    };

    // Handle adding new languages
    const handleAddLanguage = () => {
        if (newLanguage) {
            setProfile((prevProfile) => ({
                ...prevProfile,
                languages: [...prevProfile.languages, newLanguage]
            }));
            setNewLanguage('');  // Clear input field
        }
    };

    // Handle adding new experience
    const handleAddExperience = () => {
        if (newExperience) {
            setProfile((prevProfile) => ({
                ...prevProfile,
                experience: [...prevProfile.experience, newExperience]
            }));
            setNewExperience('');  // Clear input field
        }
    };

    const handleSkills = (index) => {
        const skills = profile.skills.filter((_, i)=>{
            return index !== i
        })

        setProfile((prevProfile) => ({
            ...prevProfile,
            skills: [...skills]
        }));
    }

    const handleLanguages = (index) => {
        const languages = profile.languages.filter((_, i)=>{
            return index !== i
        })
        
        setProfile((prevProfile) => ({
            ...prevProfile,
            languages: [...languages]
        }));
    }

    const handleExperience = (index) => {
        const experience = profile.experience.filter((_, i)=>{
            return index !== i
        })
        
        setProfile((prevProfile) => ({
            ...prevProfile,
            experience: [...experience]
        }));
    }

    const handleCertification = (index) => {
        const certifications = profile.certifications.filter((_, i)=>{
            return index !== i
        })
        
        setProfile((prevProfile) => ({
            ...prevProfile,
            certifications: [...certifications]
        }));
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(profile);
        try{
            if (!profileUpdate) {
                const data = await createUserProfile(profile);
                alert('Profile created successfully!');
                if(data){
                    navigate('/Jobs')
                }
            }
            else{
                const data = await updateUserProfile(profile);
                console.log(profile);
                
                setProfile(data);
                alert('Profile updated successfully!');
            }

        }catch(error){
            console.log(error);
        }
    };

    return (
        <Container>
            {profile ? <Form onSubmit={handleSubmit}>
                <Row>
                    {/* Username */}
                    <Col xs={12} md={8}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Username</Card.Title>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={profile.username}
                                        onChange={handleChange}
                                        placeholder="Enter your username"
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Email */}
                    <Col xs={12} md={8}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Email</Card.Title>
                                <Form.Group>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Education */}
                    <Col xs={12} md={8}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Education</Card.Title>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        name="education"
                                        value={profile.education}
                                        onChange={handleChange}
                                        placeholder="Enter your education details"
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Experience */}
                    <Col xs={12} md={8}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Experience</Card.Title>
                                <div>
                                    {
                                        profile.experience.map((experience, index) => (
                                            <Badge key={index} bg="light" text="dark" className="me-2">
                                                {experience}
                                                <Button variant="danger" className='ms-2 rounded-sm' onClick={()=>handleExperience(index)}>x</Button>
                                            </Badge>
                                        ))
                                    }
                                </div>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        name="experience"
                                        value={newExperience}
                                        onChange={(e) => setNewExperience(e.target.value)}
                                        placeholder="Enter your experience details"
                                        className="mt-2"
                                    />
                                </Form.Group>
                                <Button onClick={handleAddExperience} variant="primary" className="mt-2">
                                    Add Experiance
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Location */}
                    <Col xs={12} md={8}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Location</Card.Title>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        value={profile.location}
                                        onChange={handleChange}
                                        placeholder="Enter your location"
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Preferred Job Type */}
                    <Col xs={12} md={8}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Preferred Job Type</Card.Title>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        name="preferedJobType"
                                        value={profile.preferedJobType}
                                        onChange={handleChange}
                                        placeholder="Enter your preferred job type"
                                    />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Skills */}
                    <Col xs={12} md={8}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Skills</Card.Title>
                                <div>
                                    {profile.skills.map((skill, index) => (
                                        <Badge key={index} onClick={()=>handleSkills(index)} pill bg="light" text="dark" className="me-2">
                                            {skill}
                                            <Button variant="danger" className='ms-2 rounded-sm' onClick={()=>handleSkills(index)}>x</Button>
                                        </Badge>
                                    ))}
                                </div>
                                <Form.Control
                                    type="text"
                                    placeholder="Add new skill"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    className="mt-2"
                                />
                                <Button onClick={handleAddSkill} variant="primary" className="mt-2">
                                    Add Skill
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Certifications */}
                    <Col xs={12} md={8}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Certifications</Card.Title>
                                <div>
                                    {profile.certifications.map((certification, index) => (
                                        <Badge key={index} pill bg="light" text="dark" className="me-2">
                                            {certification}
                                            <Button variant="danger" className='ms-2 rounded-sm' onClick={()=>handleCertification(index)}>x</Button>
                                        </Badge>
                                    ))}
                                </div>
                                <Form.Control
                                    type="text"
                                    placeholder="Add new certification"
                                    value={newCertification}
                                    onChange={(e) => setNewCertification(e.target.value)}
                                    className="mt-2"
                                />
                                <Button onClick={handleAddCertification} variant="primary" className="mt-2">
                                    Add Certification
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Languages */}
                    <Col xs={12} md={8}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Languages Known</Card.Title>
                                <div>
                                    {profile.languages.map((language, index) => (
                                        <Badge key={index} pill bg="light" text="dark" className="me-2">
                                            {language}
                                            {/* <button className='m-2 border-none' onClick={()=>handleLanguages(index)}>X</button> */}
                                            <Button variant="danger" className='ms-2 rounded-sm' onClick={()=>handleLanguages(index)}>x</Button>
                                        </Badge>
                                    ))}
                                </div>
                                <Form.Control
                                    type="text"
                                    placeholder="Add new language"
                                    value={newLanguage}
                                    onChange={(e) => setNewLanguage(e.target.value)}
                                    className="mt-2"
                                />
                                <Button onClick={handleAddLanguage} variant="primary" className="mt-2">
                                    Add Language
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Submit */}
                    <Col xs={12} md={8}>
                        <Button variant="primary" type="submit" className="mt-3">
                            {profileUpdate?"Update Profile":"Create Profile"}
                        </Button>
                    </Col>
                </Row>
            </Form>: <p>loading...</p>}
        </Container>
    );
};

export default CreateUserProfile;

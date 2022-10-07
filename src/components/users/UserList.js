import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { Paper, Box, Button, Modal } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


import MUITable from '../common/Table';

import { setUserDetails } from '../../slices/user/UserSlice';


const UsersList = () => {

    const dispatch = useDispatch();
    const [openModal, setModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [error, setError] = useState({
        firstName: false,
        lastName: false,
        email: false
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '4px',
        p: 4,
    };

    useEffect(() => {
        fetchUserDetails();
    }, [])

    const fetchUserDetails = async () => {
        await axios.get('https://reqres.in/api/users')
            .then(({ data }) => {
                setUserDetailsData(data);
            });
    }

    const setUserDetailsData = (data) => {
        dispatch(setUserDetails(data));
    }

    const handleAddUser = () => {
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let data = userInfo;

        if (userInfo.firstName === "") {
            let updatedError = { firstName: true };
            setError(error => ({
                ...error,
                ...updatedError
            }));
            console.log(error)
            return false;
        } else if (userInfo.lastName === "") {
            let updatedError = { lastName: true };
            setError(error => ({
                ...error,
                ...updatedError
            }));
            return false;
        } else if (userInfo.email === "") {
            let updatedError = { email: true };
            setError(error => ({
                ...error,
                ...updatedError
            }));
            return false;
        }
        else {
            await axios.post('https://reqres.in/api/users', data)
                .then(({ data }) => {
                    fetchUserDetails();
                    setModalOpen(false);
                    alert("User added successfully!");
                    let userInfo = {
                        firstName: '',
                        lastName: '',
                        email: ''
                    }
                    setUserInfo(userInfo);
                })
                .catch(error => {
                    alert("Error in fetching results!!");
                    console.log(error)
                })
        }
    }

    const handleUserInfoChange = (event, name) => {
        let updatedVal = { [name]: event.target.value };
        setUserInfo(userInfo => ({
            ...userInfo,
            ...updatedVal
        }))
    }

    return (
        <Paper sx={{ height: '100vh', width: '100vw', backgroundColor: 'primary.main' }}>
            <Box sx={{ textAlign: 'center', margin: '2rem', fontSize: '1.5rem' }}>
                User details
                <MUITable />
                <Button sx={{ margin: 'auto', display: 'block', marginTop: '1rem', backgroundColor: 'kriti.kritiBgColor' }} variant='contained' onClick={() => handleAddUser()}>Add User</Button>
            </Box>

            <Modal
                open={openModal}
                onClose={() => handleModalClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Fill user details
                    </Typography>
                    <form style={{ display: 'flex', flexDirection: 'column', margin: '1rem' }} onSubmit={(e) => handleFormSubmit(e)}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', margin: '0.5rem 0' }}>
                            <TextField sx={{ marginBottom: '0.5rem' }} id="outlined-basic" name={"first_name"} label="First name" variant="outlined" type="text" value={userInfo.firstName} onChange={(event) => handleUserInfoChange(event, 'firstName')} error={error.firstName} helperText={error.firstName ? "Required" : ""} />
                            <TextField id="outlined-basic" name={"last_name"} label="Last name" variant="outlined" type="text" value={userInfo.lastName} onChange={(event) => handleUserInfoChange(event, 'lastName')} error={error.lastName} helperText={error.lastName ? "Required" : ""} />
                        </Box>
                        <TextField sx={{ margin: '0.5rem 0' }} id="outlined-basic" name={"email"} label="Email" variant="outlined" type="email" value={userInfo.email} onChange={(event) => handleUserInfoChange(event, 'email')} error={error.email} helperText={error.email ? "Required" : ""} />
                        <Button sx={{ backgroundColor: 'secondary' }} type="submit" variant='outlined'>Submit</Button>
                        <Button sx={{ backgroundColor: 'secondary' }} type="cancel" variant='outlined' onClick={() => setModalOpen(false)}>Discard</Button>
                    </form>
                </Box>
            </Modal>
        </Paper>
    )
}

export default UsersList;
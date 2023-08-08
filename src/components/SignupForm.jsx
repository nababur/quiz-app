import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import Checkbox from './Checkbox';
import Form from './Form';
import TextInput from './TextInput';


export default function SignupForm() {

    const [username, setUsername] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [confirPassword, setConfirmPass] = useState(""); 
    const [agree, setAgree] = useState(""); 


    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const navigate = useNavigate();

    const {signup} = useAuth();

    async function handleSubmit(e){
        e.preventDefault();

      

        // Do Validation 
        if (username == '' ) {
            toast.error('Username field must not be Empty!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }else if( email == ''){
            toast.error('Email field must not be Empty!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        
        }else if(password == ''){
            toast.error('Password field must not be Empty!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }else if(confirPassword == ''){
            toast.error('Confirm password field must not be Empty!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }else if(password !== confirPassword){
            toast.error('Passwords did not Matched!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }else{

            try {
                setError("");
                setLoading(true);
    
                await signup(email, password, username);
    
                navigate("/");
                toast.success('SignUp Successfully, you are logged in!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
    
    
            } catch (error) {
                // console.log(error);
                setLoading(false);
                toast.error('Failed to create an Account.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }

        }




    }



  return (
    <Form style={{ height:"500px" }} onSubmit={handleSubmit}>

        <TextInput 
        type="text" 
        placeholder="Enter name" 
        
        icon="person" value={username} onChange={(e)=> setUsername(e.target.value)} />

        <TextInput 
        type="text" 
        
        placeholder="Enter email" 
        icon="alternate_email" value={email} onChange={(e)=> setEmail(e.target.value)}/>


        <TextInput 
        type="password" 
        
        placeholder="Enter password" 
        icon="lock"value={password} onChange={(e)=> setPassword(e.target.value)}/>


        <TextInput 
        type="password" 
        
        placeholder="Confirm password" 
        icon="lock_clock"value={confirPassword} onChange={(e)=> setConfirmPass(e.target.value)}/>

        <Checkbox text=" I agree to the Terms &amp; Conditions" value={agree} onChange={(e)=> setAgree(e.target.value)}/>

        <Button disabled={loading} type="submit"><span>Submit now</span></Button>

        {error && <p className='error'>{error}</p>}
        
        
        
        <div className="info">
            Already have an account?  <Link to="/login">Login</Link> instead.
        </div>


    </Form>
  )
}

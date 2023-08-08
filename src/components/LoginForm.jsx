import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from "../contexts/AuthContext"
import Button from './Button'
import Form from './Form'
import TextInput from './TextInput'



export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState();
    const [loading, setLoading]= useState();


    const {login} = useAuth();
    const navigate = useNavigate();


    async function handleLogin(e){
        e.preventDefault();


        // Do Validation 
         if( email == ''){
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
        
        }else{


            try {
                setError("");
                setLoading(true);
                await login(email, password);
    
                navigate("/");
                toast.success('Logged in Successfully!', {
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
                toast.error('Maybe access did not Mached!', {
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
    <Form  style={{ height:"330px" }} onSubmit={handleLogin}>
                
        <TextInput 
        tyep="email" 
        placeholder="Enter email" 
        icon="alternate_email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        
        <TextInput 
        type="password" 
        placeholder="Enter password" 
        icon="lock" value={password} onChange={(e)=> setPassword(e.target.value)}/>

        <Button type="submit" disabled={loading}><span>Login Now</span></Button>
        {error && <p className="error">{error}</p>}
        <div className="info">Don't have an account? <a href="/signup">Signup</a> instead.</div>

    </Form>
  )
}

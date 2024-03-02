import React, {useState} from 'react'
import Logo from '../../components/logo'
import { Link } from "react-router-dom";
import axios from 'axios'
import {Redirect} from 'react-router-dom'

function Signup() {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSignup = async()=>{
        console.log("Signing up...\n")
        console.log('Name: ', name, "\nEmail: ", email, "\nPassword: ", password)

        await axios.post('http://localhost:5000/signup', {
            name:name,
            email:email,
            password:password
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => {
              
              console.log(response.data)
              if(response.data.success){
                window.location.replace('./login')
              }
            })
            .catch(error => {
              console.error('Error signing in', error);
        })

    }

  return (
    <div className='login'>
        <div className='login-header'>
            <Logo />
            <h2 className='page-title'>Sign Up</h2>
        </div>

        <div className='login-content'>

            <input type="text"  className='login-input' placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
            <input type="email" className='login-input' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" className='login-input' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
            <button className='login-btn' onClick={()=> handleSignup()}>Signup</button>
            <div className='auth-link'>Already have an account? <Link to="/login" className="link-styles">Login</Link></div>
        </div>
        
    </div>
  )
}

export default Signup
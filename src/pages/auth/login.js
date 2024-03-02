import React, {useState} from 'react'
import Logo from '../../components/logo'
import { Link } from "react-router-dom";
import axios from 'axios'

function Login() {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async() =>{
        console.log("Logging in...\n")
        console.log("Email: ", email, "\nPassword: ", password);

        await axios.post('http://localhost:5000/login', {
            email:email,
            password:password
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => {
                console.log(response.data)
                if (response.data.user){
                    localStorage.setItem('user', JSON.stringify({ user: response.data.user}));
                    window.location.replace('./profile')
                }

            })
            .catch(error => {
              console.error('Error logging in', error);
        })


    }




  return (
    <div className='login'>
        <div className='login-header'>
            <Logo />
            <h2 className='page-title'>Log In</h2>
        </div>

        <div className='login-content'>
            <input type="email" className='login-input' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email}/><br/>
            <input type="password" className='login-input' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
            <button className='login-btn' onClick={()=>handleLogin()} >Login</button>
            <div className='auth-link'>Don't have an account? <Link to="/signup" className="link-styles">Signup</Link></div>
        </div>
        
    </div>
  )
}

export default Login
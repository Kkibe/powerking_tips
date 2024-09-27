import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import Bg from '../assets/bg.mp4';
import AppHelmet from '../components/AppHelmet';
import {registerUser } from '../firebase';

const Register = () => {
    const { currentUser} = useContext(AuthContext);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        registerUser(username, email, password, setSuccess, setError);
        return;
    }

    useEffect(() => {
      currentUser && window.history.back()
      error && setTimeout(() => {
        setError(null);
      }, 3000);

      success && setTimeout(() => {
        setSuccess(null);
        setEmail('');
      }, 3000);
    }, [error,success, currentUser]);
      
    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });

    return (
        <div className='register'>
            <video className='video' autoPlay loop muted>
                <source src={Bg} type='video/mp4' />
            </video>
            <AppHelmet title={"Login Powerking Tips"} />
            <form action="">
                <h2>SIGN UP Free!</h2>
                <input type="email" onChange={e => setEmail(e.target.value)} placeholder='Email' required/>
                <input type="text" onChange={e => setUsername(e.target.value)} placeholder='username' required/>
                <input type="password" onChange={e => setPassword(e.target.value)} name="" id="" placeholder='password' required/>
                <button type="submit"  onClick={handleRegister} title="register" className='btn'>REGISTER</button>
                {
                    error && <span className="error text-danger">{error}</span>
                }
            </form>
        </div>
    );
}

export default Register; 
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { signInUser } from '../firebase';
import { AuthContext } from '../AuthContext';
import Bg from '../assets/bg.mp4';
import AppHelmet from '../components/AppHelmet';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        signInUser(email, password, setError);
    }
    
    useEffect(() => {
      currentUser && window.history.back()
      error && setTimeout(() => {
        setError(null);
      }, 3000);
    }, [error, currentUser]);
      
    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });
    return (
        <div className='login'>
            <AppHelmet title={"Login | Powerking Tips"}/>
            <video className='video' autoPlay loop muted>
                <source src={Bg} type='video/mp4' />
            </video>
            <form onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter email' required/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' required/>
                <button type="submit" title="login" className='btn'>LOGIN</button>
                {
                    error && <h4 className='error'>{error}Try again</h4>
                }
            </form>
        </div>
    );
};
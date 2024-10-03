import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { signInUser } from '../firebase';
import { AuthContext } from '../AuthContext';
import AppHelmet from '../components/AppHelmet';
import { NavLink } from 'react-router-dom'

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
            <form onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter email' required/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' required/>
                <div className="checkbox-holder">
                    <input type="checkbox" id="checkbox" />
                    <label htmlFor="checkbox">Keep me Sign in</label>
                </div>
                <button type="submit" title="login" className='btn'>LOGIN</button>
                {
                    error && <h4 className='error'>{error}Try again</h4>
                }
                
                <div className="text">Dont't have an account ?&emsp;|&emsp;<NavLink to='/register'>Sign Up !</NavLink>  </div>
            </form>
        </div>
    );
};
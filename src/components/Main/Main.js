import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';


import axios from 'axios';
import './Main.scss';


function Main() {
    const [showError, setShowError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const history = useHistory();


    let SignIn = () => {

        axios.post('api/auth/signIn', { email: email, password: password }).then(res => {
            console.log(res.data);

            dispatch({
                type: 'LOGIN',
                auth: true,
                token: 'Bearer ' + res.data.token,
                userType: res.data.type,
                firstName: res.data.firstName,
                lastName: res.data.lastName
            });
            history.push(res.data.type);
        }).catch((err, response) => {
            setShowError(err.response.data.message);
            setTimeout(() => {
                setShowError('');
            }, 3000);
        })
    }
    return (
        <div className='container'>
            <div className='Main'>
                <input type='email'
                       onChange={e => setEmail(e.target.value)}
                       value={email}
                       placeholder='Email'
                       className='input' />
                <input type='password'
                       onChange={e => setPassword(e.target.value)}
                       value={password}
                       placeholder='Password'
                       className='input' />
                <span className='forgot'>Forgot Password?</span>
                <input type='button'
                       onClick={e => SignIn()}
                       value='Sign In'
                       className='btn' />
                <span className='error'>{showError}</span>
                {/* <div className='container--send'>
        <input type='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder='Email'
            className='input' />
        <input type='button' className='btn' value='Send' />
    </div>

    <div className='container--code_input'>
        <input type='text' maxLength={1} className='code_input' />
        <input type='text' maxLength={1} className='code_input' />
        <input type='text' maxLength={1} className='code_input' />
        <input type='text' maxLength={1} className='code_input' />
        <input type='text' maxLength={1} className='code_input' />
        <input type='text' maxLength={1} className='code_input' />
        <input type='button' className='btn' value='Confirm' />

    </div> */}

            </div>
        </div >


    )
}



export default connect()(Main);
import React from 'react'

export default function AuthForm(props) {

    const {
        btnText,
        handleChange,
        inputs,
        handleSubmit
    } = props

    return (
        <form className='auth--authForm' onSubmit={handleSubmit}>
            <h3>User Name</h3>
            <input 
                type="text"
                placeholder='Username'
                name='username'     
                value={inputs.username}
                onChange={handleChange}
            />
            <h3>Password</h3>
            <input 
                type="text"
                placeholder='Password'
                name='password'     
                value={inputs.password}
                onChange={handleChange}
            />
            <br />
            <button>{btnText}</button>
        </form>
    )
}
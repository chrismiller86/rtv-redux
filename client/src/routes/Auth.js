import React, { useState } from 'react'
import AuthForm from '../components/AuthForm'
import { UserContext } from '../context/UserProvider'

const initInputs = {username: "", password: ""}

export default function Auth() {
    const [inputs, setInputs] = useState(initInputs)
    const [alreadyMemberToggle, setAlreadyMemberToggle] = React.useState(false)

    const { signup, login, errMsg, setUserState } = React.useContext(UserContext)

    function handleChange(e) {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e) {
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e) {
        e.preventDefault()
        login(inputs)
    }
    
    function handleToggleAlreadyMember(){
        setAlreadyMemberToggle(prev => !prev)
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))

    }


    return (
        <div className='auth'>
            {!alreadyMemberToggle ? 
                <>
                    <AuthForm 
                        handleChange={handleChange}
                        btnText="Sign Up" 
                        inputs={inputs}
                        handleSubmit={handleSignup}
                    />
                    <div className='auth--errAndToggle'>
                        <button onClick={handleToggleAlreadyMember}>Already a member?</button>
                        <p>{errMsg}</p>
                    </div>
                </>
                :
                <>
                    <AuthForm 
                        handleChange={handleChange}
                        btnText="Log in" 
                        inputs={inputs}
                        handleSubmit={handleLogin}

                    />
                    <div className='auth--errAndToggle'>
                        <button onClick={handleToggleAlreadyMember}>Not yet a member?</button>
                        <p>{errMsg}</p>
                    </div>
                </>
            }
            
        </div>
    )
}

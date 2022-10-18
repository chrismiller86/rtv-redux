import React from "react";
import { Link, useNavigate } from 'react-router-dom'


export default function Navbar(props) {

    const { user, logout } = props
    let navigate = useNavigate();
    function logoutReturnToAuth() {
      navigate('/')
      logout()
    }


    function capitalizeName(string) {
        return string[0].toUpperCase() + string.substring(1)
    }

    const linkStyle = {
        textDecoration: "none",
        fontSize: "20px",
        color: "black"
    }

    return (
        <nav>
            <Link to="/" style={linkStyle}>Home</Link>
                <> |{" "}<Link to="/issues" style={linkStyle} >Issues</Link> |{" "} </>
                <><Link to="/profile" style={linkStyle} >Profile</Link> |{" "} </>
                <>
                    <span>Welcome {capitalizeName(user.username)}</span><button onClick={logoutReturnToAuth}>Log Out</button>
                </>

        </nav>
    )
}
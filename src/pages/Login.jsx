import { useState } from "react"
import { useLocation } from "react-router-dom"
import { loginUser } from "../api"

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)
    
    const location = useLocation()  

    function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")
        loginUser(loginFormData)
            .then(data => {
                setError(null)
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setStatus("idle")
            })
    }
    
    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            {location.state && <p>{location.state.message}</p>}
            <h1>Sign in to your account</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button>Log in</button>
            </form>
        </div>
    )
}
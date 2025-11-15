import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { loginUser } from "../api"

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })
    const [status, setStatus] = useState("idle")
    const [error, setError] = useState(null)

    const location = useLocation() 
    const navigate = useNavigate() 

    const isLoggedIn = localStorage.getItem("loggedin")
    const auth = getAuth();

    function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")
        signInWithEmailAndPassword(auth, loginFormData.email, loginFormData.password)
            .then(userCredential => {
                const user = userCredential.user
                setError(null)
                localStorage.setItem("loggedin", true)
                localStorage.setItem("uid", user.uid)
                navigate(location.state?.from || "/host", { replace: true })
            })
            .catch(err => {
                const errorCode = err.code
                const errorMessage = err.message
                setError(err)
            })
            .finally(() => {
                setStatus("idle")
            })
    }

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     setStatus("submitting")
    //     loginUser(loginFormData)
    //         .then(data => {
    //             setError(null)
    //             localStorage.setItem("loggedin", true)
    //             navigate(location.state?.from || "/host", { replace: true })
    //         })
    //         .catch(err => {
    //             setError(err)
    //         })
    //         .finally(() => {
    //             setStatus("idle")
    //         })
    // }
    
    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function logout() {
        localStorage.removeItem("loggedin")
        localStorage.removeItem("uid")
        navigate("/login", { replace: true })
    }

    return (
        <div className="login-container">
            {
                isLoggedIn ? (
                    <>
                        <h1>Welcome back</h1>
                        <button className="logout-button" onClick={logout}>Log Out</button>
                    </>
                ) : (
                    <>
                        {location?.state && <p className="login-error">{location.state?.message}</p>}
                        <h1>Sign in to your account</h1>
                        {error?.message && <p className="login-error">{error}</p>}

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
                            <button
                                disabled = {status === "submiting"}
                            >
                            {status === "submitting" ? "Logging in..." : "Log in"}
                            </button>
                        </form>
                    </>
                )
            }
            
        </div>
    )
}
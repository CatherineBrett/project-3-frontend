import { SyntheticEvent, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


export default function Signup() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
        bio: ""
    })

    const [errorData, setErrorData] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
        bio: ""
    })

    function handleChange(e: any) {
        const fieldName = e.target.name
        const newFormData = structuredClone(formData)
        newFormData[fieldName as keyof typeof formData] = e.target.value
        setFormData(newFormData)
    }

    async function handleSubmit(e: SyntheticEvent) {
        try {
            e.preventDefault()
            const resp = await axios.post('/api/signup', formData)
            console.log(resp.data)

            navigate('/login')
        } catch (e: any) {
            setErrorData(e.response.data.errors)
        }

    }


    return <div>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <div className="control">
                        <input

                            type="text"
                            name={'username'}
                            onChange={handleChange}
                            value={formData.username}
                        />
                        {errorData.username && <small>{errorData.username}</small>}
                    </div>
                </div>
                <div>
                    <label>Email</label>
                    <div>
                        <input

                            type="text"
                            name={'email'}
                            onChange={handleChange}
                            value={formData.email}
                        />
                        {errorData.email && <small>{errorData.email}</small>}
                    </div>
                </div>
                <div>
                    <label>Password</label>
                    <div>
                        <input

                            type="password"
                            name={'password'}
                            onChange={handleChange}
                            value={formData.password}
                        />
                        {errorData.password && <small>{errorData.password}</small>}
                    </div>
                </div>
                <div>
                    <label>Confirm password</label>
                    <div>
                        <input

                            type="password"
                            name={'passwordConfirmation'}
                            onChange={handleChange}
                            value={formData.passwordConfirmation}
                        />
                        {errorData.passwordConfirmation && <small>{errorData.passwordConfirmation}</small>}
                    </div>
                </div>
                <button>Submit</button>
            </form>
        </div>
    </div>
}
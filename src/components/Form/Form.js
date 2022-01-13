import React, { useState } from "react";
import './Form.css'

function Form ( timer ) {

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: ""

    })
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);

    const FirstNameInputChange = (event) => {
        setValues({...values, firstName: event.target.value})
    }
    const LastNameInputChange = (event) => {
        setValues({...values, lastName: event.target.value})
    }
    const EmailInputChange = (event) => {
        setValues({...values, email: event.target.value})
    }
    
    const hendleSubmit =(event) => {
        event.preventDefault();
        if(values.firstName && values.lastName && values.email){
            setValid(true);
        }
        setSubmitted(true);
        localStorage.setItem(values.firstName, timer);
        console.log(timer);
    }

    return (
        <div className="form-container">
            <form className="register-form" onSubmit={hendleSubmit}>
                {submitted && valid ? <div className="success-message">Success! Lets see what u can
                    </div> : null}
                <input 
                    onChange={FirstNameInputChange}
                    value={values.firstName}
                    className="form-field"
                    placeholder="First Name"
                    name="firstName" />
                    {submitted && !values.firstName ? <span>Please enter a first name</span> : null}
                <input 
                    onChange={LastNameInputChange}
                    value={values.lastName}
                    className="form-field"
                    placeholder="Last Name"
                    name="lastName" />
                    {submitted && !values.lastName ?<span>Please enter a last name</span> : null}
                <input 
                    onChange={EmailInputChange}
                    value={values.email}
                    className="form-field"
                    placeholder="Email"
                    name="email" />
                    {submitted && !values.email ?<span>Please enter a email</span> : null}
                <button
                className="form-field"
                type="submit">Register</button>
            </form>
        </div>
    )
}

export default Form
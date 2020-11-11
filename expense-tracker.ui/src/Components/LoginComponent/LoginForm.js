import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './LoginForm.scss'
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap'
import Axios from 'axios'
import { serverPath } from '../../secret'

const LoginForm = () =>{

    const history = useHistory()
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [error, setError] = useState('')
    
    const filldata= () => {
        var data={
            email: email,
            password: password
        }
        console.log(data)
        const url="/dashboard"

        Axios.post(serverPath.local + '/auth/login', data)
            .then(res => {
                if (res.data.success) {                    
                    localStorage.setItem('user', res.data.data._id)
                    setTimeout(function() {
                        window.location.href = url
                    }, 1000)
                    setError("")
                    setEmail("")
                    setPassword("")
                } else {
                    setError(res.data.msg)
                }
            })
            .catch(er => console.log(er))

    }
    const redirectToComponent= (url) =>{
        history.push(url)
    }
    return(
        <div className="container-50">
            {error ? <Alert color="danger">{error}</Alert> : null}
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" onChange={(e)=>{setEmail(e.target.value)}} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword"  onChange={(e)=>{setPassword(e.target.value)}}/>
                </FormGroup>
                
                <FormGroup>
                    <Button onClick={()=>{filldata()}}>Login</Button>  
                </FormGroup>
                <FormGroup>
                     Don't have an account?
                    <Button color="link" onClick={()=>redirectToComponent('/register')}>Signup</Button>
                </FormGroup>
            </Form>
            
        </div>
    )
}

export default LoginForm;
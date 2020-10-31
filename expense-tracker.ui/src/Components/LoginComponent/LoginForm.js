import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './LoginForm.scss'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

const LoginForm = () =>{

    const history = useHistory()
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    
    const filldata= () => {
        var data={
            email: email,
            password: password
        }
        console.log(data)
        setEmail("")
        setPassword("")

    }
    const redirectToComponent= (url) =>{
        history.push(url)
    }
    return(
        <div className="container-50">
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
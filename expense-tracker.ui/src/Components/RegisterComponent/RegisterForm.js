import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';


const RegisterForm = () =>{

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] =useState('')
    const [dob, setDob] =useState('')
    

    const filldata = ()=> {
        
        
        var data ={
            email: email,
            password: password,
            name: name,
            dob: dob,
            
        }
       console.log(data)
        setEmail("")
        setPassword("")
        setName("")
        setDob("")
    }
    const redirectToComponent = (url) => {
        history.push(url)
    }
    return(
        <Form className="container-50">
            <Row form>
                <Col md={6}>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail"  value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword " value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label for="exampleName">FullName</Label>
                <Input type="text" name="name" id="exampleName" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleDOB">DOB</Label>
                <Input type="date" name="dob" id="exampleDOB" value={dob} onChange={(e)=>{setDob(e.target.value)}}/>
            </FormGroup>
            
            <FormGroup>
                <Button onClick={()=>{filldata()}}>Register</Button>
            </FormGroup>

            <FormGroup>
                Already have an account?
                <Button color="link" onClick={()=>redirectToComponent('/')}>Signin</Button>
            </FormGroup>
    </Form>
    )
}

export default RegisterForm;
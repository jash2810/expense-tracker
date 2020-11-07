import Axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import secret from '../../../secret'

const EditProfile = ({user, setEditProfile}) => {

    const [name, setName] = useState(user.details.name)

    const handleUpdate = () => {
        var data = {
            userId: user._id,
            name: name
        }
        Axios.put(secret.serverPath.local + '/user/update', data)
            .then(res => {
                if (res.data.success) {
                    setEditProfile(false)
                }
            })
            .catch(er => console.log(er))
    }

    return(
        <div>
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" disabled name="email" value={user.cred.email} id="exampleEmail" placeholder="with a placeholder" />
                </FormGroup>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" placeholder="Enter Name" value={name} onChange={(e) => {setName(e.target.value)}} />
                </FormGroup>
                <Button color="primary" className="mr-3" onClick={handleUpdate}>Submit</Button>
                <Button color="secondary" onClick={() => {setEditProfile(false)}}>Back</Button>
                </Form>
        </div>
    )
}

export default EditProfile
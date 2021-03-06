import Axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Jumbotron, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import secret from '../../secret'
import EditProfile from './EditProfile/EditProfile'

const UserProfile = () => {

    const history = useHistory()

    const [user, setUser] = useState(null)
    const [editProfile, setEditProfile] = useState(false)

   
    useEffect(() => {

        Axios.get(secret.serverPath.local + '/account/search/' + localStorage.getItem('user'))
            .then(res => {
                if (res.data.success) {
                    setUser(res.data.data)
                }
            })
            .catch(er => console.log(er))

    }, [editProfile])

    return(
        <div className={"container mt-5"}>
            {editProfile ? 
                (
                    <EditProfile user={user} setEditProfile={setEditProfile}/>
                )
                :
                (
                    <Fragment>
                        {user ? 
                            (
                                <Jumbotron>
                                    <h1 className="display-3">{user.details.name}</h1>
                                    <p className="lead">{user.cred.email}</p>
                                    <hr className="my-2" />
                                    <p>Balance: {user.account.balance} &#x20B9;</p>
                                    <p className="lead">
                                        <Button color="primary" className="mr-3" onClick={() => {history.push('/dashboard')}}>Dashboard</Button>
                                        <Button color="secondary" onClick={() => {setEditProfile(true)}}>Edit</Button>
                                    </p>
                                </Jumbotron>
                            )
                            :
                            null
                        }
                    </Fragment>
                )
            }
                   
        </div>
    )
}

export default UserProfile
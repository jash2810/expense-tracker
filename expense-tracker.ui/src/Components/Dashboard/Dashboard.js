import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverPath } from '../../secret'

const Dashboard = () => {
    
    Axios.post(serverPath.local + '/account/credit')

    return(
        <div>welcome!</div>
    )
}

export default Dashboard
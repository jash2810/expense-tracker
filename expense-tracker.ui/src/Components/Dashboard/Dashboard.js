import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Badge, Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Row } from 'reactstrap'
import { serverPath } from '../../secret'

const Dashboard = () => {

        const history = useHistory()
        const [type, setType] = useState(1)
        const [description, setDescription]= useState('')
        const [date, setDate]= useState(null)
        const [amount, setAmount]= useState('')
        const [duedate, setDueDate]= useState(null)
        const [source, setSource]= useState()
        const [toperson, setToPerson]= useState('')
        const [category, setCategory]= useState('')
        const [error, setError] = useState('')

        const addData= () => {
           // const url="/dashboard"
            var data ={
                description: description,
                date: date,
                type:type,
                source: source,
                toperson: toperson,
                category: category,
                amount: amount,
                duedate: duedate,
                
            }
            console.log(data)
            {/*Axios.post(serverPath.local + '/account/credit',data)
            .then(res => {
                if (res.data.success) {
                    history.push(url)
                    setError("")
                    setDescription("")
                    setDate("")
                    setType("")
                    setSource("")
                    setAmount("")
                    setDueDate("")
                    setCategory("")
                    setToPerson("")
                    
                } else {

                    setError(res.data.msg)
                }
            })
        .catch(er => console.log(er))*/}
        }
   
    return(
        <div  className="container-50">
            <h1><Badge color="secondary">Expense-Tracker</Badge></h1>
            <h4> <Badge color="secondary">ADD EXPENSE</Badge></h4>
            <Row>
                <Col>
                    <FormGroup style={{margin:"auto"}}>
                        <Label for="exampleText">Description</Label>
                        <Input type="textarea" name="text" id="exampleText" onChange={(e)=>{setDescription(e.target.value)}}/>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="exampleDate">Date</Label>
                        <Input type="date" name="date" id="exampleDate" onChange={(e)=>{setDate(e.target.value)}}/>
                    </FormGroup>
                </Col>
            </Row>                        
                <FormGroup>
                    <Label for="exampleSelectMulti">Type</Label>
                    <Input type="select" name="selectMulti" id="exampleSelectMulti" onChange={(e) => {setType(parseInt(e.target.value))}}>
                        <option value={1}>credited</option>
                        <option value={2}>debited</option>
                    </Input>
                </FormGroup> 
            {type === 1 ? 
                (
                    <FormGroup>
                        <Label for="exampleSource">Source</Label>
                        <Input type="text" name="source" id="exampleSource" onChange={(e)=>{setSource(e.target.value)}} />
                    </FormGroup>
                )
                :
                (
                    null
                )
            }    
            {type === 2 ? 
                (
                    
                    <FormGroup>
                        <Label for="exampleSelectMulti">Category</Label>
                    <Input type="select" name="selectMulti" id="exampleSelectMulti" onChange={(e)=>{setCategory(e.target.value)}}>
                        <option >Food</option>
                        <option >Clothes</option>
                        <option >Groceries</option>

                    </Input>
                        <Label for="examplePerson">ToPerson</Label>
                        <Input type="text" name="person" id="examplePerson"  onChange={(e)=>{setToPerson(e.target.value)}}/>
                    </FormGroup>
                )
                :
                (null)
            }             

            {type !== 0 ?
                (            
                    <div>
                        <FormGroup>
                            <Label for="exampleAmount">Amount</Label>
                            <Input type="number" name="amount" id="exampleAmount" onChange={(e)=>{setAmount(parseInt(e.target.value))}} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleDueDate">DueDate</Label>
                            <Input type="date" name="duedate" id="exampleDueDate"  onChange={(e)=>{setDueDate(e.target.value)}}/>
                        </FormGroup>
                                    
                        <FormGroup>
                                <Button onClick={()=>addData()}>Add</Button>  
                        </FormGroup>
                    </div>
                )
                :
                ('please select the type')
            }
        </div>
    )
}

export default Dashboard
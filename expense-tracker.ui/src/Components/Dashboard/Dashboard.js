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
        const [amount, setAmount]= useState(0)
        const [source, setSource]= useState()
        const [toperson, setToPerson]= useState('')
        const [category, setCategory]= useState('')
        const [error, setError] = useState('')

        const creditData= () => {
            const url="/dashboard"
            var data ={
                description: description,
                date: date,
                type:type,
                source: source,
                amount: amount,
                userId: localStorage.getItem('user')
            }
            console.log(data)
            Axios.post(serverPath.local + '/account/credit',data)
            .then(res => {
                if (res.data.success) {
                    history.push(url)
                    setError("")
                    setDescription("")
                    setDate()
                    setType(1)
                    setSource("")
                    setAmount(0)
            
                } else {

                    setError(res.data.msg)
                }
            })
        .catch(er => console.log(er))
        }
   
        const debitData = () =>{
            const url="/dashboard"
            var data ={
                description: description,
                date: date,
                type:type,
                amount: amount,
                category: category,
                toperson: toperson,
                userId: localStorage.getItem('user')
            }
            console.log(data)
            Axios.post(serverPath.local + '/account/debit',data)
            .then(res => {
                if (res.data.success) {
                    history.push(url)
                    setError("")
                    setDescription("")
                    setDate()
                    setType(1)
                    setCategory("")
                    setToPerson("")
                    setAmount(0)
            
                } else {

                    setError(res.data.msg)
                }
            })
        .catch(er => console.log(er))

        }
    return(
        <div  className="container-50">
            <h1>Expense-Tracker</h1>
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
                        <option value={1} selected={type === 1 ? true : false}>credited</option>
                        <option value={2} selected={type === 2 ? true : false}>debited</option>
                    </Input>
                </FormGroup> 

                {type !== 0 ?
                (    
                       
                    <div>
                        <FormGroup>
                            <Label for="exampleAmount">Amount</Label>
                            <Input type="number" name="amount" id="exampleAmount" value={amount} onChange={(e)=>{setAmount(parseInt(e.target.value))}} />
                        </FormGroup>
                        {/*<FormGroup>
                                <Button onClick={()=>creditData()}>Add</Button>  
                        </FormGroup>*/}
                    </div>
                
                )
                :
                ('please select the type')
            }
            {type === 1 ? 
                (
                    <FormGroup>
                        <Label for="exampleSource">Source</Label>
                        <Input type="text" name="source" id="exampleSource" onChange={(e)=>{setSource(e.target.value)}} />
                        <Button onClick={()=>creditData()} className="mt-2">Add</Button>
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

                        <Button onClick={()=>debitData()} className="mt-2">Add</Button>
                    </FormGroup>
                )
                :
                (null)
            }             

            
        </div>
    )
}

export default Dashboard
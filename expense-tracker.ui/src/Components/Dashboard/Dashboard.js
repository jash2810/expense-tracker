import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Badge, Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap'

import { serverPath } from '../../secret'

const Dashboard = (props) => {
        const {
                buttonLabel,
                className
        } = props;

        const history = useHistory()
        const [type, setType] = useState(1)
        const [description, setDescription]= useState('')
        const [date, setDate]= useState(null)
        const [amount, setAmount]= useState(0)
        const [source, setSource]= useState()
        const [toperson, setToPerson]= useState('')
        const [category, setCategory]= useState('')
        const [error, setError] = useState('')
        const [modal, setModal] = useState(false);
        const [viewData, setviewData]=useState(null);
        const [allTransactions, setAllTransactions] = useState([]);

        const toggle = () => setModal(!modal);

        const viewRecords = () => {

             var data= localStorage.getItem('user')
            Axios.get(serverPath.local + '/account/search/' + data)
            .then(res => {
                if (res.data.success) {
                    var debited = res.data.data.account.debited
                    var credited = res.data.data.account.credited
                    var merged = [...debited,...credited]
                    
                    merged.sort(function(a,b){
                        return new Date(b.date) - new Date(a.date);
                      });
                    console.log(merged)
                    setAllTransactions(merged)
                    
                    setviewData(res.data.data)
                    
                } else {

                    setError(res.data.msg)
                }
            })
        .catch(er => console.log(er))
        
        }
        

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
            console.log(date)
            console.log(typeof(date))
            Axios.post(serverPath.local + '/account/credit',data)
            .then(res => {
                if (res.data.success) {
                    // history.push(url)
                    setError("")
                    setDescription("")
                    setDate(null)
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
            console.log(date)
            console.log(typeof(date))
            Axios.post(serverPath.local + '/account/debit',data)
            .then(res => {
                if (res.data.success) {
                    // history.push(url)
                    setError("")
                    setDescription("")
                    setDate(null)
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
        useEffect(() =>{
            viewRecords()
        }, [])
    return(
        <div  className="container-50">
            <h1><Badge color="secondary">Expense Tracker</Badge></h1>
            
            <Button color="secondary" onClick={toggle}>{buttonLabel}Add expense</Button>
            <Modal isOpen={modal} toggle={toggle} fade='false' style={{display:"block"}} className={className}>
                <ModalHeader toggle={toggle}>Add Expense</ModalHeader>
                <ModalBody>
                <Row>
                <Col>
                    <FormGroup style={{margin:"auto"}}>
                        <Label for="exampleText">Description</Label>
                        <Input type="textarea" name="text" id="exampleText" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="exampleDate">Date</Label>
                        <Input type="date" name="date" id="exampleDate" value={date} onChange={(e)=>{setDate(e.target.value); console.log(e.target.value, typeof(e.target.value))}}/>
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
                        <Input type="text" name="source" value={source} id="exampleSource" onChange={(e)=>{setSource(e.target.value)}} />
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
                        <Input type="text" name="person" value={toperson} id="examplePerson"  onChange={(e)=>{setToPerson(e.target.value)}}/>

                        <Button onClick={()=>debitData()} className="mt-2">Add</Button>
                    </FormGroup>
                )
                :
                (null)
            }             
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Row>
                <Col>
                 <Button color="link" onClick={()=>{history.push('/profile')}}>Profile</Button>
                </Col>
            </Row>

            {viewData ?
                (
                    <Table>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTransactions.map((d,key) => (
                                <tr>
                                <th scope="row">1</th>
                                <td>{type}</td>
                                <td>{d.description}</td>
                                <td>{d.amount}</td>
                                <td>{d.date}</td>
                                <td>{d.category}</td>
                                <td>{d.source}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table> 
                )
                :
                (
                    <h1>loading...</h1>
                )
            }
            
            
        </div>
    )
}

export default Dashboard
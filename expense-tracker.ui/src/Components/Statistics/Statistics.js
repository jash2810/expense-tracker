import Axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { serverPath } from '../../secret'


const Statistics = () =>{

    const [fromdate, setFromDate]= useState('')
    const [todate, setToDate]= useState('')
    const [error, setError] = useState('')
    const [totalCreditedAmount,settotalCreditedAmount]=useState('')
    const [totalDebitedAmount,settotalDebitedAmount]=useState('')


    const seeStats= () =>{

        var data= {
            fromdate: fromdate,
            todate: todate,
            userId: localStorage.getItem('user')
        }
        
        
        Axios.post(serverPath.local + '/account/filter',data)
        .then(res => {
            if (res.data.success) {
               
               settotalCreditedAmount(res.data.totalCreditedAmount)
               settotalDebitedAmount(res.data.totalDebitedAmount)
               
                
            } else {

                setError(res.data.msg)
            }
        })
    .catch(er => console.log(er))
        
    }

    return(
        <div className="container-50">
            <Row>
                <Col>
                    <FormGroup style={{margin:"auto "}}>
                        <Label for="fromdate"> From Date</Label>
                        <Input type="date" name="fromdate" id="fromdate" value={fromdate} onChange={(e)=>{setFromDate(e.target.value)}} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup style={{margin:"auto "}}>
                        <Label for="todate"> To Date</Label>
                        <Input type="date" name="todate" id="todate"  value={todate} onChange={(e)=>{setToDate(e.target.value)}}/>
                    </FormGroup>
                </Col>
            </Row>      
            <Row>
                <Col>
                    <FormGroup>
                        <Button onClick={()=>seeStats()} className="mt-2">Statistics</Button>
                    </FormGroup>
                </Col>
            </Row>   
            <Row>
                <Col>
               
                     Total Credited Amount: <Button color="link" style={{color:"green"}}>{totalCreditedAmount}</Button>
                </Col>
            </Row> 
            <Row>
                <Col>
                     Total Debited Amount: <Button color="link" style={{color:"red"}}>{totalDebitedAmount}</Button>
                </Col>
            </Row> 
          
                       


        </div>
    )
}

export default Statistics
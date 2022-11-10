import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@material-ui/core/Paper'
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import { patchDpm, postDpm } from './Forms/DpmForm';
import EditTwoTone from "@material-ui/icons/EditTwoTone"
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';


const DistributorsPaymentMaster = () => {
  const [distributor_payment_masters,setDistributor_payment_masters] = useState([])
  const [distributor_id,setDistributor_id] = useState("")
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [payment_date, setPayment_date] = useState("")
  const [ payment_mode, setPayment_mode] = useState("")
  const [payment_code, setPayment_code] = useState("")
  const [amount, setAmount] = useState("")
  const [invoice, setInvoice] = useState("")
  const [open, setOpen] = useState(false)


        
              

useEffect(()=>{
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:5100/distributorpaymentmaster")
      console.log(response.data)
      setDistributor_payment_masters(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error.message)
    }
  }
  fetchData()
},[refresh])

const handleClose = () => {
  setOpen(false)
  payment_date("")
  payment_mode("")
  payment_code("")
  amount("")
  invoice("")
}

const handleOpen = (e,payment_date,payment_mode,payment_code,amount,invoice ) => {
  setOpen(true)
  payment_date(payment_date)
  payment_mode(payment_mode)
  payment_code(payment_code)
  amount(amount)
  invoice(invoice)
}

const deletePost = async(esha) => {
  setDistributor_id(esha)
  try {
    const response = await axios.delete(`http://localhost:5100/delete-distributorpaymentmaster/${esha}`)
    console.log(response)
    alert("successfull")
    setTimeout(() => {
      setRefresh(refresh + 1)
    },1000)
  } catch (error) {
    console.error(error.message)
  }
}

const handleUpdate = (e,payment_date,payment_mode,payment_code,amount,invoice) => {
  setDistributor_id(distributor_id)
  
  handleOpen(e,payment_date,payment_mode,payment_code,amount,invoice)
}

const dialogForm = () =>{
  const dialog = () => {
    if(distributor_id === ""){
      const body = {
        payment_date,
        payment_mode,
        payment_code,
        amount,
        invoice  
      }
      postDpm(body)
      setTimeout(() => {
        setRefresh(refresh + 1)
      },1000)
      console.log(body)
      handleClose()
    }else{
      const body = {
        payment_date,
        payment_mode,
        payment_code,
        amount,
        invoice  
      }
      patchDpm(body,distributor_id)
      setTimeout(() => {
        setRefresh(refresh + 1)
      },1000)
      console.log(body)
      handleClose()

    }
  }
  return(
    <div>
      <Button variant="outlined"className='color' typography="h5" onClick={e => handleOpen(e)}>
       Add Distributor Payment Master
      </Button>
      <Dialog open={open} onClose={e => handleClose(e)}>
       
          <h3>Add A New Distributor Payment Master</h3>
          <form> 
          <div className='space'>
            
       <div className='in_space'>
       <label>Payment Date</label><br></br>
       <input
       type="text"
       name="payment_date"  
       required="required"
       value={payment_date}
       placeholder='Enter Payment Date'
       onChange={(e)=> setPayment_date(e.target.value)}

       /><br></br></div>
              <div className='in_space'>
       <label>Payment Mode</label><br></br>
       <input
       type="text"
       name="payment_mode"
       required="required"
       value= {payment_mode}
       placeholder='Enter Payment Mode'
       onChange={(e)=> setPayment_mode(e.target.value)}

       /><br></br></div>
       <div className='in_space'>
       <label>Payment Code</label><br></br>
       <input
       type="text"
       name="payment_code"
       value = {payment_code}
       required="required"
       placeholder='Enter Payment Code'
       onChange={(e)=> setPayment_code(e.target.value)}

       />
       <br></br>
       </div>
       <div className='in_space'>
       <label>Amount</label><br></br>
       <input
       type="text"
       name="Amount"
       value={amount}
       required="required"
       placeholder='Enter Amount'
       onChange={(e)=> setAmount(e.target.value)}

       />
       </div>
     

     <div className='in_space'>
       <label>Invoice</label><br></br>
       <input
       type="text"
       name="Invoice"
       value={invoice}
       required="required"
       placeholder='Enter Invoice'
       onChange={(e)=> setInvoice(e.target.value)}

       />
       </div>
       </div> 
      
          </form>
        
          <Button onClick={()=>handleClose()}>Cancel</Button>
          <Button type="submit" onClick={e => dialog(e)}>Add</Button>
      
      </Dialog>
    
    </div>
  )
}

  return (
    <>
    <h3>DISTRIBUTOR PAYMENT MASTER</h3>
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> ID</TableCell>
            <TableCell align="right">Payment Date</TableCell>
            <TableCell align="right">Payment Mode</TableCell>
            <TableCell align="right">Payment Code</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Invoice Number</TableCell>
            <TableCell align="right">Actions</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {distributor_payment_masters && distributor_payment_masters.map((distributor) => (
            <TableRow
              key={distributor.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {distributor.id}
              </TableCell>
              <TableCell align="right">{distributor.payment_date}</TableCell>
              <TableCell align="right">{distributor.payment_mode}</TableCell>
              <TableCell align="right">{distributor.payment_code}</TableCell>
              <TableCell align="right">{distributor.invoice_number}</TableCell>
              <TableCell align="right">{distributor.amount}</TableCell>
              <TableCell align="right">
              <EditTwoTone onClick={(e) => handleUpdate(e,distributor.payment_date,distributor.payment_mode,distributor.payment_code,distributor.invoice_number,distributor.amount)}/>
              <DeleteTwoToneIcon onClick={() => deletePost(distributor.id)}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  {dialogForm()}
  </>
  )
}

export default DistributorsPaymentMaster
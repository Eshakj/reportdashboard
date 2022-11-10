import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@material-ui/core/Paper'
import axios from 'axios';
import { postDpa, updateDpa } from './Forms/DpaForm';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoTone from "@material-ui/icons/EditTwoTone"



const DistributorsPaymentAllocation = () => {
const [loading, setLoading]= useState(false)
const [refresh, setRefresh] = useState(0)
const [open, setOpen] = useState(false)
const [payment_id, setPayment_Id] = useState("")
const [invoice_sub_number, setInvoice_sub_number] = useState("")
const [amount_allocated, setAmount_allocated] = useState("")
const [dpa_id, setDpa_id] = useState("")
const [dpa, setDpa] = useState([])



useEffect(()=>{
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:5100/dpa") 
      console.log(response.data)
      setDpa(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error.message)
    }
  }
fetchData()
},[refresh])



const handleClose = ()=>{
  setPayment_Id("")
  setInvoice_sub_number("")
  setAmount_allocated("")
  setOpen(false)
  setRefresh(0 + 1)
}

const handleOpen = (e,payment_id,invoice_sub_number,amount_allocated)=>{
  setPayment_Id(payment_id)
  setInvoice_sub_number(invoice_sub_number)
  setAmount_allocated(amount_allocated)
  setOpen(true)
}

const handleUpdate = (e,id,payment_id,invoice_sub_number,amount_allocated) =>{
  setDpa_id(id)
  handleOpen(e,payment_id,invoice_sub_number,amount_allocated)

}

const deletePost = async(id)=>{
  try {
    const response = await axios.delete(`http://localhost:5100/delete-dpa/${id}`)
    console.log(response)
    setRefresh(refresh + 1)
  } catch (error) {
    console.error(error.message)
    setRefresh(refresh +1)
  }
}


const dialogForm = () =>{
  const handleAddClick = async()=>{
    if(dpa_id === ""){
      const func = await postDpa(payment_id,invoice_sub_number,amount_allocated)
      handleClose()
    }else{
      updateDpa(dpa_id,payment_id,invoice_sub_number,amount_allocated)
      handleClose()
    }
  }
  return(
    <div>
    <Button variant="outlined" typography="h5" onClick={(e)=> handleOpen(e)} >
     Add Distributor Payment Allocation
    </Button>
    <Dialog open={open} onClose={e => handleClose(e)}>
     
        <h3>Add A New Distributor Payment Allocation </h3>
        <form> 
        <div className='space'>
          
     <div className='in_space'>
     <label>Payment Id</label><br></br>
     <input
     type="text"
     name="payment_id"  
     required="required"
     value={payment_id}
     placeholder='Enter Payment Id'
     onChange={(e)=> setPayment_Id(e.target.value)}

     /><br></br></div>
            <div className='in_space'>
     <label>Invoice Sub Number</label><br></br>
     <input
     type="text"
     name="invoice_sub_number"
     required="required"
     value= {invoice_sub_number}
     placeholder='Enter Invoice Sub Number'
     onChange={(e)=> setInvoice_sub_number(e.target.value)}

     /><br></br></div>
     <div className='in_space'>
     <label>Amount Allocated</label><br></br>
     <input
     type="text"
     name="Amount Allocated"
     value = {amount_allocated}
     required="required"
     placeholder='Enter Amount Allocated'
     onChange={(e)=> setAmount_allocated(e.target.value)}

     /><br></br>
     </div>
   </div> 
        </form>
      
        <Button onClick={(e)=>handleClose(e)}>Cancel</Button>
        <Button type="submit" onClick={(e)=> handleAddClick(e)}>Add</Button>
    
    </Dialog>
  </div>
  )
}






  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dpa ID</TableCell>
            <TableCell>Payment ID</TableCell>
            <TableCell>Invoice Sub-Number</TableCell>
            <TableCell>Amount Allocated</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Actions</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {dpa&& dpa.map((distributor) => (
            <TableRow
              key={distributor.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {distributor.id}
              </TableCell>
              <TableCell align="right">{distributor.payment_id}</TableCell>
              <TableCell align="right">{distributor.invoice_sub_number}</TableCell>
              <TableCell align="right">{distributor.amount_allocated}</TableCell>
              <TableCell align="right">{distributor.created_at}</TableCell>
              <TableCell align="right">{distributor.updated_at}</TableCell>
              <TableCell align="right">{distributor.actions}</TableCell>
              <TableCell className='float-container'> 
                 
                  <Button className='float-child'onClick={(e)=>{handleUpdate(e, distributor.payment_id,distributor.invoice_sub_number,distributor.amount_allocated)}}><EditTwoTone /></Button>
                 <Button><DeleteTwoToneIcon onClick={(id)=> deletePost(distributor.id)} /> </Button>             
     
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 <br></br>
 {dialogForm()}
  </>
  )
}

export default DistributorsPaymentAllocation
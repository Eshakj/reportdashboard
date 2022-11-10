import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@material-ui/core/Paper'
import axios from 'axios';
import { patchDim, postDim } from './Forms/DimForm';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoTone from "@material-ui/icons/EditTwoTone"

const DistributorInvoiceMaster = () => {
  const [distributor_invoice_masters, setDistributor_invoice_masters] = useState([])
const [loading, setLoading] = useState(false)
const [refresh, setRefresh] = useState(0)
const [dim_id, setDim_id] = useState("")
const [distributor_code,setDistributor_code ] = useState("")
const [diocese_code,setDiocese_code] = useState("")
const [invoice_number, setInvoice_number] = useState("")
const [date,setDate] = useState("")
const [ship_to, setShip_to] = useState("")
const [terms, setTerms] = useState("")
const [ship_date,setShip_date] = useState("")
const [ship_total, setShip_Total] = useState("")
const [open, setOpen] = useState(false)

useEffect(()=>{
  setLoading(true)
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5100/dim")
      console.log(response.data)
      setDistributor_invoice_masters(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }
  fetchData()
},[refresh])

const handleClose = () => {
  setDistributor_code("")
  setDiocese_code("")
  setInvoice_number("")
  setDate("")
  setShip_to("")
  setTerms("")
  setShip_date("")
  setShip_Total("")
   setOpen(false)
}

const handleOpen = (ki,ko,ku,ka,li,lo,lu,la) => {
  setDistributor_code(ki)
  setDiocese_code(ko)
  setInvoice_number(ku)
  setDate(ka)
  setShip_to(li)
  setTerms(lo)
  setShip_date(lu)
  setShip_Total(la)
   setOpen(true)
}

const deletePost = async(id) => {
  try {
    const response = await axios.delete(`http://localhost:5100/delete-dim/${id}`)
    console.log(response)
    alert("Succesfull")
    setRefresh(refresh + 1)
  } catch (error) {
    console.error(error.message)
  }
}

const handleUpdate = (e,id,ki,ko,ku,ka,li,lo,lu,la) => {
  setDim_id(id)
  patchDim(ki,ko,ku,ka,li,lo,lu,la)
}

const dialogForm = () => {
  const dialog = () => {
    if(dim_id === ""){
      const body = {
        distributor_code,
        diocese_code,
        invoice_number,
        date,
        ship_to,
        terms,
        ship_date,
        ship_total
      }
      postDim(body)
      alert("successful")
      setRefresh(refresh + 1)
    }else{
      const body = {
        distributor_code,
        diocese_code,
        invoice_number,
        date,
        ship_to,
        terms,
        ship_date,
        ship_total
      }
     patchDim(body,dim_id)
     alert("successful")
    setRefresh(refresh + 1)
    }
  }
  return(
    <div>
    <Button variant="outlined"className='color' typography="h5" onClick={e => handleOpen(e)}>
     Add Distributor Invoice Master
    </Button>
    <Dialog open={open} onClose={e => handleClose(e)}>
     
        <h3>Add A New Distributor Invoice Master</h3>
        <form> 
        <div className='space'>
          
     <div className='in_space'>
     <label>Distributor Code</label><br></br>
     <input
     type="text"
     name="distributor_code"  
     required="required"
     value={distributor_code}
     placeholder='Enter Distributor Code'
     onChange={(e)=> setDistributor_code(e.target.value)}

     /><br></br></div>
    <div className='in_space'>
     <label>Diocese Code</label><br></br>
     <input
     type="text"
     name="Diocese Code"
     required="required"
     value= {diocese_code}
     placeholder='Enter Diocese Code'
     onChange={(e)=> setDiocese_code(e.target.value)}

     /><br></br></div>
     <div className='in_space'>
     <label>Invoice Number</label><br></br>
     <input
     type="text"
     name="Invoice Number"
     value = {invoice_number}
     required="required"
     placeholder='Enter Invoice Number'
     onChange={(e)=> setInvoice_number(e.target.value)}

     /><br></br>
     </div>
     <div className='in_space'>
     <label>Date</label><br></br>
     <input
     type="text"
     name="date"
     value={date}
     required="required"
     placeholder='Enter Date'
     onChange={(e)=> setDate(e.target.value)}

     />
     </div>
     <div className='in_space'>
     <label>Ship To</label><br></br>
     <input
     type="text"
     name="Ship To"
     value={ship_to}
     required="required"
     placeholder='Enter Ship To'
     onChange={(e)=> setShip_to(e.target.value)}

     />
     </div>

     <div className='in_space'>
     <label>Terms</label><br></br>
     <input
     type="text"
     name="Terms"
     value={terms}
     required="required"
     placeholder='Enter Terms'
     onChange={(e)=> setTerms(e.target.value)}

     />
     </div>
     <div className='in_space'>
     <label>Ship Date</label><br></br>
     <input
     type="text"
     name="Ship Date"
     value={ship_date}
     required="required"
     placeholder='Enter Ship Date'
     onChange={(e)=> setShip_date(e.target.value)}

     />
     </div>
     <div className='in_space'>
     <label>Total</label><br></br>
     <input
     type="text"
     name="Total"
     value={ship_total}
     required="required"
     placeholder='Enter Ship Total'
     onChange={(e)=> setShip_Total(e.target.value)}

     />
     </div>
   </div> 
    
        </form>
      
        <Button onClick={()=>handleClose()}>Cancel</Button>
        <Button type="submit" onClick={() => dialog()}>Add</Button>
    
    </Dialog>
  
  </div>
  )
}










  return (
    <>
   
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Distributor Code</TableCell>
            <TableCell align="right">Diocese Code</TableCell>
            <TableCell align="right">Invoice Number</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Ship To</TableCell>
            <TableCell align="right">Terms</TableCell>
            <TableCell align="right">Ship Date</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {distributor_invoice_masters && distributor_invoice_masters.map((distributor) => (
            <TableRow
              key={distributor.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {distributor.id}
              </TableCell>
              <TableCell align="right">{distributor.distributor_code}</TableCell>
              <TableCell align="right">{distributor.diocese_code}</TableCell>
              <TableCell align="right">{distributor.invoice_number}</TableCell>
              <TableCell align="right">{distributor.date}</TableCell>
              <TableCell align="right">{distributor.ship_to}</TableCell>
              <TableCell align="right">{distributor.terms}</TableCell>
              <TableCell align="right">{distributor.ship_date}</TableCell>
              <TableCell align="right">{distributor.ship_total}</TableCell>
              <TableCell align="right">
                <EditTwoTone onClick={(e) => handleUpdate(e,distributor.id,distributor.distributor_code,distributor.diocese_code,distributor.invoice_number,distributor.date,distributor.ship_to,distributor.terms,distributor.ship_date,distributor.ship_total)}/>
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

export default DistributorInvoiceMaster
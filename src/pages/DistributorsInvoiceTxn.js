import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import axios from 'axios';
import { patchDistributorIt, postDistributorIt } from './Forms/DistriInvTxnForm';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const DistributorsInvoiceTxn = () => {
  const [distributors, setDistributors] = useState([])
  const [loading , setLoading] = useState(false)
  const [refresh , setRefresh] = useState(0)
  const [ distributor_id,setDistributor_id] = useState("")
  const [open, setOpen] = useState(false)
  const [customer_id, setCustomer_id]=useState("")
  const [product_code, setProduct_code]=useState("")
  const [rate, setRate] =useState("")
  const [amount, setAmount]=useState("")
  const [vat,setVat]=useState("")
  const [total, setTotal]=useState("")
  const [product_serial, setProduct_serial]=useState("")
  const [invoice_number, setInvoice_number]=useState("")
  const [invoice_sub_number, setInvoice_sub_number] =useState("")

  useEffect(() => {
   const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:5100/distributorinvoicetxns")
      console.log(response.data)
      setDistributors(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error.message)
    }
   }
   fetchData( )
  }, [refresh])

const handleClose = () => {
  setInvoice_number ("")
  setInvoice_sub_number("")
  setCustomer_id("")
  setProduct_code("")
  setRate("")
  setAmount("")
  setVat("")
  setTotal("")
  setProduct_serial("")
  setOpen(false)
}

const handleOpen = (e, invoice_number,invoice_sub_number,customer_id,product_code,rate,amount,vat,total,product_serial) => {
  setInvoice_number (invoice_number)
  setInvoice_sub_number(invoice_sub_number)
  setCustomer_id(customer_id)
  setProduct_code(product_code)
  setRate(rate)
  setAmount(amount)
  setVat(vat)
  setTotal(total)
  setProduct_serial(product_serial)
  setOpen(true)
}

const deletePost = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5100/delete-distributorinvoicetxn/${id}`)
    console.log(response.data)
    setTimeout(() => {
      setRefresh(refresh + 1)
    })
    alert("deleted successfully")
  } catch (error) {
    console.error(error.message)
  }
}

const handleUpdate = (e,id, invoice_number,invoice_sub_number,customer_id,product_code,rate,amount,vat,total,product_serial) => {
  setDistributor_id(id)
  handleOpen(e, invoice_number,invoice_sub_number,customer_id,product_code,rate,amount,vat,total,product_serial)
}


  const dialogForm = () => {
    const dialog = () => {
      if(distributor_id === ""){
        const body = {
          invoice_number,
          invoice_sub_number,
          customer_id,
          product_code,
          rate,
          amount,
          vat,
          total,
          product_serial,
        }
        postDistributorIt(body)
        console.log(body)
        setTimeout(() => {

          setRefresh(refresh + 1)
        },2000)

        handleClose()
      }else{ 
        const body = {
          invoice_number,
          invoice_sub_number,
          customer_id,
          product_code,
          rate,
          amount,
          vat,
          total,
          product_serial,
        }
        patchDistributorIt(body , distributor_id)
        console.log(body)
        setRefresh(refresh + 1)
        handleClose()
      }
      
    }
    return (
      <div>
  <Button variant="outlined" onClick={handleOpen}>
    Add new Distributor Invoice Txn
  </Button>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">
         Add A New Distributor
      </DialogTitle>
        <DialogContent>
        <label>Invoice Number</label>&nbsp;
          <input
          onChange  ={(e) => setInvoice_number(e.target.value)} 
          value={invoice_number}
          name='invoice_number'
          required= "required"
          placeholder='Enter Invoice Number'/>
          <br></br>
          <br></br>
          <label>Invoice Sub Number</label>&nbsp;
          <input
          onChange  ={(e) => setInvoice_sub_number(e.target.value)} 
          value={invoice_sub_number}
          name='invoice_sub_number'
          required= "required"
          placeholder='Enter Invoice Sub Number'/>
          <br></br>
          <br></br>
          <label>Customer Id</label>&nbsp;
          <input
          onChange  ={(e) => setCustomer_id(e.target.value)} 
          value={customer_id}
          name='customer_id'
          required= "required"
          placeholder='Enter Customer Id'/>
          <br></br>
          <br></br>

          <label>Product Code</label>&nbsp;
         <input
          onChange  ={(e) => setProduct_code(e.target.value)}
          value={product_code}
          name='product_code'
          required= "required"
          placeholder='Enter Product Code'/>
          <br></br>
          <br></br>

          <label>Rate</label>&nbsp;
          <input
          onChange  ={(e) => setRate(e.target.value)}
          value={rate}
          name='rate'
          required= "required"
          placeholder='Enter Rate'/>
          <br></br>
          <br></br>

          <label>Amount</label>&nbsp;
          <input
          onChange  ={(e) => setAmount(e.target.value)}
          value={amount}
          name='amount'
          required= "required"
          placeholder='Enter Amount'/>
          <br></br>
          <br></br>

          <label>Vat</label>&nbsp;
          <input
          onChange  ={(e) => setVat(e.target.value)}
          value={vat}
          name='vat'
          required= "required"
          placeholder='Enter Vat'/>
          <br></br>
          <br></br>

          <label> Total</label>&nbsp;
          <input
          onChange  ={(e) => setTotal(e.target.value)}
          value= {total}
          name='total'
          required= "required"
          placeholder='Enter Total'/>
          <br></br>
          <br></br>
          <label> Product Serial</label>&nbsp;
          <input
          onChange  ={(e) => setProduct_serial(e.target.value)}
          value= {product_serial}
          name='product_serial'
          required= "required"
          placeholder='Enter Product Serial'/>
      </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={(e) => dialog(e)} autoFocus>
           Add
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
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
          <TableCell>Id</TableCell>
          <TableCell>Invoice Number</TableCell>
            <TableCell>Invoice Sub-Number</TableCell>
            <TableCell>Customer ID</TableCell>
            <TableCell>Product Code</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>VAT</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Product Serial</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {distributors && distributors.map((distributor) => (
            <TableRow
              key={distributor.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{distributor.id}</TableCell>
              <TableCell align="right">{distributor.invoice_number}</TableCell>
              <TableCell align="right">{distributor.invoice_sub_number}</TableCell>
              <TableCell align="right">{distributor.customer_id}</TableCell>
              <TableCell align="right">{distributor.product_code}</TableCell>
              <TableCell align="right">{distributor.rate}</TableCell>
              <TableCell align="right">{distributor.amount}</TableCell>
              <TableCell align="right">{distributor.vat}</TableCell>
              <TableCell align="right">{distributor.total}</TableCell>
              <TableCell align="right">{distributor.product_serial}</TableCell>
              <TableCell align="right">{distributor.created_at}</TableCell>
              <TableCell align="right">{distributor.updated_at}</TableCell>
              <TableCell align="right">
                <EditTwoToneIcon onClick={(e) => handleUpdate(e,distributor.id,distributor.invoice_number,distributor.invoice_sub_number,distributor.customer_id,distributor.product_code,distributor.rate,distributor.amount,distributor.vat,distributor.total,distributor.product_serial)}/>
                <DeleteTwoToneIcon  onClick={()=> deletePost(distributor.id)}/>
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

export default DistributorsInvoiceTxn
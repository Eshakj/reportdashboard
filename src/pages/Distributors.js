import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios, { Axios } from 'axios';
import { patchDistributor, postDistributor } from './Forms/DistributorForm';

const Distributors = () => {
  const [distributors, setDistributors] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [refresh ,setRefresh] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [distributor_code, setDistributor_code] =  React.useState("")
  const [distributor_name, setDistributor_name] =  React.useState("")
  const [distributor_contact, setDistributor_contact] =  React.useState("")
  const [distributor_phone, setDistributor_phone] =  React.useState("")
  const [distributor_email, setDistributor_email] =  React.useState("")
  const [distributor_vat, setDistributor_vat] =  React.useState("")
  const [distributor_id, setDistributor_id] =  React.useState("")

  React.useEffect(()=>{
    setLoading(true)
    const fetchData = async () => {
   try {
    console.log("pyuuuuu")
    const response = await axios.get("http://localhost:5100/distributors")
    setDistributors(response.data)
    console.log(response.data)
    setLoading(false)
   } catch (error) {
    setLoading(false)
    console.error(error.message)
   }
    }
  fetchData()
  },[refresh])
  
  const deletePost = async (id) =>{
    try {
      const response = await axios.delete(`http://localhost:5100/delete-distributor/${id}`)
      console.log(response)
      setRefresh(refresh + 1)
    } catch (error) {
      setRefresh(refresh + 1)
      console.error(error.message)
    }
  }
 
  const handleOpen = (distributor_code,distributor_name,distributor_contact,distributor_phone,distributor_email,distributor_vat) => {
    setDistributor_code(distributor_code)
    setDistributor_name(distributor_name)
    setDistributor_email(distributor_email)
    setDistributor_phone(distributor_phone)
    setDistributor_contact(distributor_contact)
    setDistributor_vat(distributor_vat)
    setOpen(true)
  }

  const handleClose = () => {
    setDistributor_code("")
    setDistributor_name("")
    setDistributor_email("")
    setDistributor_phone("")
    setDistributor_contact("")
    setDistributor_vat("")
    setOpen(false)
    setTimeout(() => {
      setRefresh(refresh + 1)
    }, 2000);
  }

  const handleUpdate = (id,a,b,c,d,e,f) => {
    setDistributor_id(id)
    
    handleOpen(a,b,c,d,e,f)
  }

  const dialogForm = () =>{
    const dialog = () => {
      if(distributor_id === ""){
        const body = {
          distributor_code,
          distributor_name,
          distributor_contact,
          distributor_phone,
           distributor_email,
           distributor_vat
        }

        console.log(body)
        postDistributor(body)
        setRefresh(refresh + 1)
        handleClose()
      }else{
        const body = {
          distributor_code,
          distributor_name,
          distributor_contact,
          distributor_phone,
           distributor_email,
           distributor_vat
        }
        patchDistributor(body,distributor_id)
        setRefresh(refresh + 1)
        handleClose()
      }
    }
   
    return(
      <div>
  <Button variant="outlined" onClick={handleOpen}>
    Add New Distributor
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
          <label>Distributor Code</label>&nbsp;
          <input
          onChange  ={(e) => setDistributor_code(e.target.value)}
          value={distributor_code}
          name='distributor_code'
          required= "required"
          placeholder='Enter Distributor Code'/>
          <br></br>
          <br></br>

          <label>Distributor Name</label>&nbsp;
         <input
          onChange  ={(e) => setDistributor_name(e.target.value)}
          value={distributor_name}
          name='distributor_name'
          required= "required"
          placeholder='Enter Distributor Name'/>
          <br></br>
          <br></br>

          <label>Distributor Contact</label>&nbsp;
          <input
          onChange  ={(e) => setDistributor_contact(e.target.value)}
          value={distributor_contact}
          name='distributor_contact'
          required= "required"
          placeholder='Enter Distributor Contact'/>
          <br></br>
          <br></br>

          <label>Distributor Phone</label>&nbsp;
          <input
          onChange  ={(e) => setDistributor_phone(e.target.value)}
          value={distributor_phone}
          name='distributor_phone'
          required= "required"
          placeholder='Enter Distributor Phone'/>
          <br></br>
          <br></br>

          <label>Distributor Email</label>&nbsp;
          <input
          onChange  ={(e) => setDistributor_email(e.target.value)}
          value={distributor_email}
          name='distributor_email'
          required= "required"
          placeholder='Enter Distributor Email'/>
          <br></br>
          <br></br>

          <label>Distributor Vat</label>&nbsp;
          <input
          onChange  ={(e) => setDistributor_vat(e.target.value)}
          value={distributor_vat}
          name='distributor_vat'
          required= "required"
          placeholder='Enter Distributor Vat'/>
          <br></br>
          <br></br>
      </DialogContent>
        <DialogActions>
          <Button onClick={(e) => dialog(e)} autoFocus>
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
            <TableCell>Distributor Id </TableCell>
            <TableCell align="right">Distributor Code</TableCell>
            <TableCell align="right">Distributor Name</TableCell>
            <TableCell align="right">Distributor Contact</TableCell>
            <TableCell align="right">Distributor Phone</TableCell>
            <TableCell align="right">Distributor Email</TableCell>
            <TableCell align="right">Distributor Vat</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Updated At</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {distributors || [].map((row) => ( */}
          {distributors && distributors.map((distributor) => (
            <TableRow
              key={distributor.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {distributor.id}
              </TableCell>
              <TableCell align="right">{distributor.distributor_code}</TableCell> 
              <TableCell align="right">{distributor.distributor_name}</TableCell>
              <TableCell align="right">{distributor.distributor_contact}</TableCell>
              <TableCell align="right">{distributor.distributor_phone}</TableCell>
              <TableCell align="right">{distributor.distributor_email}</TableCell>
              <TableCell align="right">{distributor.distributor_vat}</TableCell>
              <TableCell align="right">{distributor.created_at}</TableCell>
              <TableCell align="right">{distributor.updated_at}</TableCell>
              <TableCell align="right">
                <EditTwoToneIcon onClick={()=> handleUpdate(distributor.id, distributor.distributor_code, distributor.distributor_name,distributor.distributor_contact,distributor.distributor_phone,distributor.distributor_email,distributor.distributor_vat)}/>
                <DeleteTwoToneIcon  onClick={()=> deletePost(distributor.id)}/>
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

export default Distributors
import axios from 'axios'
import  { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgressWithLabel  from './loadingIcon';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Button } from '@mui/material'
import { patchSupplier, postSupplier } from './Forms/SupplierForm';
import Dialog from '@mui/material/Dialog';
import EditTwoTone from "@material-ui/icons/EditTwoTone"



 const Supplier = () => {
const [suppliers, setSuppliers] = useState([])
const [supplier_id, setSupplier_id] = useState("")
const [loading, setLoading]= useState(false)
const [supplier_code, setSupplier_code]= useState(false)
const [supplier_name, setSupplier_name]= useState(false)
const [supplier_pin, setSupplier_pin]= useState(false)
const [supplier_address, setSupplier_address]= useState(false)
const [refresh, setRefresh] = useState(0)
const [open, setOpen] = useState(false)


useEffect(()=>{
  const fetchData = async()=>{
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:5100/suppliers")
      setSuppliers(response.data)
      console.log(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error.message)
    }
  }
 fetchData()
},[refresh])

const deletePost = async(supplier_id)=>{
  try {
  const response = await axios.delete(`http://localhost:5100/delete-supplier/${supplier_id}`)
  console.log(response)
  setRefresh(refresh + 1)
    
  } catch (error) {
    console.error(error.message)
  setRefresh(refresh + 1)

  }
}

const handleOpen = (e,supplier_code,supplier_name,supplier_pin,supplier_address)=>{
  setSupplier_code(supplier_code)
  setSupplier_name(supplier_name)
  setSupplier_pin(supplier_pin)
  setSupplier_address(supplier_address)
  setOpen(true)
}

const handleClose = ()=>{
  setSupplier_code("")
  setSupplier_name("")
  setSupplier_pin("")
  setSupplier_address("")
  setOpen(false)
  setTimeout(() => {
    setRefresh(refresh + 1)
  }, 2000)
}
const handleUpdate = (e,supplier_code,supplier_name,supplier_pin,supplier_address,id)=>{
  setSupplier_id(id)
  handleOpen(e,supplier_code,supplier_name,supplier_pin,supplier_address)
}

const dialogForm = ()=>{
  const handleAddForm = ()=>{
    if(supplier_id === ""){
      const body = {
        supplier_code,
        supplier_name,
        supplier_pin,
        supplier_address
      }
      postSupplier(body)
      setTimeout(() => {
        setRefresh(refresh + 1)
      }, 2000)
      handleClose()
    }else{
      const body = {
        supplier_code,
        supplier_name,
        supplier_pin,
        supplier_address
      }
      patchSupplier(body,supplier_id)
      setRefresh(refresh + 1)
      handleClose()
    }
  }
  
  return(
    <div>
    <Button variant="outlined"className='color' typography="h5" onClick={e => handleOpen(e)}>
       Add Supplier
      </Button>
      <Dialog open={open} onClose={e => handleClose(e)}>
       
          <h3>Add A New Supplier</h3>
          <form> 
          <div className='space'>
            
       <div className='in_space'>
       <label>Supplier code</label><br></br>
       <input
       type="text"
       name="supplier code"  
       required="required"
       value={supplier_code}
       placeholder='Enter Supplier Code'
       onChange={(e)=> setSupplier_code(e.target.value)}

       /><br></br></div>
      <div className='in_space'>
       <label>Supplier Name</label><br></br>
       <input
       type="text"
       name="Supplier Name"
       required="required"
       value= {supplier_name}
       placeholder='Enter Supplier Name'
       onChange={(e)=> setSupplier_name(e.target.value)}

       /><br></br></div>
       <div className='in_space'>
       <label>Supplier Pin</label><br></br>
       <input
       type="text"
       name="Supplier Pin"
       value = {supplier_pin}
       required="required"
       placeholder='Enter Supplier Pin'
       onChange={(e)=> setSupplier_pin(e.target.value)}

       /><br></br>
       </div>
       <div className='in_space'>
       <label>Supplier Address</label><br></br>
       <input
       type="text"
       name="supplier addresss"
       value={supplier_address}
       required="required"
       placeholder='Enter Supplier Address'
       onChange={(e)=> setSupplier_address(e.target.value)}

       />
       </div>
     </div> 
      
          </form>
        
          <Button onClick={(e)=>handleClose(e)}>Cancel</Button>
          <Button type="submit" onClick={e => handleAddForm(e)}>Add</Button>
      
      </Dialog>
    
    </div>
  )
}



  return (<>
         <h1>Suppliers</h1>
         
  
     <TableContainer component={Paper}>
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <TableHead>
           <TableRow>
             <TableCell>Supplier Id</TableCell>
             <TableCell>Supplier Code</TableCell>
             <TableCell>Supplier Name</TableCell>
             <TableCell>Supplier Pin</TableCell>
             <TableCell>Supplier Address</TableCell>
             <TableCell>Created At</TableCell>
             <TableCell>Updated At</TableCell>
             <TableCell>Actions</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
          { 
          loading ?
          <TableRow
            
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell align="right"><CircularProgressWithLabel /></TableCell>
        </TableRow> : <>
           {suppliers && suppliers.map((supplier) => (
             <TableRow
               key={supplier.id}
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
             >
               <TableCell component="th" scope="row">
                 {supplier.id}
               </TableCell>
               <TableCell align="right">{supplier.supplier_code}</TableCell>
               <TableCell align="right">{supplier.supplier_name}</TableCell>
               <TableCell align="right">{supplier.supplier_pin}</TableCell>
               <TableCell align="right">{supplier.supplier_address}</TableCell>
               <TableCell align="right">{supplier.created_at}</TableCell>
               <TableCell align="right">{supplier.updated_at}</TableCell>
               <TableCell className='float-container'> 
                 
                 <Button className='float-child' onClick={e => handleUpdate(e, supplier.supplier_code,supplier.supplier_name,supplier.supplier_pin,supplier.supplier_address, supplier.id)}><EditTwoTone/></Button>
                <DeleteTwoToneIcon  onClick={()=>deletePost(supplier.id)} />              
    
             </TableCell>
             </TableRow>
           ))}
           </>
          }
         </TableBody>
       </Table>
     </TableContainer>
     <br></br>
     {dialogForm()}
     </>) 
  
}

export default Supplier
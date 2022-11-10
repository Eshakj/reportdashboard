import React, { useState , useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@material-ui/core/Paper'
import axios from "axios"
import { patchVat, postVat } from './Forms/VatForm';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoTone from "@material-ui/icons/EditTwoTone"


const VatMaster = () => {
  const [vat_masters, setVat_masters] = useState([])
  const [vat_id, setVat_id] = useState("")
  const [vat_code, setVat_code] = useState("")
  const [vat_percent, setVat_percent] = useState("")
  const [ loading, setLoading] = useState(false)
  const [ refresh , setRefresh] = useState(0)
  const [open, setOpen] = useState(false)


useEffect(()=>{
  const fetchData = async()=>{
    setLoading(true)
    try {
    const response = await axios.get("http://localhost:5100/vat")
    console.log(response.data)
    setVat_masters(response.data)
    setLoading(false)
  } catch (error) {
    setLoading(false)
    console.error(error.message)

    
  }
}
fetchData()


},[refresh])

const deletePost =async (vat_id)=>{
  try {
    const response = await axios.delete(`http://localhost:5100/delete-vat/${vat_id}`)
    console.log(response)
    setRefresh(refresh + 1)
  } catch (error) {
    console.error(error.message)
    setRefresh(refresh + 1)
  }
};
const handleUpdate = (e, vat_code,vat_percent,id) =>{
setVat_id(id)
handleClickOpen(e, vat_code,vat_percent)
}

const handleClose = () =>{
  setOpen(false)
  setVat_code("")
  setVat_percent("")
  setRefresh(refresh + 1)
}

const handleClickOpen = (e,vat_code,vat_percent) =>{
  setVat_code(vat_code)
  setVat_percent(vat_percent)
  setOpen(true)
}


const dialogForm = () => {
  const dialog = ()=>{
    if(vat_id === ""){
      const body = {
        vat_code,
        vat_percent
      }
      postVat(body)
      console.log(body)
      setRefresh(refresh + 1)
      handleClose()
    }
    else{
      const body = {
        vat_code,
        vat_percent
      }    
      patchVat(body,vat_id)
      setTimeout(() => {
        setRefresh(refresh + 1)
      },2000)
      handleClose()
   }
  }
        return(
          <div>
        <Button variant="outlined"className='color' typography="h5" onClick={e => handleClickOpen(e, "", "","","","" )}>
         Add Vat
        </Button>
        <Dialog open={open} onClose={e => handleClose(e)}>
         
            <h3>Add A New Vat</h3>
            <form> 
            <div className='space'>
              
         <div className='in_space'>
         <label>Vat Code</label><br></br>
         <input
         type="text"
         name="vat_code"  
         required="required"
         value={vat_code}
         placeholder='Enter Vat Code'
         onChange={(e)=> setVat_code(e.target.value)}
  
         /><br></br></div>
                <div className='in_space'>
         <label>Vat Percent</label><br></br>
         <input
         type="text"
         name="vat_percent"
         required="required"
         value= {vat_percent}
         placeholder='Enter Vat Percent'
         onChange={(e)=> setVat_percent(e.target.value)}
  
         /><br></br></div>
         
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
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>VAT Id</TableCell>
            <TableCell>VAT Code</TableCell>
            <TableCell align="right">VAT Percent</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vat_masters && vat_masters.map((vat) => (
            <TableRow
              key={vat.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
                {vat.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {vat.vat_code}
              </TableCell>
              <TableCell align="right">{vat.vat_percent}</TableCell>
              <TableCell align="right">
                <EditTwoTone onClick={(e) => handleUpdate(e,vat.vat_code,vat.vat_percent,vat.id)}/>
                <DeleteTwoToneIcon onClick={() => deletePost(vat.id)}/>
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

export default VatMaster
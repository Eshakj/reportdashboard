import { useState, useEffect } from 'react';
import '../../src/App.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@material-ui/core/Paper'
import axios from "axios"
import { postDiocese, updateDiocese } from "./Forms/DioceseForm"
import CircularProgressWithLabel  from './loadingIcon';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoTone from "@material-ui/icons/EditTwoTone"







const Dioceses = () =>{
  const [dioceses, setDioceses] = useState([])
  const [loading, setLoading] = useState([false])
  const [refresh, setRefresh] = useState(0)
  const [diocese_code,setDiocese_code] = useState("")
  const [distributor_code,setDistributor_code] = useState("")
  const [diocese_name,setDiocese_name] = useState("")
  const [county,setCounty] = useState("")
  const [sub_county,setSub_county] = useState("")
  const [open, setOpen]= useState(false)
  const [diocese_id, setDiocese_id] = useState("")

 
useEffect(()=>{
const fetchData = async ()=>{
  setLoading(true)
  try {
    const response = await axios.get("http://localhost:5100/dioceses")
    setDioceses(response.data)
    console.log(response.data)
    setLoading(false)
  } catch (error) {
    setLoading(false)
    console.error(error.message)
  }
}
fetchData()
},[refresh])

    
const deletePost = async (diocese_id) => {
  try {
  const response = await axios.delete(`http://localhost:5100/delete-diocese/${diocese_id}`);
console.log(response)
setRefresh(refresh + 1)
    
  } catch (error) {
    console.log(error.message)
    setRefresh(refresh + 1)
  }
};


const handleClose = () => {
    setDiocese_code("")
    setDistributor_code("")
    setDiocese_name("")
    setCounty("")
    setSub_county("")
    setOpen(false)
    setTimeout(() => {
      setRefresh(refresh + 1)
    }, 2000)
  }

const handleUpdate = (e,diocese_code,distributor_code,diocese_name,county,sub_county,id)=>{
  setDiocese_id(id)

handleClickOpen(e,diocese_code,distributor_code,diocese_name,county,sub_county)
}

const handleClickOpen = (e, diocese_code,distributor_code,diocese_name,county,sub_county)=>{
  setDiocese_code(diocese_code)
  setDistributor_code(distributor_code)
  setDiocese_name(diocese_name)
  setCounty(county)
  setSub_county(sub_county)
  setOpen(true)
}


const dialogForm = () => {
  const handleAddClick = () => {
    if(diocese_id === ""){
      const body = {
        diocese_code,
        distributor_code,
        diocese_name,
        county,
        sub_county
      }
 postDiocese(body)
 console.log(body)

 handleClose()
    }else{
      const body = {
        diocese_code,
        distributor_code,
        diocese_name,
        county,
        sub_county
      }
updateDiocese(body,diocese_id)
console.log(diocese_id)
console.log(body)

handleClose()
    }
  }

  return (
    <div>
    <Button variant="outlined" typography="h5" onClick={e => handleClickOpen(e, "", "","","","")}>
     Add Diocese
    </Button>
    <Dialog open={open} onClose={handleClose}>
     
        <h3>Add A New Diocese</h3>
        <form > 
        <div className='space'>
          
     <div className='in_space'>
     <label>Diocese Code</label><br></br>
     <input
     type="text"
     name="diocese_code"
     required="required"
     value={diocese_code}
     placeholder='Enter Diocese Code'
     onChange={(e)=> setDiocese_code(e.target.value)}

     /><br></br></div>
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
     <label>Diocese Name</label><br></br>
     <input
     type="text"
     name="diocese_name"
     required="required"
     value={diocese_name}
     placeholder='Enter Diocese Name'
     onChange={(e)=> setDiocese_name(e.target.value)}

     /><br></br>
     </div>
     <div className='in_space'>
     <label>County</label><br></br>
     <input
     type="text"
     name="county"
     required="required"
     value={county}
     placeholder='Enter County'
     onChange={(e)=> setCounty(e.target.value)}

     /><br></br>
     </div>
    
     <div className='in_space'>
     <label>Sub County</label><br></br>
     <input
     type="text"
     name="sub_county"
     required="required"
     value={sub_county}
     placeholder='Enter Sub County'
     onChange={(e)=> setSub_county(e.target.value)}

     />
     </div>
      </div>
   
    
        </form>
      
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={e=> handleAddClick(e)}>Add</Button>
    
    </Dialog>
  </div>
  )
}
 
  return (
    <>
     <h3>Diocese</h3>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Diocese Id</TableCell>
            <TableCell>Diocese Code</TableCell>
            <TableCell>Distributor Code</TableCell>
            <TableCell>Diocese name</TableCell>
            <TableCell>County</TableCell>
            <TableCell>Sub County</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell className='centre'>Actions</TableCell>
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
          {dioceses && dioceses.map((diocese) => (
            <TableRow
              key={diocese.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {diocese.id}
              </TableCell>
              <TableCell align="right">{diocese.diocese_code}</TableCell>
              <TableCell align="right">{diocese.distributor_code}</TableCell>
              <TableCell align="right">{diocese.diocese_name}</TableCell>
              <TableCell align="right">{diocese.county}</TableCell>
              <TableCell align="right">{diocese.sub_county}</TableCell>
              <TableCell align="right">{diocese.created_at}</TableCell>
              <TableCell align="right">{diocese.updated_at}</TableCell>
        
              <TableCell className='float-container'> 
                 
                 <Button className='float-child' onClick={e => handleUpdate(e, diocese.diocese_code,diocese.distributor_code,diocese.diocese_name,diocese.county,diocese.sub_county,diocese.id)}><EditTwoTone /></Button>
                <DeleteTwoToneIcon  onClick={()=>deletePost(diocese.id)} />              
    
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
  </>
  );
}
export default Dioceses
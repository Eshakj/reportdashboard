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
import  { patchCustomer, postCustomer } from "./Forms/CustForm"
import CircularProgressWithLabel  from './loadingIcon';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoTone from "@material-ui/icons/EditTwoTone"





const Customers = () =>{
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState([false])
  const [customer_id, setCustomer_id] = useState("")
  const [refresh, setRefresh] = useState(0)
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("")
  const [church, setChurch] = useState("")
  const [diocese, setDiocese] = useState("")
  const [phone_number, setPhone_Number] = useState("")
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  )

  
  useEffect(() => {
    const fetchData=async()=>{
      setLoading(true)
      try{
        const response = await axios.get("http://localhost:5100/customers")
        console.log(response.data)
        setCustomers(response.data)
        setLoading(false)
      }catch(error){
        setLoading(false)
        console.log(error.message)
      }
    }
    fetchData()
    
  }, [refresh])
  
  // const handleTheme = () => {
  //   if( theme === "light"){
  //     setTheme("dark")
  //   }else{
  //     setTheme("light")
  //   }
  // }
  // useEffect(() => {
  //   localStorage.setItem('theme', theme);
  //   document.body.className = theme;
  // }, [theme]);

  const deletePost = async (customer_id) => {
    try {
    const response = await axios.delete(`http://localhost:5100/delete-customer/${customer_id}`);
 console.log(response)
 setRefresh(refresh +1)
      
    } catch (error) {
      console.log(error.message)
      setRefresh(refresh +1)
    }
  
 };


//  setting the names to nthn so that wen we open the diolog again it will be empty
 const handleClose = () => {
    setName("")
    setChurch("")
    setDiocese("")
    setPhone_Number("")
    setOpen(false);
    setTimeout(()=>
      setRefresh(refresh + 1)
      ,500)
  };
// here we get the customer by its id and open when we click update button
  const handleUpdate = (e, name, church, diocese, phone_number, id) => {
    setCustomer_id(id)

    handleClickOpen(e, name, church, diocese, phone_number)
  } 

  const handleClickOpen = (e, name, church, diocese, phone_number) => {
    setName(name)
    setChurch(church)
    setDiocese(diocese)
    setPhone_Number(phone_number)
    setOpen(true);
  };

 const dialogForm = () => {

  const handleAddClick = () => {
    if(customer_id === ""){

      const body = {
        name, 
        church, 
        diocese, 
        phone_number
      }
      postCustomer(body)
      console.log(body)
     
      // const func = await postCustomer(body)
      // response is the outcome(added successfully)
      // if(func.data === "Customer saved successfully"){
      //   console.log(func.data)
      // }else{
      //   alert("failed")
      // }
      // console.log(postCustomer)
      handleClose()
    }else{
      const body = {
        name, 
        church, 
        diocese, 
        phone_number
      }
      patchCustomer(body,customer_id)
      handleClose()
      
    }
  }
    return (
    <div>
      <Button variant="outlined"className='color' typography="h5" onClick={e => handleClickOpen(e, "", "","","","" )}>
       Add Customer
      </Button>
      <Dialog open={open} onClose={e => handleClose(e)}>
       
          <h3>Add A New Customer</h3>
          <form> 
          <div className='space'>
            
       <div className='in_space'>
       <label>Customer Name</label><br></br>
       <input
       type="text"
       name="name"  
       required="required"
       value={name}
       placeholder='Enter Customer Name'
       onChange={(e)=> setName(e.target.value)}

       /><br></br></div>
              <div className='in_space'>
       <label>Church</label><br></br>
       <input
       type="text"
       name="church"
       required="required"
       value= {church}
       placeholder='Enter Church'
       onChange={(e)=> setChurch(e.target.value)}

       /><br></br></div>
       <div className='in_space'>
       <label>Diocese</label><br></br>
       <input
       type="text"
       name="diocese"
       value = {diocese}
       required="required"
       placeholder='Enter Diocese'
       onChange={(e)=> setDiocese(e.target.value)}

       /><br></br>
       </div>
       <div className='in_space'>
       <label>Phone Number</label><br></br>
       <input
       type="text"
       name="phoneNumber"
       value={phone_number}
       required="required"
       placeholder='Enter Phone Number'
       onChange={(e)=> setPhone_Number(e.target.value)}

       />
       </div>
     </div> 
      
          </form>
        
          <Button onClick={()=>handleClose()}>Cancel</Button>
          <Button type="submit" onClick={e => handleAddClick(e)}>Add</Button>
      
      </Dialog>
    
    </div>
  );
 }



  return (
    <>
    <div className={`App ${theme}`}>
     <h3>Customers</h3>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Church</TableCell>
            <TableCell >Diocese</TableCell>
            <TableCell>Phone Number</TableCell>
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
          </TableRow> :<>
          {customers && customers.map((customer) => (
            <TableRow
              key={customer.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {customer.id}
              </TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.church}</TableCell>
              <TableCell>{customer.diocese}</TableCell>
              <TableCell>{customer.phone_number}</TableCell>
              <TableCell>{customer.created_at}</TableCell>
              <TableCell>{customer.updated_at}</TableCell>
              <TableCell className='float-container'> 
                 
                  <EditTwoTone onClick={e => handleUpdate(e, customer.name, customer.church,customer.diocese,customer.phone_number, customer.id)} />
                 <DeleteTwoToneIcon  onClick={()=>deletePost(customer.id)} />              
     
              </TableCell>
            </TableRow>
          ))}
          </>

          }
         
        </TableBody>
      </Table>
    </TableContainer>
    <br></br>
    {/* <Button onClick={handleTheme}>Toggle Theme</Button> */}

    {dialogForm()}
    </div>
  </>
  );
}
export default Customers
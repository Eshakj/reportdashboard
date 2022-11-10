import { useState } from 'react';
import axios from "axios"
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import EditTwoTone from "@material-ui/icons/EditTwoTone"

export default function Just() {
  const [open, setOpen] = useState(false);
  const [id ,setId] = useState("")
  const [name, setName] = useState("")
  const [church, setChurch] = useState("")
  const [diocese, setDiocese] = useState("")
  const [phone_number, setPhone_Number] = useState("")


 const sendDataToApi = async(id)=>{
  try {
    console.log(name,church,diocese,phone_number)
const response = await axios.patch(`http://localhost:5100/update-customer/${id}`,{
  name,
  church,
  diocese,
  phone_number
})
console.log(response)
alert("updated successfully")
  } catch (error) {
    console.error(error.message)
  }
  
 }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
     <EditTwoTone style={{color: "black"}}onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose}>
       
          <h3>Update Customer</h3>
          <form > 
          <div className='space'>
            
       <div className='in_space'>
       <label>Customer Name</label><br></br>
       <input
       type="text"
       name="name"
       required="required"
       placeholder='Enter Customer Name'
       onChange={(e)=> setName(e.target.value)}

       /><br></br></div>
       <div className='in_space'>
       <label>Church</label><br></br>
       <input
       type="text"
       name="church"
       required="required"
       placeholder='Enter Church'
       onChange={(e)=> setChurch(e.target.value)}

       /><br></br></div>
       <div className='in_space'>
       <label>Diocese</label><br></br>
       <input
       type="text"
       name="diocese"
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
       required="required"
       placeholder='Enter Phone Number'
       onChange={(e)=> setPhone_Number(e.target.value)}

       />
       </div>
     </div> 
      
          </form>
        
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={(id)=>sendDataToApi(id)}>Update</Button>
      
      </Dialog>
    </div>
  );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import "../pages/Forms/Forms.css"
import { useState , useEffect} from 'react';
import axios from "axios"


export default function Update() {
  const [open, setOpen] = React.useState(false);
  // const [contacts, setContacts] = React.useState(things);
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [church, setChurch] = useState("")
  const [diocese, setDiocese] = useState("")
  const [phone_number, setPhone_Number] = useState("")
  const [ID, setID] = useState(null)


 const updateDataToApi = async (customer_id)=>{
  try {
  const response = await axios.put(`http://localhost:5500/update-customer/${customer_id}`)
    console.log(response)
    alert("updated succesfully")
  } catch (error) {
    console.error(error.message)
  }
   }
  
    
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    // event.preventDefault()
    setOpen(false);
  };
  return (
    <div>
      {/* <Button variant="outlined" typography="h5" onClick={handleClickOpen}>
        Edit Table Data
  </Button>*/}
      <Dialog open={open} onClose={handleClose}> 
       
          <h3>Add A New Customer</h3>
          <form > 
          <div className='space'>
            <div className='in_space'>
          <label>Customer ID</label><br></br>
          <input
          value={id}
       type="text"
       name="customerID"
       required="required"
       placeholder='Enter Customer ID'
       onChange={(e)=> setId(e.target.value)}
       /> <br></br></div>
       <div className='in_space'>
       <label>Customer Name</label><br></br>
       <input
       value={name}
       type="text"
       name="name"
       required="required"
       placeholder='Enter Customer Name'
       onChange={(e)=> setName(e.target.value)}

       /><br></br></div>
       <div className='in_space'>
       <label>Church</label><br></br>
       <input
       value={church}
       type="text"
       name="church"
       required="required"
       placeholder='Enter Church'
       onChange={(e)=> setChurch(e.target.value)}

       /><br></br></div>
       <div className='in_space'>
       <label>Diocese</label><br></br>
       <input
       value={diocese}
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
       value={phone_number}
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
          <Button type="submit" onClick={updateDataToApi}>Update</Button>
      
      </Dialog>
    </div>
  );
}


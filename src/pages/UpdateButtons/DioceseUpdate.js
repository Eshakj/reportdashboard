import React from 'react'
import EditTwoTone from "@material-ui/icons/EditTwoTone"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useState } from "react";
import axios from "axios"




const DioceseUpdate = () => {
const [id, setId] = useState("")
 const [diocese_code, setDiocese_code] = useState("")
const [distributor_code, setDistributor_code] = useState("")
const [diocese_name, setDiocese_name] = useState("")
const [county, setCounty] = useState("")
const [sub_county, setSubCounty] = useState("")
const [open, setOpen] = useState(false);



const sendDataToApi = async(id)=>{
    try {
      console.log(diocese_code, distributor_code,diocese_name,county,sub_county)
  const response = await axios.patch(`http://localhost:5100/update-diocese/${id}`,{
    diocese_code,
     distributor_code,
     diocese_name,
     county,
     sub_county
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

  const handleClose = (event) => {
    // event.preventDefault()
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
       onChange={(e)=> setDiocese_code(e.target.value)}

       /><br></br></div>
       <div className='in_space'>
       <label>Church</label><br></br>
       <input
       type="text"
       name="church"
       required="required"
       placeholder='Enter Church'
       onChange={(e)=> setDistributor_code(e.target.value)}

       /><br></br></div>
       <div className='in_space'>
       <label>Diocese</label><br></br>
       <input
       type="text"
       name="diocese"
       required="required"
       placeholder='Enter Diocese'
       onChange={(e)=> setDiocese_name(e.target.value)}

       /><br></br>
       </div>
       <div className='in_space'>
       <label>Phone Number</label><br></br>
       <input
       type="text"
       name="phoneNumber"
       required="required"
       placeholder='Enter Phone Number'
       onChange={(e)=> setCounty(e.target.value)}

       />
       </div>
       <div className='in_space'>
       <label>Phone Number</label><br></br>
       <input
       type="text"
       name="phoneNumber"
       required="required"
       placeholder='Enter Phone Number'
       onChange={(e)=> setSubCounty(e.target.value)}

       />
       </div>
     </div> 
      
          </form>
        
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={(id)=>sendDataToApi(id)}>Update</Button>
      
      </Dialog>
    </div>
  )
}

export default DioceseUpdate

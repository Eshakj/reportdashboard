import "../Forms/Forms.css"
import axios from "axios"

export const postCustomer = async ( body) => {
  try {
    console.log(body)
    const response = await axios.post("http://localhost:5100/add-customer", body)
    alert("added successfully")
   
    // return response
  } catch (error) {
    console.error(error.message)
  }
  
}

export const  patchCustomer = async(body,customer_id)=>{
  try {
    console.log(body)
const response = await axios.patch(`http://localhost:5100/update-customer/${customer_id}`,body
)
console.log(response)
alert("updated successfully")
  } catch (error) {
    console.error(error.message)
  }
  
 }

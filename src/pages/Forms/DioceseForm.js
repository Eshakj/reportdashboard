import "../Forms/Forms.css"
import axios from 'axios';




export const postDiocese = async (body)=>{
try {
  console.log(body)
  const response = await axios.post("http://localhost:5100/add-diocese", body)
  alert("added successfully")
  // return response
} catch (error) {
  console.error(error.message)
}
}

export const updateDiocese = async(body,diocese_id) =>{
  try {
    console.log(body)
    const response = await axios.patch(`http://localhost:5100/update-diocese/${diocese_id}`,body)
    console.log(response)
alert("updated successfully")
  } catch (error) {
    console.error(error.mesage)
  }
}

 
 



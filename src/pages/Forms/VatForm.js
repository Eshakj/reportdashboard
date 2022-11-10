import axios from "axios"



export const postVat = async(body)=>{
    try {
        const response = await axios.post("http://localhost:5100/add-vat",body)
    alert("added successfully")

        return response
    } catch (error) {
        console.error(error.message)
    }
   
}

export const patchVat = async(body,vat_id) =>{
    try {
        console.log(body)
        const response = await axios.patch(`http://localhost:5100/update-vat/${vat_id}`,body)
        console.log(response)
        alert("updated successfully")
    } catch (error) {
        console.error(error.message)
    }
}
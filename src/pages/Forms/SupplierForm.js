import axios from "axios"

export const postSupplier = async(body)=>{
    try {
        console.log(body)
        const response = await axios.post("http://localhost:5100/add-supplier",body)
        alert("added successfully")
        return response
    } catch (error) {
        console.error(error.message)
    }
}


export const patchSupplier = async(body,supplier_id)=>{
    try {
        const response = await axios.patch(`http://localhost:5100/update-supplier/${supplier_id}`,body)
        console.log(response)
        return response
    } catch (error) {
        console.error(error.message)
    }
}
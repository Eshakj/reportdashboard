import axios from "axios"

export const postDistributorIt = async (body) =>{
    try {
        const response = await axios.post("http://localhost:5100/add-distributorinvoicetxn", body)
        console.log(body)
        console.log(response)
        alert("Added successfully")
    } catch (error) {
        console.error(error.message)
    }
}

export const patchDistributorIt = async (body, distributor_id) => {
    try {
        const response = await axios.patch(`http://localhost:5100/update-distributorinvoicetxn/${distributor_id}`, body)
        console.log(response)
        alert("updated successfully")
    } catch (error) {
        console.error(error.message)
    }
}
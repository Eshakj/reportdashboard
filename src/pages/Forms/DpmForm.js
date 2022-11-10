import axios from "axios"

export const postDpm = async (body) => {
    try {
        const response = await axios.post("http://localhost:5100/add-distributorpaymentmaster",body)
        console.log(body)
        console.log(response)
        alert("successful")
    } catch (error) {
        console.error(error.message)
    }
}

export const patchDpm = async (body,distributor_id) => {
    try {
        const response = await axios.post(`http://localhost:5100/update-distributorpaymentmaster/${distributor_id}`,body)
        console.log(body)
        console.log(response)
        alert("successful")
    } catch (error) {
        console.error(error.message)
    }
}
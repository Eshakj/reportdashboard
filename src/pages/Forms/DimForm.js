import axios from "axios"

export const postDim = async(body) => {
    try {
        const response = await axios.post("http://localhost:5100/add-dim",body)
        console.log(response)
        alert("succesfful")
    } catch (error) {
        console.error(error.message)
        alert("somethings wrong")
    }
}

export const patchDim = async (body,dim_id) => {
    try {
        const response = await axios.patch(`http://localhost:5100/update-dim/${dim_id}`,body)
        console.log(response)
        alert("successful")
    } catch (error) {
        console.error(error.message)
        alert("somethings wrong")

    }
}
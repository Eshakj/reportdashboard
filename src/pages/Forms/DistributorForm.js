import axios from "axios"

export const postDistributor = async (body) => {
    try {

        console.log(body)
        const response = await axios.post("http://localhost:5100/add-distributor", body)
        alert("added succesffully")
        console.log(response)
    } catch (error) {
        console.error(error.message)
    }
}

export const patchDistributor = async (body,distributor_id) => {
    try {
        const response = await axios.patch(`http://localhost:5100/update-distributor/${distributor_id}`,body)
        alert("updated succesffully")
        console.log(response)
    } catch (error) {
        console.error(error.message)
    }
}
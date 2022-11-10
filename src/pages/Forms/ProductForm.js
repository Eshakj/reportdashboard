import axios from "axios"

export const postProduct =async (body) => {
  try {
    const response = await axios.post("http://localhost:5100/add-product",body)
    console.log(body)
    alert("successful")
   } catch (error) {
  console.error(error.message)
  alert("wrong")

  }
}

export const patchProduct =async (body,product_id) => {
  try {
    const response = await axios.post(`http://localhost:5100/update-product/${product_id}`,body)
    console.log(body)
    alert("successful")
   } catch (error) {
  console.error(error.message)
  alert("wrong")

  }
}
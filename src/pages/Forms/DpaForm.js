import axios from "axios"


export const postDpa = async (payment_id,invoice_sub_number,amount_allocated)=>{
    try {
        console.log(payment_id,invoice_sub_number,amount_allocated)
        const response = await axios.post('http://localhost:5100/add-dpa',{
            payment_id,
            invoice_sub_number,
            amount_allocated 
        })
        alert("added successfully")
        return response
    } catch (error) {
        console.error(error.message)
    }
}

export const updateDpa = async(id,payment_id,invoice_sub_number,amount_allocated)=>{
    try {
        console.log(id,payment_id,invoice_sub_number,amount_allocated)
        const response = await axios.post(`http://localhost:5100/add-dpa/${id}`,{
            payment_id,
            invoice_sub_number,
            amount_allocated 
        })
        alert("updated successfully")
    } catch (error) {
        console.error(error.message)
    }
}
import axios from 'axios'
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import EditTwoTone from "@material-ui/icons/EditTwoTone"

const ProductUpdate = () => {
    const [open , setOpen] = useState(false)
    const [id , setId] = useState(false)
    const [product_code , setProduct_code] = useState(false)
    const [product_name , setProduct_name] = useState(false)
    const [product_cost_price , setProduct_cost_price] = useState(false)
    const [product_sell_price , setProduct_sell_price] = useState(false)
    const [product_vat , setProduct_vat] = useState(false)
    const [product_deposit , setProduct_deposit] = useState(false)
    const [product_installment_amount , setProduct_installmentproduct_installment_amount] = useState(false)
    const [product_installment_count , setProduct_installment_count] = useState(false)


const sendDataToApi = async()=>{
    try {
    console.log( product_code,product_name,product_cost_price,product_sell_price,product_vat,product_deposit,product_installment_amount,product_installment_count)

        const response = await axios.patch(`http//:localhost:5100/add-product/${id}`, {
            product_code,
            product_name,
            product_cost_price,
            product_sell_price,
            product_vat,
            product_deposit,
            product_installment_amount,
            product_installment_count
        })
        console.log(response)
alert("updated successfully")
    } catch (error) {
        console.error(error.message)
    }
}


const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
     <EditTwoTone style={{color: "black"}}onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose}>
       
          <h3>Update Product</h3>
          <form > 
          <div className='space'>
            
       <div className='in_space'>
       <label>Product Code</label><br></br>
       <input
       type="text"
       name="product_code"
       required="required"
       placeholder='Enter Product Code'
       onChange={(e)=> setProduct_code(e.target.value)}

       /><br></br></div>
       <div className='in_space'>
       <label>Product Name</label><br></br>
       <input
       type="text"
       name="product_name"
       required="required"
       placeholder='Enter Product Name'
       onChange={(e)=> setProduct_name(e.target.value)}

       /><br></br></div>
       <div className='in_space'>
       <label>Product Cost Price</label><br></br>
       <input
       type="text"
       name="product_cost_price"
       required="required"
       placeholder='Enter Product Cost Price'
       onChange={(e)=> setProduct_cost_price(e.target.value)}

       /><br></br>
       </div>
       <div className='in_space'>
       <label>Product Vat</label><br></br>
       <input
       type="text"
       name="product_vat"
       required="required"
       placeholder='Enter Product Vat'
       onChange={(e)=> setProduct_vat(e.target.value)}

       />
       </div>

       <div className='in_space'>
       <label>Product Deposit</label><br></br>
       <input
       type="text"
       name="product_deposit"
       required="required"
       placeholder='Enter Product Deposit'
       onChange={(e)=> setProduct_deposit(e.target.value)}

       />
       </div>

       </div>


       <div className='in_space'>
       <label>Product Installment Amount</label><br></br>
       <input
       type="text"
       name="product_installment_amount"
       required="required"
       placeholder='Enter Product Installment Amount'
       onChange={(e)=> setProduct_installmentproduct_installment_amount(e.target.value)}

       />
       </div>
       <div className='in_space'>
       <label>Product Installment Count</label><br></br>
       <input
       type="text"
       name="product_installment_count"
       required="required"
       placeholder='Enter Product Installment Count'
       onChange={(e)=> setProduct_installment_count(e.target.value)}

       />

     </div> 
      
          </form>
        
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={(id)=>sendDataToApi(id)}>Update</Button>
      
      </Dialog>
    </div>
  )
}

export default ProductUpdate
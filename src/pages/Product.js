// import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@material-ui/core/Paper'
import axios from "axios"
import { useState, useEffect } from 'react';
import CircularProgressWithLabel  from './loadingIcon';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Button } from '@mui/material';
import '../../src/App.css'
import ProductUpdate from './UpdateButtons/ProductUpdate';
import { patchProduct, postProduct } from './Forms/ProductForm';
import Dialog from '@mui/material/Dialog';





const Product = () => {

const [products, setProducts] = useState([])
const [loading, setLoading] = useState([false])
const [refresh, setRefresh] = useState(0)
const [id,setId] = useState("")
const [open, setOpen] = useState(false);
const [product_code, setProduct_code] = useState("")
const [product_name, setProduct_name] = useState("")
const [product_cost_price, setProduct_cost_price] = useState("")
const [product_sell_price, setProduct_sell_price] = useState("")
const [product_vat, setProduct_vat] = useState("")
const [product_deposit, setProduct_deposit] = useState("")
const [product_installment_amount, setProduct_installment_amount] = useState("")
const [product_installment_count, setProduct_installment_count] = useState("")
// const [product_code, setProduct_code] = useState("")

useEffect(() => {
  const fetchData=async()=>{
    setLoading(true)
    try{
  const response = await axios.get("http://localhost:5100/products")
  console.log(response.data)
  setProducts(response.data)
  setLoading(false)
    }catch(error){
      setLoading(false)
      console.log(error.message)
    }
  }
 fetchData()

}, [refresh])
const handleClose = () =>{
  product_code("")
  product_name("")
  product_cost_price("")
  product_sell_price("")
  product_vat("")
  product_deposit("")
  product_installment_amount("")
  product_installment_count("")
  setOpen(false)
}
const handleOpen = (product_code,product_name,product_cost_price,product_sell_price,product_vat,product_deposit,product_installment_amount,product_installment_count) =>{
  setProduct_code(product_code)
  setProduct_name(product_name)
  setProduct_cost_price(product_cost_price)
  setProduct_sell_price(product_sell_price)
  setProduct_vat(product_vat)
  setProduct_deposit(product_deposit)
  setProduct_installment_amount(product_installment_amount)
  setProduct_installment_count(product_installment_count)
  setOpen(false)
}

const deletePost = async (id) => {
  try {
  const response = await axios.delete(`http://localhost:5100/delete-product/${id}`);
console.log(response)
setRefresh(refresh + 1)
    
  } catch (error) {
    console.log(error.message)
  }

};


const dialogForm = () => {
  const dialog = () => {
  if(id === ""){
const body = {
  product_code,
  product_name,
  product_cost_price,
  product_sell_price,
  product_vat,
  product_deposit,
  product_installment_amount,
  product_installment_count
}
postProduct(body)
console.log(body)
handleClose()
  }else{
    const body = {
      product_code,
      product_name,
      product_cost_price,
      product_sell_price,
      product_vat,
      product_deposit,
      product_installment_amount,
      product_installment_count
    }
    patchProduct(body,id)
    console.log(body)
    handleClose()
  }
  }
 return (
  <div>
    <Button variant="outlined" typography="h5" onClick={handleOpen}>
     Add Product
    </Button>
    <Dialog open={open} onClose={handleClose}>
     
        <h3>Add A New Product</h3>
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
     /> <br></br></div>
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

     /><br></br></div>
     <div className='in_space'>
     <label>Product Sell Price</label><br></br>
     <input
     type="text"
     name="product_sell_price"
     required="required"
     placeholder='Enter Product Sell Price'
     onChange={(e)=> setProduct_sell_price(e.target.value)}

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

     <br></br>
    <div className='in_space'>
     <label>Product Deposit</label><br></br>
     <input
     type="text"
     name="product_deposit"
     required="required"
     placeholder='Enter Product Deposit'
     onChange={(e)=> setProduct_deposit(e.target.value)}

     /></div>

<br></br>
    <div className='in_space'>
     <label>Product Installment Amount</label><br></br>
     <input
     type="text"
     name="product_installment_amount"
     required="required"
     placeholder='Enter Product Installment Amount'
     onChange={(e)=> setProduct_installment_amount(e.target.value)}

     /></div>

<br></br>
    <div className='in_space'>
     <label>Product Installment Count</label><br></br>
     <input
     type="text"
     name="product_installment_count"
     required="required"
     placeholder='Enter Product Installment Count'
     onChange={(e)=> setProduct_installment_count(e.target.value)}

     /></div>

   </div> 
    
        </form>
      
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={dialog}>Add</Button>
    
    </Dialog>
  </div>
);
}

  return (
    <>
     <h3>Products</h3>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Id</TableCell>
            <TableCell>Product Code</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Product Cost Price</TableCell>
            <TableCell>Product Sell Price</TableCell>
            <TableCell>Product VAT</TableCell>
            <TableCell>Product Deposit</TableCell>
            <TableCell>Product Installment Amount</TableCell>
            <TableCell>Product Installment Count</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell className='centre'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { 
              loading ? 
              <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">

               <CircularProgressWithLabel />
              </TableCell>
              
              </TableRow>: <>
              {products && products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.id}
              </TableCell>
              <TableCell align="right">{product.product_code}</TableCell>
              <TableCell align="right">{product.product_name}</TableCell>
              <TableCell align="right">{product.product_cost_price}</TableCell>
              <TableCell align="right">{product.product_sell_price}</TableCell>
              <TableCell align="right">{product.product_vat}</TableCell>
              <TableCell align="right">{product.product_deposit}</TableCell>
              <TableCell align="right">{product.product_installment_amount}</TableCell>
              <TableCell align="right">{product.product_installment_count}</TableCell>
              <TableCell align="right">{product.created_at}</TableCell>
              <TableCell align="right">{product.updated_at}</TableCell>
              


              <TableCell className='float-container'> 
  
              <Button className='float-child'><ProductUpdate /></Button>
                 <DeleteTwoToneIcon  onClick={()=>deletePost(product.id)} />              

              </TableCell>
            </TableRow>
          ))}
              </>
          }
         
        </TableBody>
      </Table>
    </TableContainer>
    {dialogForm()}
  </>
  )
}

export default Product
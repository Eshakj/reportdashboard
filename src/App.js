import './App.css'
import Dashboard from './pages/Dashboard'
import Distributors from './pages/Distributors'
import Diocese from './pages/Dioceses'
import { Routes, Route } from 'react-router-dom'
import LayoutNav from './components/LayoutNav'
import Product from './pages/Product'
import Customers from './pages/Customers'
// import Customer4 from './pages/Customer4'
// import Customers from './pages/Customers'
import DistributorInvoiceMaster from './pages/DistributorInvoiceMaster'
import VatMaster from './pages/VatMaster'
import DistributorsPaymentMaster from './pages/DistributorsPaymentMaster'
import DistributorsPaymentAllocation from './pages/DistributorsPaymentAllocation'
import DistributorsInvoiceTxn from './pages/DistributorsInvoiceTxn'
import Update from "../src/pages/Update"
import Delete from "../src/pages/Delete"
import Supplier from './pages/Supplier'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutNav />}>
          <Route index element={<Dashboard />} />
          <Route exact path='/distributors' element={<Distributors />} />
          <Route exact path='/customers' element={<Customers />} />
          <Route exact path='/diocese' element={<Diocese />} />
          <Route exact path='/suppliers' element={<Supplier />} />
          <Route exact path='/products' element={<Product />} />
           <Route exact path='/distributorsinvoicemaster' element={<DistributorInvoiceMaster />} /> 
           <Route exact path='/distributorsinvoicetxn' element={<DistributorsInvoiceTxn />} /> 
           <Route exact path='/distributorspaymentallocation' element={<DistributorsPaymentAllocation />} /> 
           <Route exact path='/distributorspaymentmaster' element={<DistributorsPaymentMaster />} /> 
           <Route exact path='/vatmaster' element={<VatMaster />} /> 
          <Route exact path="/update" element={<Update />}/>
          <Route exact path="/delete" element={<Delete />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App

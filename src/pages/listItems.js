import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// import ListSubheader from '@material-ui/core/ListSubheader'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
// import BarChartIcon from '@material-ui/icons/BarChart'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

// import AssignmentIcon from '@material-ui/icons/Assignment'
import { Link } from 'react-router-dom'
export const mainListItems = (


  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <ListItemText primary='Dashboard' />
      </Link>
    </ListItem>
    <ListItem button>
    <ListItemIcon>
      <PeopleIcon />
        
      </ListItemIcon>
      <Link to='/customers' style={{ textDecoration: 'none' }}>
        {' '}
        <ListItemText primary='Customers' />
      </Link>
    </ListItem>
    <ListItem button>
    <ListItemIcon>
      <ShoppingCartIcon />
      </ListItemIcon>
      <Link to='/diocese' style={{ textDecoration: 'none' }}>
        {' '}
        <ListItemText primary='Dioceses' />
      </Link>
    </ListItem>
    <ListItem button>
    <ListItemIcon>
      <ShoppingCartIcon />
      </ListItemIcon>
      <Link to='/products' style={{ textDecoration: 'none' }}>
        <ListItemText primary='Product' />
      </Link>
    </ListItem>
    <ListItem button>
    <ListItemIcon>
        <AccountTreeIcon />
      </ListItemIcon>
      <Link to='/suppliers' style={{ textDecoration: 'none' }}>
        <ListItemText primary='Suppliers' />
      </Link>
    </ListItem>
    <ListItem button>
    <ListItemIcon>
        <DepartureBoardIcon />
      </ListItemIcon>
      <Link to='/distributors' style={{ textDecoration: 'none' }}>
        <ListItemText primary='Distributor' />
      </Link>
    </ListItem>
    <ListItem button>
    <ListItemIcon>
        <EmojiPeopleIcon />
      </ListItemIcon>
      <Link to='/distributorsinvoicetxn' style={{ textDecoration: 'none' }}>
        <ListItemText primary='Distributers Invoice Txn' />
      </Link>
    </ListItem>
    <ListItem button>
    <ListItemIcon>
        <EmojiPeopleIcon />
      </ListItemIcon>
      <Link to='/distributorspaymentallocation' style={{ textDecoration: 'none' }}>
        <ListItemText primary='Distributors Payment Allocation' />
      </Link>
    </ListItem>
    <ListItem button>
    <ListItemIcon>
        <EmojiPeopleIcon />
      </ListItemIcon>
      <Link to='/distributorspaymentmaster' style={{ textDecoration: 'none' }}>
        <ListItemText primary='Distributors Payment Master' />
      </Link>
    </ListItem>
    <ListItem button>
    <ListItemIcon>
        <EmojiPeopleIcon />
      </ListItemIcon>
      <Link to='/vatmaster' style={{ textDecoration: 'none' }}>
        <ListItemText primary='VAT Master' />
      </Link>
    </ListItem>
    <ListItem button>
    <ListItemIcon>
        <EmojiPeopleIcon />
      </ListItemIcon>
      <Link to='/distributorsinvoicemaster' style={{ textDecoration: 'none' }}>
        <ListItemText primary='Distributors Invoice Master' />
      </Link>
    </ListItem>
   
  
  </div>
)




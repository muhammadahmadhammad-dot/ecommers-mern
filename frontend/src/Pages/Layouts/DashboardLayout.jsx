import React from 'react'
import Navbar from '../../Components/Navbar'
import {Outlet} from 'react-router-dom'
import Topbar from '../../Components/Dashboard/Topbar'
const DashboardLayout = () => {
  return (
    <>
    <Topbar />
    <Outlet />
   </>
  )
}

export default DashboardLayout
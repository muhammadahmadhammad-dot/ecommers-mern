import React from 'react'
import {useSelector} from "react-redux"
import { Navigate } from 'react-router-dom'

const ProtectAdminPage = ({children}) => {
    const isLoginedIn = useSelector((state)=>state.auth.user ? true : false)
    const isAdmin = useSelector((state)=>state.auth.user?.role == true ? true : false)

     if (isLoginedIn && isAdmin) {
      return <>{children}</>
      ;
    }

  return (
   <Navigate to="/dashboard/login" replace />
  )
}

export default ProtectAdminPage
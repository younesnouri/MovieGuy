import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
export const PrivateRoutes = () => {
    
    const {user} = useAuth()
    
  return (

    user.auth ? <Outlet/> : <Navigate to = "/login1"/>
  )
}



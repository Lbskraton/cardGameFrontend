import { createContext, useContext, useEffect, useState } from "react";

import User from "../models/User";

import { loginUser } from "../services/auth.service";

const API_URL_BASE=import.meta.env.VITE_API_URL_BASE+'/auth'

//interfaz de datos del jwt, alternativa  a partial<User>
/*
interface UserPayLoad{ 
  id:number
  email:string
  role:string
}
*/
interface AuthContextType{
  user:Partial<User> | null
  isAuthenticated:boolean
  isAdmin:boolean
  login: (email:string, password:string)=>Partial<User> | null | Promise<void>
  logout:()=>void
}


const AuthContext=createContext<AuthContextType | null>(null)

export function AuthProvider({children}:{children:React.ReactNode}){

  useEffect(()=>{
    async function callBack(){
      const response=await fetch(API_URL_BASE+'/user',{credentials:"include"})
      const data=await response.json()
      console.log(data)
      setUser(data)

    }
    callBack()
    
    
  },[])

  const [user,setUser]=useState<Partial<User> | null>(null)

  const login=async (email:string,password:string)=>{

    try{
      const a = await loginUser(email, password)
      const response = await fetch(API_URL_BASE+'/user', {credentials: 'include'}) //necesito esta llamada, no puedo desencriptar token
      if (!response.ok) throw new Error("No autenticado");

      

      const data = await response.json()
      console.log('Usuario logueado:', data)
      console.log('Usuario logueado token:', a)
      setUser(data)

      console.log("El role del contexto"+user?.role)
  }catch(error){
      console.error("Error en el login:", error);
      throw new Error("Error en el login")
  }
      
  }

  const logout=async ()=>{
    console.log("logout, "+API_URL_BASE+'/logout')
    await fetch(API_URL_BASE+'/logout',{method:'POST',credentials:"include"})
    setUser(null)
  }

  

  return <AuthContext.Provider value={{user,login,logout,isAdmin: user?.role==='admin', isAuthenticated: !!user}}>
    {children}
  </AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if(!context) {
      console.warn("useAuth se está usando fuera del AuthProvider");
      return { user: null, isAuthenticated: false, isAdmin: false, login: () => {}, logout: () => {} };
  }
  return context
}

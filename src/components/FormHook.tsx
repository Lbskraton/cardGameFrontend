import { ChangeEvent, useState } from 'react'



function useFormHook<T >(initialform:T) {

   //Estados
   const [datosForm,setDatosForm]=useState(initialform)
   const [formError,setFormError]=useState('')
   const [formLoading,setFormLoading]=useState(false)

   //Control formulario

   const handleChange=(e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>{
       
       const {value,name}=e.target
       setDatosForm((prevForm) => ({
        ...prevForm,
        [name]: value
      }));
       
     }

     const handleChangeCheckbox=(e:ChangeEvent<HTMLInputElement>)=>{
       
        const {checked,name}=e.target
        setDatosForm((prevForm) => ({
         ...prevForm,
         [name]: checked
       }));
        
      }

     const formReset=()=>{setDatosForm(initialform)}

     return { datosForm,handleChange,handleChangeCheckbox,setDatosForm,formError,setFormError,formLoading,setFormLoading,formReset}
}

export default useFormHook

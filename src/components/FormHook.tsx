import { ChangeEvent, useState } from 'react'



function useFormHook<T >(initialform:T) {

   //Estados
   const [datosForm,setDatosForm]=useState(initialform)
   const [formError,setFormError]=useState('')
   const [formLoading,setFormLoading]=useState(false)

   //Control formulario

   const handleChange=(e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>{
       
       const {value,name,type}=e.target
       setDatosForm((prevForm) => ({
        ...prevForm,
        [name]: type === "number" ? (value === "" ? undefined : Number(value)) : value
      }));
       
     }

     const handleChangeCheckbox=(e:ChangeEvent<HTMLInputElement>)=>{
       
        const {checked,name}=e.target
        setDatosForm((prevForm) => ({
         ...prevForm,
         [name]: checked
       }));
        
      }

      //En pruebas
      const handleChangeSelected=(e:ChangeEvent<HTMLSelectElement>)=>{
         const selected = Array.from(e.target.selectedOptions, option => Number(option.value));
        setDatosForm({ ...datosForm, gameTypeIds: selected });
      }

     const formReset=()=>{setDatosForm(initialform)}

     return { datosForm,handleChange,handleChangeCheckbox,handleChangeSelected,setDatosForm,formError,setFormError,formLoading,setFormLoading,formReset}
}

export default useFormHook

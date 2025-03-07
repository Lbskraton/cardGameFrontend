import { FormEvent, useState } from "react"
import useFormHook from "../components/FormHook"
import InputForm from "../components/InputForm"
import { registerUser } from "../services/auth.service"
import MessageCard from "../components/MessageCard"


function Register() {

  const { datosForm, handleChange, formError } = useFormHook({ name: "", email: "", password: "", repeatPassword: "", accepNotifications: true })
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const { repeatPassword, ...restobj } = datosForm
      console.log(repeatPassword)
      console.log(restobj)
      await registerUser(restobj)
      setMessage("Resgister succesful")
      //redirigir a otra pagina
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error desconocido"
      setMessage(msg)

    }

  }


  return (
    <>


      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <br />

        <InputForm name="name" text="name" handleChange={handleChange} error={formError}></InputForm>

        <InputForm name="email" text="email" handleChange={handleChange} error={formError}></InputForm>

        <InputForm name="password" text="password" handleChange={handleChange} error={formError}></InputForm>

        <InputForm name="repeatPassword" text="repeatPassword" handleChange={handleChange} error={formError}></InputForm>




        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
          </div>
          <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
      </form>

      {message ? <MessageCard text={message} type="hearts"></MessageCard> : <div></div>}


    </>
  )
}

export default Register

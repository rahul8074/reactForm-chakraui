import { useState,useRef } from 'react'
import './App.css'
import UserDetails from './Forms/UserDetails'
import ShowFormDetails from './Forms/ShowFormDetails'

function App() {
  const ref = useRef<any>(null)
  const [show, setShow] = useState(false)
  const [formData,setFormData] = useState("");

  const onFormSubmit = () => {
    const formData = ref.current.getFormData();
    setFormData(formData)
    if (formData) {
      setShow(true)
    }
    console.log("formData values::",formData)
  }

  return (
   <>
    <UserDetails  ref={ref} onFormSubmit= {onFormSubmit}/>
    {show &&  <ShowFormDetails formData={formData}/>}
   </>
  )
}

export default App

import { useState, useEffect } from 'react'
import { database } from "../../firebase"
import { useAuth } from "../../Contexts/AuthContext"
import InitialData from '../Dnd/InitialData'

export function useData(userId) {
  const [tasks, setTasks] = useState(null)
  const [columns, setColumns] = useState(null)
  const [final, setFinal] = useState(null)
  
  const {currentUser} = useAuth()
  
  useEffect(() => {
    console.log(3)

    return () => { //cleanup function

    }
  }, []) //if value in bracket changes, run effect function
  



  return { state: final, setState: setFinal } //state displayed in Dnd component
}
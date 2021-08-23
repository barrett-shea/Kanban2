import { useState, useEffect } from 'react'
import { database } from "../../firebase"
import { useAuth } from "../../Contexts/AuthContext"
import InitialData from '../Dnd/InitialData'

//read data from database and send to state in Dnd component 

const useData = (currentUser) => {
  const [tasks, setTasks] = useState(null)
  const [columns, setColumns] = useState(null)
  const [final, setFinal] = useState(null)
  
  useEffect(() => {
    return database.tasks
      .where('userId', '==', currentUser.uid)
        .onSnapshot(snap => {
          const documents = {}
          snap.forEach(d => {
            documents[d.data().id] = d.data()
          })
          setTasks(documents)
          
      })
    }, [currentUser])
  
  useEffect(() => {
    return database.columns
      .where('userId', '==', currentUser.uid)
        .onSnapshot(snap => {
          const documents = {}
          snap.forEach(d => {
            documents[d.data().id] = d.data()
          })
          setColumns(documents)
          
      })
    }, [currentUser])
  
  useEffect(() => {
    if (tasks && columns) { 
      const finalObject = {}
      
      
      finalObject.tasks = tasks
      finalObject.columns = columns

      finalObject.columnOrder = ['column1', 'column2', 'column3', 'column4']
      
      setFinal(finalObject)
      
    }
  }, [tasks, columns])
  
  return { state: final, setState: setFinal }
  
}

export default useData
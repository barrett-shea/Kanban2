import { useState, useEffect } from 'react'
import { database, firestore } from "../../firebase"
import { useAuth } from "../../Contexts/AuthContext"
import InitialData from '../Dnd/InitialData'

//read data from database and send to state in Dnd component 

const useData = (currentUser) => {
  const [tasks, setTasks] = useState(null)
  const [columns, setColumns] = useState(null)
  const [final, setFinal] = useState(null)
  
  useEffect(() => {
    return firestore.collection("users").doc(currentUser.uid).collection("tasks")
        .onSnapshot(snap => {
          const documents = {}
          snap.forEach(d => {
            documents[d.data().id] = d.data()
          })
          setTasks(documents)
          
      })
    }, [currentUser])
  
  useEffect(() => {
    return firestore.collection("users").doc(currentUser.uid).collection("columns")
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
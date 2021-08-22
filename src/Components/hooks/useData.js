import { useState, useEffect } from 'react'
import { database } from "../../firebase"
import { useAuth } from "../../Contexts/AuthContext"
import InitialData from '../Dnd/InitialData'

//read data from database and send to state in Dnd component 

const useData = (currentUser) => {
  const [tasks, setTasks] = useState(null)
  const [columns, setColumns] = useState(null)
  const [final, setFinal] = useState(InitialData)
  
  useEffect(() => {
    return database.tasks
      .where('userId', '==', currentUser.uid)
        .onSnapshot(snap => {
          const documents = []
          snap.forEach(d => {
            documents.push(d.id)
          })
          setTasks(documents)
          
      })
    }, [currentUser])
  
    useEffect(() => {
      return database.columns
        .where('userId', '==', currentUser.uid)
          .onSnapshot(snap => {
            const documents = []
            snap.forEach(d => {
              documents.push(d.id)
            })
            setColumns(documents)
            
        })
      }, [currentUser])
  

    //set columnOrder and add to final object. return finalas state.

  const finalObject = InitialData

  // finalObject.tasks = {}
  // finalObject.columns = {}

  // finalObject.columnOrder = ['column1', 'column2', 'column3', 'column4']

  // tasks.forEach(t => finalObject.tasks[t.id] = t)
  // columns.forEach(c => finalObject.columns[c.id] = c)
  // console.log(f)

  // setFinal(finalObject)
  
  
  return { state: final, setState: setFinal } //state displayed in Dnd component
}

export default useData
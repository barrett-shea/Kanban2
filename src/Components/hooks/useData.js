import { useState, useEffect } from 'react'
import { database } from "../../firebase"
import { useAuth } from "../../Contexts/AuthContext"


export default function useData() {
  const [tasks, setTasks] = useState(null)
  const [columns, setColumns] = useState(null)
  const [final, setFinal] = useState(null)
  
  const {currentUser} = useAuth()
  
  useEffect(() => { //gather task data from backend
    return database.tasks
      .where('userId', '==', currentUser.uid)
        .onSnapshot(snap => {
          const documents = []
          snap.forEach(d => {
            documents.push({ id: d.id, ...d.data() })
          })
        setTasks(documents)
        console.log(tasks)
      })
  }, [currentUser]) //if value in bracket changes, run effect function
  
  useEffect(() => { //gether column data from backend
    return database.collection.columns
      .where('userId', '==', currentUser.uid)
        .onSnapshot(snap => {
          const documents = []
          snap.forEach(d => {
            documents.push({ id: d.id, ...d.data() })
          })
          setColumns(documents)
          console.log(columns)
        })
}, [currentUser])  

useEffect(() => { //combine/rearrange data into object
  if (tasks && columns) {
      const finalObject = {}

      finalObject.tasks = {}
      finalObject.columns = {}
      
      finalObject.columnOrder = []
      const columnOrder = ['column1', 'column2', 'column3', 'column4']
      finalObject.columnOrder.push(columnOrder)

      tasks.forEach(t => finalObject.tasks[t.id] = t)
      columns.forEach(c => finalObject.columns[c.id] = c)

      setFinal(finalObject)
  }
}, [tasks, columns])
  console.log(JSON.stringify(final))
  return { state: final, setState: setFinal } //state displayed in Dnd component
}
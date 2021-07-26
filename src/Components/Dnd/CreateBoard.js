import React from 'react'
import { database } from "../../firebase"
import { useAuth } from "../../Contexts/AuthContext"
import InitialData from './InitialData'

export default function CreateBoard() {
  const {currentUser} = useAuth()
  
  function handleClick(e) { 
    e.preventDefault()
  for (let task in InitialData.tasks) {
    database.tasks.add({
    taskId: InitialData.tasks[task].id,
    content: InitialData.tasks[task].content,
    userId: currentUser.uid,
    createdAt: database.getCurrentTimestamp(),
    })
  }

  for (let column in InitialData.columns) {
    database.columns.add({
    columnId: InitialData.columns[column].id,
    title: InitialData.columns[column].title,
    taskIds: InitialData.columns[column].taskIds,
    userId: currentUser.uid,
    createdAt: database.getCurrentTimestamp(),  
    })
  }
}

  return (
    <button onClick={handleClick}>Test</button>
  )
}
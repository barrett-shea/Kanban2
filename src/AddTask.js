import React, {useState} from "react";
import {Form, Button, Container} from 'react-bootstrap'
import InitialData from './InitialData'

export default function AddTask () {
  const [state, setState] = useState(InitialData)
  const [value, setValue] = useState('')
  function handleChange(e) {
    setValue(e.target.value)
  }

  function handleSubmit() {
    console.log(`old state- ${JSON.stringify(state)}`)
// add task to state.tasks
    const newId = `task${(Object.keys(state.tasks).length)+1}` 
    const target = state.tasks
    const source = {'task5': {id: newId, content: value}} //key needs to be set to variable
  
    const newTask = Object.assign(target, source) 

// add newTask to column1
    const newList = state.columns['column1'].taskIds
    newList.push(newId)
    
    
    const newState = {
      ...state.tasks,
      tasks: newTask,
      columns: {
        ...state.columns,
        ['column1']: newList
      }
    }

    setState(newState)
    console.log(`new state- ${JSON.stringify(state)}`)
// state not being updated in other components(not being displayed)

    setValue('')
  }

  return (
    <Container className='w-25'>
    <form onSubmit={handleSubmit}>
        <input 
          type='text'
          value={value} 
          placeholder='Start Typing...' onChange={handleChange} />
    <Button 
      variant="primary"
      type='submit'
    >
        Add Task
    </Button>
    </form>
    </Container>
  )
}
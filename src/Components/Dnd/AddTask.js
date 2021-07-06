import React, {useState} from "react";
import {Form, Button, Container} from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';

export default function AddTask ({ state, setState }) {
  
  const [value, setValue] = useState('')
  
  function handleChange(e) {
    e.preventDefault();
    setValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (value) { //prevent adding blank tasks
    const id = uuidv4()
    state.tasks[id] =  {id: id, content: value}
  
    const newTaskIds = Array.from(state.columns['column1'].taskIds)
    newTaskIds.push(id)
    
    const newToDo = {
        ...state.columns['column1'],
      taskIds: newTaskIds,
      }
    const newState = {
        ...state, 
        columns: {
          ...state.columns,
          [newToDo.id]: newToDo, 
        } 
      } 

    setState(newState)
    setValue('') // cleanup input
    }
  }

  return (
    <Container className='w-50 mt-4'>
    <Form className='d-flex flex-row'>
        <Form.Control 
          value={value} 
          placeholder='Start Typing...' 
          onChange={handleChange} 
        />
    <Button 
      variant="primary"
      type='submit'
      onClick={handleSubmit}
      className='text-nowrap mx-1'
    >
        Add Task
    </Button>
    </Form>
    </Container>
  )
}
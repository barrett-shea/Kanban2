import React, {useState, useRef} from "react";
import {Form, Button, Container} from 'react-bootstrap'

export default function AddTask () {
  const [add, toAdd] = useState('')
  const addToDo = useRef() 

  function handleSubmit(e) {
    console.log(addToDo.current.value)
  }

  return (
    <Container className='w-25'>
    <Form onSubmit={handleSubmit}>
      <Form.Group id='addToDo'>
        <Form.Control type='text'  ref={addToDo} placeholder='Start Typing Here' />
      </Form.Group>
    <Button 
      variant="primary"
      type='submit'
    >
        Add Task
    </Button>
    </Form>
    </Container>
  )
}
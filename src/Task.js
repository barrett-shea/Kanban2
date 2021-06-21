import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import {Button} from 'react-bootstrap'

export default function Task(props) {
  
  function handleRemove(e) {
    e.preventDefault()
    
  }
  
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) =>(
        <div 
          className={`text-wrap border mb-2 p-2 rounded d-flex justify-content-between ${snapshot.isDragging ? 'bg-info' : 'bg-white'}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {props.task.content}
          <Button
            variant="outline-light"
            size="sm"
            className="text-muted border-0"
            onClick={handleRemove}
            >
              X
          </Button>
        </div>
      )}
    </Draggable>
  )
}
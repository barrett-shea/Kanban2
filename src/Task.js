import React, {useState} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import {Button} from 'react-bootstrap'

export default function Task({ task, index, columnDetails }) {
  // task = state.tasks['task1'] 
  // index = index of task in a column. Changes when moved.
  function handleRemove(e) {
    e.preventDefault()
    //remove task from column.taskIds
    let updateColumn = columnDetails.taskIds.filter(task)
    console.log(updateColumn)

    //remove task from tasks

    
  }
  
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) =>(
        <div 
          className={`text-wrap border mb-2 p-2 rounded d-flex justify-content-between ${snapshot.isDragging ? 'bg-info' : 'bg-white'}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
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
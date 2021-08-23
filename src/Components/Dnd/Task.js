import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import {Button} from 'react-bootstrap'

export default function Task({ task, index, columnDetails, state, setState }) {
  // task = state.tasks['task1'] 
  // index = index of task in a column. Changes when moved.
  
  function handleRemove(e) {
    e.preventDefault()
    //Step 1: remove task from column.taskIds (remove from screen)
    let updateColumnIds = columnDetails.taskIds.filter((id) => id !== task.id)
    
    const newColumn = {
      ...state.columns[columnDetails.id],
      taskIds: updateColumnIds,
    }

    //Step 2: remove task from tasks (free up space/memory)
    
    delete state.tasks[task.id]

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [columnDetails.id]: newColumn
      },
    }
    
    setState(newState)
  }
  console.log(task)
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
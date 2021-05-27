import React, {useState} from "react";
import InitialData from './InitialData'
import Column from './Column' 
import {DragDropContext} from 'react-beautiful-dnd'


export default function App () {
  const [state, setState] = useState(InitialData)
  
  const onDragEnd = result => {     //used to persist new order after drag
    const {destination, source, draggableId} = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const column = state.columns[source.droppableId]
    const newTaskIds = Array.from(column.taskIds)

    newTaskIds.splice(result.source.index, 1)
    
    newTaskIds.splice(result.destination.index, 0, draggableId)


    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      }, 
    }
    
    
    setState(newState)
  };
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
        {state.columnOrder.map(columnId => {
          const column= state.columns[columnId];
          const tasks= column.taskIds.map(taskId=> state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />
        })}
    </DragDropContext>
  );
}

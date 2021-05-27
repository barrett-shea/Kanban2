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
// InitialData.columns['column1'] = column = {id:column1, title:, taskIds: [task1, task2, task3, task4]}
    const newTaskIds = Array.from(column.taskIds)
// newTaskIds = [task1, task2, task3, task4]
    newTaskIds.splice(result.source.index, 1)
    
    newTaskIds.splice(result.destination.index, 0, draggableId)
// example: moving top of list to bottom 
//newTaskIds = [task2, task3, task4, task1]

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    }
// newColumn = {id:column1, title:, taskIds: [task2, task3, task4, task1]}
    console.log(state.columns)
    const newState = {
      ...state, // spread syntax to maintian properties of of InitialData.tasks
      columns: {
        ...state.columns, //not needed for only one column
        [newColumn.id]: newColumn, //overrides existing column-- 'column1': {id, title, taskIds:[newTaskIds]}
      }, //since only 1 column, InitialData.columnOrder is not updated in newState
    }
    
    
    setState(newState)
// Save updated state (list order) to database here
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

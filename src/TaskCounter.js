import React from 'react'

export default function TaskCounter({ state }) {
  const toDoCount = state.columns['column1'].taskIds.length + state.columns['column2'].taskIds.length + state.columns['column3'].taskIds.length + state.columns['column4'].taskIds.length //need more robust method in case # of columns dynamically change

  const completedCount = state.columns['column4'].taskIds.length
  
  return (
    <h5 className="m-3 text-secondary">Tasks Completed: {completedCount} / {toDoCount} </h5>
  )
}
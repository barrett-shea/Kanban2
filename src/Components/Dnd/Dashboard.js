import React from 'react'
import Navbar from './Navbar'
import Dnd from './Dnd'
import CreateBoard from './CreateBoard'

export default function Dashboard() {
  return (
    <>
      <Navbar/>
      <Dnd/>
      <CreateBoard/>
    </>
  )
}
import { useState } from 'react'
import './App.css'
import Form from "../components/form"
import List from "../components/list"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Task Manager</h1>
      <Form></Form>
      <List></List>
    </>
  )
}

export default App

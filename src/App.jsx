import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ExpensesPage from './pages/ExpensesPage'
// import CategoryPage from './pages/CategoryPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ExpensesPage />} />
      {/* <Route path='/category' element={<CategoryPage />} /> */}
    </Routes>
  )
}

export default App

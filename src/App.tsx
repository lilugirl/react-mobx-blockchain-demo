import { FC, useState } from 'react'
import {observer} from 'mobx-react-lite'
import './App.css'
import Home from './home'
import { useStore } from './store';

const App:FC=()=> {
  return (
    <div className="App">
      <Home />
    </div>
  )
}

export default App

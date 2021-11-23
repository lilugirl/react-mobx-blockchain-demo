import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BlockchainStore, StoreProvider } from './store'

const store=new BlockchainStore();


ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from './Context/Context.jsx'
import { Provider } from 'react-redux'
import store from './Store/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <ChakraProvider >
          <App />
        </ChakraProvider>
      </Provider>
    </AuthProvider>
  </BrowserRouter >,
)

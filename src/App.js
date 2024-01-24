
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Context, ContextProvider } from './context/AppContext';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import NotExist from './pages/NotExist';
import Router from './components/Router';

function App() {

  return (
    
<ContextProvider>
  <div className='App'>
  <BrowserRouter>  
     
          {/* <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} /> */}
          <Router/>
          {/* <Route path="*" element={<NotExist />} /> */}
      
    </BrowserRouter>
    </div>
</ContextProvider>
  );
}

export default App;

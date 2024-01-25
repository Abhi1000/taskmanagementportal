import React from 'react';
import './App.css';
import Listcomponent from './components/Listcomponent';

const App = () => {
  return (
    <div className='app'>
      <header className='app-header'>
        <div>
          <p className="title-text align-left">Task Management Portal</p>
        </div>
      </header >
      <Listcomponent/>
    </div >
  )

}

export default App;

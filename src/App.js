import React from 'react';
import Home from '../src/components/Home'
import { SportContext } from './context';



function App() {
  const { loading } = React.useContext(SportContext);
  if (loading) {
    return <div className='loader'>
    </div>
  };

  return <>
    <Home />
  </>
}

export default App;

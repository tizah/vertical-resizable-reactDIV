import React, {useState} from 'react';
import {SplitView} from './SplitView'
import './App.css';

function App() {
  const [leftWidth, setLeftWidth] = useState<undefined | number>(undefined);
  return (
    <div className="App">
     <SplitView left={<div>first element</div>} right={<div>second element</div>}/>
    </div>
  );
}

export default App;

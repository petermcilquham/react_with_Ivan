import { useState } from 'react';
import './App.css';
import { CollapsibleElement } from './components/CollapsibleElement';

interface ICollapsibleState {
  collap1: boolean;
  collap2: boolean;
  collap3: boolean;
  collap4: boolean;
}

function App() {
  const [collapsibleState, setCollapsibleState] = useState<ICollapsibleState>({ collap1: true, collap2: false, collap3: false, collap4: false });

  function toggleCollapsibleState(acc: number) {
    switch (acc) {
      case 1:
        setCollapsibleState({ ...collapsibleState, collap1: !collapsibleState.collap1 });
        break;
      case 2:
        setCollapsibleState({ ...collapsibleState, collap2: !collapsibleState.collap2 });
        break;
      case 3:
        setCollapsibleState({ ...collapsibleState, collap3: !collapsibleState.collap3 });
        break;
      case 4:
        setCollapsibleState({ ...collapsibleState, collap4: !collapsibleState.collap4 });
        break;

      default:
        setCollapsibleState(collapsibleState);
        break;
    }
  }
  return (
    <>
      <CollapsibleElement title={'Title 1'} text={'Text 1'} showElement={collapsibleState.collap1} toggleCollapsibleState={() => toggleCollapsibleState(1)} />
      <CollapsibleElement title={'Title 2'} text={'Text 2'} showElement={collapsibleState.collap2} toggleCollapsibleState={() => toggleCollapsibleState(2)} />
      <CollapsibleElement title={'Title 3'} text={'Text 3'} showElement={collapsibleState.collap3} toggleCollapsibleState={() => toggleCollapsibleState(3)} />
      <CollapsibleElement title={'Title 4'} text={'Text 4'} showElement={collapsibleState.collap4} toggleCollapsibleState={() => toggleCollapsibleState(4)} />
    </>
  );
}

export default App;

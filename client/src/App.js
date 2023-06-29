import './App.css';

import PageProducts from './PageProducts/PageProducts';
import PageLogin from './PageLogin/PageLogin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PageProducts inscription={true}/>
      </header>
    </div>
  );
}

export default App;

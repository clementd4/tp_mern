import './App.css';

import PageProducts from './PageProducts/PageProducts';
import PageLogin from './PageLogin/PageLogin';
import PageAdminUsers from './PageAdminUsers/PageAdminUsers';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PageLogin inscription={false}/>
      </header>
    </div>
  );
}

export default App;

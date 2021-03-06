import { useState } from 'react';
import logo from './logo.svg';
import './index.css';
import { CHANNEL_NAME } from '../../../global/constant';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((_count) => _count + 1)}>
            count is:
            {' '}
            {count}
          </button>
          <button
            type="button"
            onClick={() => window.electron.ipcRenderer.invoke(CHANNEL_NAME.INIT_SUB_WINDOW, {
              name: 'aboutWindow',
              page: 'about',
              message: { type: 'data', data: 'hello, sub window' }
            })}
            style={{ marginLeft: 10 }}
          >
            open sub window
          </button>
        </p>
        <p>
          Edit
          {' '}
          <code>App.jsx</code>
          {' '}
          and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;

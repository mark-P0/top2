import { bool as PTBool, string as PTString } from "prop-types";
import { useState } from "react";

function Header({ text, showLinks = false }) {
  return (
    <header>
      {showLinks && (
        <nav>
          <a href="https://vitejs.dev">Vite</a>
          <a href="https://react.dev">React</a>
        </nav>
      )}
      <h1>{text}</h1>
    </header>
  );
}

Header.propTypes = {
  text: PTString.isRequired,
  showLinks: PTBool,
};

Header.defaultProps = {
  showLinks: "",
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header text="Vite + React" />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

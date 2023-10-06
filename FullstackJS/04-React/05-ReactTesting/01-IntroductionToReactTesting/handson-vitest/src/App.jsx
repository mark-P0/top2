import { useState } from "react";

export function App1() {
  return <h1>Our First Test</h1>;
}

export function App2() {
  const [heading, setHeading] = useState("Magnificent Monkeys");

  function clickHandler() {
    setHeading("Radical Rhinos");
  }

  return (
    <>
      <button type="button" onClick={clickHandler}>
        Click Me
      </button>
      <h1>{heading}</h1>
    </>
  );
}

# Fetching Data In React

> `useEffect()` + `fetch()` + `async` effect?

## Basic structure

```jsx
import { useState, useEffect } from "react";

function Image() {
  const [imgUrl, setImgUrl] = useState(null);
  const [error, setError] = useState(null);
  const hasError = error !== null;
  const isLoading = imgUrl === null && error === null;

  async function fetchData() {
    try {
      const response = await fetch(dataSrcUrl);
      const json = await response.json();
      setImgUrl(json.url);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (hasError) {
    return (
      <p>
        An error has occurred: <code>{error}</code>
      </p>
    );
  }
  return (
    <>
      <h1>An image</h1>
      <img src={imgUrl} alt="..." />
    </>
  );
}
```

- Fetch in an effect
  - Async fetcher
- Helpful to have a dedicated error state
  - Wrap fetcher in a `try`-`catch` block
  - On catch, set error state
- Have a loading state?
  - Derive from data state and error states?

### Custom hook

Optionally refactor to a custom hook for ease of use

```jsx
import { useState, useEffect } from "react";

function useImgUrl() {
  const [imgUrl, setImgUrl] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch(dataSrcUrl);
      const json = await response.json();
      setImgUrl(json.url);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return [imgUrl, error];
}

function Image() {
  const [imgUrl, error] = useImgUrl();
  const hasError = error !== null;
  const isLoading = imgUrl === null && error === null;

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (hasError) {
    return (
      <p>
        An error has occurred: <code>{error}</code>
      </p>
    );
  }
  return (
    <>
      <h1>An image</h1>
      <img src={imgUrl} alt="..." />
    </>
  );
}
```

## Waterfall of requests

```jsx
function Parent() {
  const data = useDataFetcher();

  if (data === null) {
    return null;
  }
  return (
    <>
      {data}
      <Child />
    </>
  );
}

function Child() {
  // ❌ Will not run until Parent renders Child,
  // i.e. when Parent's data fetching finishes
  // Ideally, requests should be done at the same time, in parallel
  const anotherData = useAnotherDataFetcher();

  return <>{anotherData}</>;
}
```

- As much as possible, perform fetches at the same time
- Unless a fetch depends on the data of another fetch of course

```jsx
function Parent() {
  const data = useDataFetcher();
  // ✅ "Lifted up", so that it happens at the same time as `data`
  const anotherData = useAnotherDataFetcher();

  if (data === null) {
    return null;
  }
  return (
    <>
      {data}
      <Child data={anotherData} />
    </>
  );
}

function Child({ data }) {
  return <>{data}</>;
}
```

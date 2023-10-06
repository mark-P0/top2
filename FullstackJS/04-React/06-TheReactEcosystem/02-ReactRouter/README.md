# React Router

> Last lesson I went through before temporarily stopping was about React Router

React Router enables easy **client-side routing** for a more complete **single-page application**

- React Router is a separate library, kind of a plugin to React
- Client-side routing, in simple terms, allows URLs to determine what elements are drawn in the page (and vice versa) without fetching a separate webpage, all via Javascript
- Single-page applications are apps that technically use only a single webpage from the server, and this webpage is redrawn accordingly based on user actions

## Installing

```sh
npm i react-router-dom
```

## Usage

### Routes | Router

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const routes = [
  { path: "/", element: <Root /> },
  { path: "/path1", element: <Path1 /> },
  { path: "/path2", element: <Path2 /> },
  { path: "/path3", element: <Path3 /> },
];
const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

- Build a tree of routes
  - Each route has a unique path (what appears on the URL, after the domain)
  - Each route has an associated component
  - This component is rendered when the specified path is accessed
- Create router from route tree
  - There are a handful of router types to select from
  - Each implements a different mechanism for routing
- Give created router to a router provider
- Use router provider as root component

#### Router component

Wrapping the routing logic in a component cleans up the code nicely

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function Router() {
  const routes = [
    { path: "/", element: <Root /> },
    { path: "/path1", element: <Path1 /> },
    { path: "/path2", element: <Path2 /> },
    { path: "/path3", element: <Path3 /> },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
```

### Links

```jsx
function RegularLink() {
  return <a href="/path">Link to path</a>;
}
```

```jsx
import { Link } from "react-router-dom";

function RoutedLink() {
  return <Link to="/path">Link to path</Link>;
}
```

- By default, anchor elements `<a>` still try to fetch a new webpage served from URLs
- To intercept this, use the `<Link/>` component of React Router
  - Instead of `href` attribute, specify a `to` prop

### Error handling | `404 Not Found`

```jsx
// ...

const routes = [
  { path: "/", element: <Root />, errorElement: <ErrorPage /> },
  { path: "/path1", element: <Path1 /> },
  { path: "/path2", element: <Path2 /> },
  { path: "/path3", element: <Path3 /> },
];
const router = createBrowserRouter(routes);

// ...
```

- Specify a component on the root route to render when an error is encountered
- This should catch all links that is not routed to a component

### Nested paths

```jsx
// ...

const routes = [
  { path: "/", element: <Root />, errorElement: <ErrorPage /> },
  {
    path: "/path1",
    element: <Path1 />,
    children: [
      { path: "/path1/path-a", element: <PathA /> },
      { path: "/path1/path-b", element: <PathB /> },
      { path: "/path1/path-c", element: <PathC /> },
    ],
  },
  { path: "/path2", element: <Path2 /> },
  { path: "/path3", element: <Path3 /> },
];
const router = createBrowserRouter(routes);

// ...
```

### Outlets

```jsx
import { Outlet } from "react-router-dom";

// Child route components will be rendered inside this component, replacing `<Outlet />`
function Path1() {
  return (
    <>
      <Outlet />
    </>
  );
}
```

- Render a component **inside** another component while maintaining routing
- Child components will replace `<Outlet />`

#### Index components

```jsx
// ...

const routes = [
  { path: "/", element: <Root />, errorElement: <ErrorPage /> },
  {
    path: "/path1",
    element: <Path1 />,
    children: [
      { index: true, element: <Path1Default /> },
      { path: "/path1/path-a", element: <PathA /> },
      { path: "/path1/path-b", element: <PathB /> },
      { path: "/path1/path-c", element: <PathC /> },
    ],
  },
  { path: "/path2", element: <Path2 /> },
  { path: "/path3", element: <Path3 /> },
];
const router = createBrowserRouter(routes);

// ...
```

- Default component to use in place of `<Outlet />`

### Dynamic segments

```jsx
// ...

const routes = [
  { path: "/", element: <Root />, errorElement: <ErrorPage /> },
  // { path: "/path1", element: <Path1 /> }, // Optionally add a separate route for accessing the path without stub
  { path: "/path1/:subpath", element: <Path1 /> },
  { path: "/path2", element: <Path2 /> },
  { path: "/path3", element: <Path3 /> },
];
const router = createBrowserRouter(routes);

// ...
```

```jsx
import { useParams } from "react-router-dom";

function Path1A() {
  return <></>;
}
function Path1B() {
  return <></>;
}
function Path1C() {
  return <></>;
}

function Path1() {
  const { subpath } = useParams();

  return (
    <>
      {subpath === "a" ? (
        <Path1A />
      ) : subpath === "b" ? (
        <Path1B />
      ) : subpath === "c" ? (
        <Path1C />
      ) : null}
    </>
  );
}
```

- Conditionally render components based on URL stubs
- `useParams()` hook provided by React Router allows access to
- Avoids outlets altogether, allowing for more fine-grained control

### Redirects

`<Navigate />` component or `useNavigate()` hook

### Protected routes

https://stackoverflow.com/a/64347082

> Conditionally set routes?

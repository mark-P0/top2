# Router

## Knowledge Check

- What is Client-side routing?

  - Handling of URL requests via JS fetches (may or may not use fetches)
  - Generally avoids explicit HTTP GET of documents from site server
  - Provides an app-like experience (web app; think Twitter, Facebook, etc.)

- How do you add page routing to a React project?

  - Using [React Router](https://reactrouter.com/en/main)
    - By using a browser router component as the DOM root
      - Either created from `createBrowserRouter()`
      - Or directly used as `<BrowserRouter></BrowserRouter>` component
    - This acts like a provider so that the whole app could know what path the user is currently in
    - More generally, an explicit router provider is used, which takes in different routers, e.g. a browser router

- What are the three core components of React Router?

  ```jsx
  <BrowserRouter>
    <Routes>
      <Route ... />
      <Route ... />
      <Route ... />
    </Routes>
  </BrowserRouter>
  ```

  - A router component, most commonly `<BrowserRouter />`
    - There are other less used router components
    - There are different approaches to instantiating a [browser] router
  - `<Routes />`
    - Container for `<Route />` components
  - `<Route />`
    - Defines what component is rendered at which URL path
    - Children can be inserted at the `<Outlet />` slots of the given component

- How do you ensure that Router links are routed accurately?
  - The router must be the root of the app

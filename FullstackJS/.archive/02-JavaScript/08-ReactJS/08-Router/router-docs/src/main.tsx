import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Error from "./routes/Error.js";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/Root.js";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/Contact.js";
import EditContact, { action as editAction } from "./routes/Edit.js";
import { action as destroyAction } from "./routes/destroy.js";
import Index from "./routes/index.js";

const Profile = (
  <div>
    <code>profile</code>
  </div>
);

const routeTree = (
  <Route
    path="/"
    element={<Root />}
    errorElement={<Error />}
    action={rootAction}
    loader={rootLoader}
  >
    <Route errorElement={<Error />}>
      <Route index element={<Index />}></Route>
      <Route
        path="contacts/:contactId"
        element={<Contact />}
        action={contactAction}
        loader={contactLoader}
      ></Route>
      <Route
        path="contacts/:contactId/edit"
        element={<EditContact />}
        action={editAction}
        loader={contactLoader}
      ></Route>
      <Route
        path="contacts/:contactId/destroy"
        errorElement={<span>Oops! There was an error.</span>}
        action={destroyAction}
      ></Route>
      {/* <Route path="profile" element={Profile}></Route> */}
    </Route>
  </Route>
);
const router = createBrowserRouter(createRoutesFromElements(routeTree));

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: "contacts/:contactId",
//         element: <Contact />,
//       },
//     ],
//   },
//
//   {
//     path: "/profile",
//     element: (
//       <div>
//         <code>profile</code>
//       </div>
//     ),
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

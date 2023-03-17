import { useEffect, useRef } from "react";
import {
  Outlet,
  Link,
  NavLink,
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
  redirect,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts.js";
import type { Contact } from "../types/contact.js";

export async function action() {
  console.log("root action");

  const contact: Contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
  return { contact };
}

export async function loader({ request }) {
  console.log("root loader");

  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = (await getContacts(q)) as Contact[];
  return { contacts, q };
}

function ContactLink({ contact }: { contact: Contact }) {
  return (
    <NavLink
      to={`contacts/${contact.id}`}
      className={({ isActive, isPending }) =>
        isActive ? "active" : isPending ? "pending" : ""
      }
    >
      {contact.first || contact.last ? (
        <>
          {contact.first} {contact.last}
        </>
      ) : (
        <i>No Name</i>
      )}{" "}
      {contact.favorite && <span>★</span>}
    </NavLink>
  );
}

export default function Root() {
  const { contacts, q } = useLoaderData() as { contacts: Contact[]; q: string };
  const navigation = useNavigation();
  const submit = useSubmit();
  const searchbar = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!searchbar.current) return;
    searchbar.current.value = q;
  }, [q]);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  console.log({ loc: navigation.location });

  const navList =
    contacts.length === 0 ? (
      <p>
        <i>No contacts</i>
      </p>
    ) : (
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <ContactLink contact={contact} />
          </li>
        ))}
      </ul>
    );

  return (
    <>
      <div id="sidebar">
        <h1>
          <Link to="/">React Router Contacts</Link>
        </h1>
        <div>
          <Form id="search-form" role="search">
            <input
              ref={searchbar}
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={({ target }) => {
                const isFirstSearch = q === null;
                submit(target.form, { replace: !isFirstSearch });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>{navList}</nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}

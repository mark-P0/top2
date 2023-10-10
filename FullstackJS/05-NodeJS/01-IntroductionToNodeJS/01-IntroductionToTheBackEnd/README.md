# Introduction to the Back End

> Either of the following is an acceptable term
>
> - "Back end" (noun)
> - "Back-end" (adjective)
> - "Backend" (closed compound)

|           | Frontend      | Backend                                  |
| :-------- | :------------ | :--------------------------------------- |
| Location  | Browser       | Server                                   |
| Languages | HTML, CSS, JS | Virtually anything, e.g. JS, Python, PHP |
|           | Design        | Database                                 |
|           | UI/UX         | API                                      |

## Fullstack

- Combination of frontend and backend expertise

### Popular stacks

- LAMP
  > Old stack? Traditional
  >
  > Probably via XAMPP?
  - Linux
  - Apache
  - MySQL
  - PHP / Python
- MERN
  - MongoDB
  - ExpressJS
  - ReactJS
  - NodeJS
  - Can also be MEAN, replacing React with Angular

## [Mapping out a request](https://www.codecademy.com/article/back-end-architecture#heading-mapping-out-a-request)

- A URI is visited, e.g. `http://www.SuperCoolShop.com/products/66432`
  - URI (identifier) is a superset of URL (link), i.e. a URL is contained within a URI
- The web browser submits a `GET` request to this URL
  - `GET` is an HTTP verb, for simply fetching a resource, e.g. a webpage (HTML+CSS+JS)
  - There are other HTTP verbs, e.g. `PUT` `POST` `DELETE`
- The request travels through the internet, until it reaches the URI servers
  - Might take a long time, depending on how far the servers are located
  - To minimize the loading time, the site may be served from different servers, across the world
- The server reaches the request and should prepare a response
- The server matches the requested resource based on the HTTP verb and URI
  - The role of a server is to receive requests, process them, and "serve" a corresponding response
  - Requests consist of a pair of HTTP verb and URI
  - The pair of HTTP verb and URI is called a **route**
  - Mapping a response based on the request is called **routing**
  - The process that happens between the request and response is called **middleware**
- The process may invoke other processes, e.g. database queries, pinging other APIs
  - These processes may themselves travel through the internet, further adding to the loading time
- The server constructs a response, ideally a webpage (HTML+CSS+JS)
  - These responses have a status code attached to them, e.g. commonly
    - `200` Success
    - `404` Not Found
  - Even errors (e.g. `404`) should be served as a webpage!
- The server sends the response through the internet back to the client
- The client's web browser receives the response and renders it, e.g. a webpage

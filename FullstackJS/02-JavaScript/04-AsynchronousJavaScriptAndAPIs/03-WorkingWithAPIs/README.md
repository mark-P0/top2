# Working with APIs

> I used to use `superagent` for a scraping project

## Example APIs

- [OpenWeatherMap](https://openweathermap.org/)
- [GIPHY](https://giphy.com/)

## Knowledge Check

- What is an API?

  - Application Programming Interface
  - Simply put, a data endpoint
  - Data may be sourced from an API
  - Data may also be submitted to an API

- How is access to an API restricted?

  - Authentication / Identification via a registered key

- How do you fetch and extract data from an API?

  - Access API via the URL
  - Append desired action to URL via [query strings](https://en.wikipedia.org/wiki/Query_string)
    - Build using JS [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL_API) for security
  - Query string fields depends on API themselves
    - Check documentation!
    - May also be done via POST instead of GET (query strings); again, depends on API

- Why might your API request be blocked by the browser, and how might you fix this?

  - Rate limiting
  - Incomplete registration
  - CORS
    - Use `{mode: 'cors'}` option in `fetch()`

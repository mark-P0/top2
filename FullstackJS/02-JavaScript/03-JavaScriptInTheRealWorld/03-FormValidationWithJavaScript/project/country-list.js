/**
 * A mapping of countries and time zones
 * https://www.techighness.com/post/get-user-country-and-region-on-browser-with-javascript-only/
 */
const url =
  'https://cdn.jsdelivr.net/npm/moment-timezone@0.5.40/data/meta/latest.json';
const raw = await fetch(url);
const data = await raw.json();

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const input = document.querySelector('input[list="country-list"]');
const datalist = document.getElementById('country-list');
datalist.replaceChildren(
  ...Object.values(data.countries).map(({ name, abbr, zones }) => {
    const element = document.createElement('option');
    element.setAttribute('value', name);

    if (zones.includes(userTimeZone)) {
      element.setAttribute('selected', true);
      input.value = name;
    }

    return element;
  })
);

const countries = Object.values(data.countries).map(({ name }) => name);
export { countries };

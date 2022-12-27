import { GIPHY } from './.exclude/api-keys.js';

/** @type {(query: string, callback: (url: string) => void) => void} */
function search(query, callback) {
  const url = new URL('https://api.giphy.com/v1/gifs/translate');
  url.searchParams.append('api_key', GIPHY);
  url.searchParams.append('s', query);

  fetch(url, { mode: 'cors' })
    .then((res) => res.json())
    .then((json) => callback(json?.data?.images?.original?.url));
}

const form = document.querySelector('form');
const img = document.querySelector('img');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  img.src = '';

  const { query } = Object.fromEntries(new FormData(form));
  if (!query) return;

  search(query, (url) => {
    if (!url) return;
    img.src = url;
  });
});

// form.querySelector('input').value = 'cats';
// form.querySelector('button').click();

import { GIPHY } from './.exclude/api-keys.js';

/** @type {async (query: string) => string} */
async function search(query) {
  const url = new URL('https://api.giphy.com/v1/gifs/translate');
  url.searchParams.append('api_key', GIPHY);
  url.searchParams.append('s', query);

  const res = await fetch(url, { mode: 'cors' });
  const json = await res.json();
  return json?.data?.images?.original?.url;
}

const form = document.querySelector('form');
const img = document.querySelector('img');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  img.src = '';

  const { query } = Object.fromEntries(new FormData(form));
  if (!query) return;

  const url = await search(query);
  if (!url) return;
  img.src = url;
});

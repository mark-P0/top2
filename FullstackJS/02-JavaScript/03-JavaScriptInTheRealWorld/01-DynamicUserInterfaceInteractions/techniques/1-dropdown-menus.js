const article = {
  toggles: document.querySelector('#technique-1 .toggles'),
  menu: document.querySelector('#technique-1 .menu'),
};

let isShown;
function show() {
  const height = article.menu.children[0].clientHeight;
  article.menu.style.height = `${height}px`;
  isShown = true;
}
function hide() {
  article.menu.style.height = null;
  isShown = false;
}
function toggle() {
  if (isShown) hide();
  else show();
}

const hover = article.toggles.querySelector('a');
hover.addEventListener('mouseover', show);
hover.addEventListener('mouseout', hide);

const click = article.toggles.querySelector('button');
click.addEventListener('click', toggle);

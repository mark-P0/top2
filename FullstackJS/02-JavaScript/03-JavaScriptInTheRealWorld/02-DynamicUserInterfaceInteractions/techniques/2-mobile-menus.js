const article = {
  toggles: document.querySelector('#technique-2 .toggles'),
  screens: document.querySelector('#technique-2 .screens'),
};

function* enumerate(iterable) {
  let idx = 0;
  for (const item of iterable) {
    yield [idx++, item];
  }
}

article.toggles.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLButtonElement)) return;

  for (const [buttonIdx, button] of enumerate(article.toggles.children)) {
    if (!(event.target === button)) {
      button.classList.remove('border-bottom', 'fw-bold', 'pt-1');
      continue;
    }

    button.classList.add('border-bottom', 'fw-bold', 'pt-1');
    for (const [screenIdx, screen] of enumerate(article.screens.children)) {
      if (buttonIdx === screenIdx) screen.classList.remove('d-none');
      else screen.classList.add('d-none');
    }
  }
});

article.toggles.children[0].click();

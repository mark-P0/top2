const images = document.querySelector('#technique-3 .images');
const prev = document.querySelector('#technique-3 button.start-0');
const next = document.querySelector('#technique-3 button.end-0');
const jumpers = document.querySelector('#technique-3 .bottom-0');

function mod(n, d) {
  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#description */
  return ((n % d) + d) % d;
}

function timeout(secs = 5) {
  return setTimeout(() => cycle(1), secs * 1000);
}
let currentTimeout = timeout();

let slideIdx = 0;
function cycle(factor) {
  set(slideIdx + factor);
}
function set(idx) {
  clearTimeout(currentTimeout);
  currentTimeout = timeout();

  slideIdx = mod(idx, images.children.length) || 0;
  images.style.setProperty('--slide-index', slideIdx);
  updateSlideButton(slideIdx);
}

function* enumerate(iterable) {
  let idx = 0;
  for (const item of iterable) {
    yield [idx++, item];
  }
}
function updateSlideButton(idx) {
  for (const [buttonIdx, button] of enumerate(jumpers.children)) {
    if (buttonIdx === idx) button.classList.add('selected');
    else button.classList.remove('selected');
  }
}

prev.addEventListener('click', () => cycle(-1));
next.addEventListener('click', () => cycle(1));

jumpers.replaceChildren(
  ...Array.from({ length: images.children.length }, () =>
    jumpers.children[0].cloneNode()
  )
);
jumpers.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLButtonElement)) return;

  const idx = Array.prototype.indexOf.call(jumpers.children, event.target);
  set(idx);
});

set(0);

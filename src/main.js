const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navegacao');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.header-inner')) closeMenu();
});

navigation.addEventListener('focusout', (event) => {
  if (!navigation.contains(event.relatedTarget) && event.relatedTarget !== menuButton) closeMenu();
});

window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

// A navegação permanece visível se a prévia bloquear JavaScript.
document.documentElement.classList.add('menu-ready');

const pages = {
  home: 'home',
  continue: 'continue',
  new: 'new',
  customize: 'customize-menu',
  credits: 'credits-menu',
  exitgame: 'exitgame',
};

const menuButtons = ['play', 'customize', 'credits', 'exitgame'];
const alignment = ['home']
function showPage(pageId) {
  Object.values(pages).forEach(id => {
    document.getElementById(id)?.classList.add('hide');
  });

  document.getElementById(pageId)?.classList.remove('hide');
}

Object.entries(pages).forEach(([buttonId, pageId]) => {
  document.getElementById(buttonId)?.addEventListener('click', () => {

    showPage(pageId);

    if (buttonId === 'home') {
      // hide home button
      document.getElementById('home')?.classList.add('hide');

      // show menu buttons
      menuButtons.forEach(id => {
        document.getElementById(id)?.classList.remove('hide');
      });
      // align buttons
      alignment.forEach(id => {
        const el = document.getElementById('buttons');
      el?.classList.remove('top');
      el?.classList.add('center');
    });
    } else {
      // show home button
      document.getElementById('home')?.classList.remove('hide');

      // hide menu buttons
      menuButtons.forEach(id => {
        document.getElementById(id)?.classList.add('hide');
      });
      // align buttons
      alignment.forEach(id => {
        const el = document.getElementById('buttons');
      el?.classList.add('top');
      el?.classList.remove('center');
    });
    }
  });
});
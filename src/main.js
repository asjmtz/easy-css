// the "notfound" implements a catch-all
// with page('*', notfound). Here we have
// no catch-all, so page.js will redirect
// to the location of paths which do not
// match any of the following routes
//
page.base('/basic');
page('/', index);
page('/about', about);
page('/contact', contact);
page('/contact/:contactName', contact);
page();
function index() {
  document.querySelector('p')
    .textContent = 'viewing index';
}
function about() {
  document.querySelector('p')
    .textContent = 'viewing about';
}
function contact(ctx) {
  document.querySelector('p')
    .textContent = 'viewing contact ' + (ctx.params.contactName || '');
}
// the "notfound" implements a catch-all
// with page('*', notfound). Here we have
// no catch-all, so page.js will redirect
// to the location of paths which do not
// match any of the following routes
//
const routes = ['hi', 'no']
// page.base('/basic');
// page('/', index);
// page('/about', about);
// page('/contact', contact);
// page('/contact/:contactName', contact);
function initRoute (argument) {
	// routes.forEach((item) => {
	// 	page('/'+ item, route);
	// })
	// page('/', ()=>{});
	page('*', route);

	page({
		hashbang:true
	});
}

initRoute();

function get(url){
	return fetch(url).then((data)=>{
		return data.text().then((str)=>str)
	}).catch((err)=>{
		throw err
	})
}


function route (ctx, next) {
	console.log(ctx)
	let ctxPath = ctx.path.substr(1)
	// not found
	if ( routes.indexOf(ctxPath) !== -1 || ctxPath == '' ) {
		const routePath = ctxPath == '' ? routes[0] : ctxPath
		get(`src/page/${routePath}.html`).then((data)=>{
	  		document.querySelector('p')
		    .innerHTML = data;
		})
	  	document.querySelector('p').textContent = 'loading';
	}
	else {
		notfound()
	}

	// if 404 , return next() or redirect to 404 
	// next()
}

function index() {
	get('src/page/hi.html').then((data)=>{
  		document.querySelector('p')
	    .innerHTML = data;
	})
  	document.querySelector('p').textContent = 'loading';
}

function about() {
  document.querySelector('p')
    .textContent = 'viewing about';
}

function contact(ctx) {
  document.querySelector('p')
    .textContent = 'viewing contact ' + (ctx.params.contactName || '');
}

function notfound(ctx) {
  document.querySelector('p')
    .textContent = 'not found';
}
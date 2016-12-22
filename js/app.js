// the "notfound" implements a catch-all
// with page('*', notfound). Here we have
// no catch-all, so page.js will redirect
// to the location of paths which do not
// match any of the following routes
//
const routes = ['base', 'component', 'layout', '342']
// page('/', index);
// page('/about', about);
// page('/contact', contact);
// page('/contact/:contactName', contact);
function initRoute (argument) {
	// routes.forEach((item) => {
	// 	page('/'+ item, route);
	// })
	// page('/', ()=>{});
	// page.base(location.pathname);
	// page.base(location.pathname);
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
	// ctx.path : '/XX' or '/' 
	let ctxPath = ctx.path.substr(1)
	let rootPath = location.pathname.substr(1)
	// if not found
	if ( routes.indexOf(ctxPath) !== -1 || ctxPath == rootPath ) {
		const routePath = ctxPath == rootPath ? routes[0] : ctxPath
		get(`page/${routePath}.html`).then((data)=>{
	  		document.querySelector('p')
		    .innerHTML = data;
		})
	  	document.querySelector('p').textContent = 'loading';
	}
	else {
		// 404
		notfound()
	}
}

function notfound(ctx) {
  document.querySelector('p')
    .textContent = 'not found';
}
export const server = (done) => {
	app.plugins.browsersync.init({
		proxy: app.path.buildFolder + '/index.html', // proxy для OpenServer c доменом http://akvasmart/
		notify: false
	});
}
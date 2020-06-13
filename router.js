class Router {
	constructor(routes) {
		this.routes = routes
		this._loadInitialRoutes()
	}

	loadRoute(...urlSegs) {
		const matchedRoute = this._matchUrlToRoute(urlSegs)

		const url = `/${urlSegs.join('/')}`
		history.pushState({}, 'This works!!', url)

		const routerOutElement = document.querySelector('[data-router]')
		routerOutElement.innerHTML = matchedRoute.template
	}

	_matchUrlToRoute(urlSegs) {
		const matchedRoute = this.routes.find((route) => {
			const routePathSegs = route.path.split('/').slice(1)

			if (routePathSegs.length !== urlSegs.length) {
				return false
			}

			return routePathSegs.every(
				(routePathSeg, idx) => routePathSeg === urlSegs[idx]
			)
		})

		return matchedRoute
	}

	_loadInitialRoutes() {
		const pathNameSplit = window.location.pathname.split('/')
		const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : ''

		this.loadRoute(...pathSegs)
	}
}

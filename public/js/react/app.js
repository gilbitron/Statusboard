(function(App) {

	React.render(
		(
			React.createElement("div", null, 
				React.createElement(App.Views.Slack, {url: "/api/slack-users", pollInterval: 60000}), 
				React.createElement(App.Views.Helpscout, {url: "/api/helpscout-mailboxes", pollInterval: 60000}), 
				React.createElement(App.Views.Github, {url: "/api/github-notifications", pollInterval: 60000})
			)
		),
		document.getElementById('content')
	);

})(App);
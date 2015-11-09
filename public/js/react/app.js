(function(App) {

	ReactDOM.render(
		(
			<div>
				<App.Views.Slack url="/api/slack-users" pollInterval={60000}/>
				<App.Views.Helpscout url="/api/helpscout-mailboxes" pollInterval={60000}/>
				<App.Views.Github url="/api/github-notifications" pollInterval={60000}/>
			</div>
		),
		document.getElementById('content')
	);

})(App);
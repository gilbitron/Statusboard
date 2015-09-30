(function(App) {

	App.Views.Error = React.createClass({
		render: function() {
			var content = (
				<div class="error-message">Error: Whoops looks like something went wrong.</div>
			);

			if (this.props.type == 'OauthTokenError') {
				content = (
					<div className="error-message">
						{this.props.data.service} authentication required:&nbsp;
						<a href={this.props.data.auth_url}>Authenticate now</a>
					</div>
				);
			}

			return (
				<div className={'error error-' + this.props.type.toLowerCase()}>
					{content}
				</div>
			);
		}
	});

})(App);
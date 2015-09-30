(function(App) {

	App.Views.Error = React.createClass({displayName: "Error",
		render: function() {
			var content = (
				React.createElement("div", {class: "error-message"}, "Error: Whoops looks like something went wrong.")
			);

			if (this.props.type == 'OauthTokenError') {
				content = (
					React.createElement("div", {className: "error-message"}, 
						this.props.data.service, " authentication required: ", 
						React.createElement("a", {href: this.props.data.auth_url}, "Authenticate now")
					)
				);
			}

			return (
				React.createElement("div", {className: 'error error-' + this.props.type.toLowerCase()}, 
					content
				)
			);
		}
	});

})(App);
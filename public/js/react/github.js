(function(App) {

	App.Views.Github = React.createClass({displayName: "Github",
		loadNotificationsFromServer: function() {
			this.setState({loading: true});
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				cache: false,
				success: function(data) {
					if (typeof data.error !== 'undefined') {
						this.setState({error: data.error, loading: false});
					} else {
						this.setState({data: data, loading: false});
						setTimeout(this.loadNotificationsFromServer, this.props.pollInterval);
					}
				}.bind(this),
				error: function(xhr, status, err) {
					this.setState({loading: false});
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			});
		},
		getInitialState: function() {
			return {
				loading: false,
				error: null,
				data: []
			};
		},
		componentDidMount: function() {
			this.loadNotificationsFromServer();
		},
		render: function() {
			var loading;
			if (this.state.loading) {
				loading = React.createElement("div", {className: "box-loading"}, React.createElement("img", {src: "/images/loading.svg"}))
			}

			if (this.state.error) {
				return (
					React.createElement("div", {className: "github-status box box-has-error"}, 
						loading, 
						React.createElement(App.Views.Error, {type: this.state.error.type, data: this.state.error.data})
					)
				);
			}

			var notifications = this.state.data.map(function(notification) {
				return (
					React.createElement("tr", {key: notification.id}, 
						React.createElement("td", {className: "type"}, notification.subject.type), 
						React.createElement("td", {className: "name"}, notification.repository.full_name), 
						React.createElement("td", {className: "title"}, notification.subject.title), 
						React.createElement("td", {className: "time"}, moment(notification.updated_at).fromNow())
					)
				);
			});
			return (
				React.createElement("div", {className: "github-status box"}, 
					loading, 
					React.createElement("table", {className: "github-notifications"}, 
						notifications
					)
				)
			);
		}
	});

})(App);
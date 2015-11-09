(function(App) {

	App.Views.Github = React.createClass({
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
				loading = <div className="box-loading"><img src="/images/loading.svg" /></div>
			}

			if (this.state.error) {
				return (
					<div className="github-status box box-has-error">
						{loading}
						<App.Views.Error type={this.state.error.type} data={this.state.error.data} />
					</div>
				);
			}

			var notifications = this.state.data.map(function(notification) {
				return (
					<tr key={notification.id}>
						<td className="type">{notification.subject.type}</td>
						<td className="name">{notification.repository.full_name}</td>
						<td className="title">{notification.subject.title}</td>
						<td className="time">{moment(notification.updated_at).fromNow()}</td>
					</tr>
				);
			});
			return (
				<div className="github-status box">
					{loading}
					<table className="github-notifications">
						{notifications}
					</table>
				</div>
			);
		}
	});

})(App);
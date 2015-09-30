(function(App) {

	App.Views.Slack = React.createClass({
		loadUsersFromServer: function() {
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
						setTimeout(this.loadUsersFromServer, this.props.pollInterval);
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
			this.loadUsersFromServer();
		},
		render: function() {
			var loading;
			if (this.state.loading) {
				loading = <div className="box-loading"><img src="/images/loading.svg" /></div>
			}

			if (this.state.error) {
				return (
					<div className="slack-status box box-has-error">
						{loading}
						<App.Views.Error type={this.state.error.type} data={this.state.error.data} />
					</div>
				);
			}

			var timeline = [];
			for (var i = 0; i < 24; i++) {
				timeline[i] = [];
			}
			this.state.data.map(function(user) {
				if (!user.tz_offset) user.tz_offset = 0;
				user.local_time = App.Util.calcLocalTime(user.tz_offset).getHours();
				timeline[user.local_time].push(user);
			});

			var hours = timeline.map(function(users, hour){
				return (
					<App.Views.Slack.Hour key={hour} hour={hour} users={users} />
				);
			});
			return (
				<div className="slack-status box">
					{loading}
					<ul className="slack-timeline">
						<span className="time-marker three-am"></span>
						<span className="time-marker six-am">6am</span>
						<span className="time-marker nine-am"></span>
						<span className="time-marker twelve-pm">12pm</span>
						<span className="time-marker three-pm"></span>
						<span className="time-marker six-pm">6pm</span>
						<span className="time-marker nine-pm"></span>
						{hours}
					</ul>
				</div>
			);
		}
	});

	App.Views.Slack.Hour = React.createClass({
		render: function() {
			var users = this.props.users.map(function(user) {
				return (
					<App.Views.Slack.User key={user.id} user={user} />
				);
			});
			return (
				<li className={'slack-hour slack-hour-' + this.props.hour + ' total-' + (this.props.users.length > 4 ? 'multiple' : this.props.users.length)}>
					{users}
				</li>
			);
		}
	});

	App.Views.Slack.User = React.createClass({
		render: function() {
			return (
				<div className={'slack-user status-' + this.props.user.presence}>
					<img src={this.props.user.profile.image_48} alt="" />
					<div className="slack-user-status" title={this.props.user.presence}></div>
					<div className="slack-user-info">
						<span className="slack-user-name">{this.props.user.real_name ? this.props.user.real_name : this.props.user.name}</span>
						<span className="slack-user-local-time">Local time: {this.props.user.local_time}:00</span>
					</div>
				</div>
			);
		}
	});

})(App);
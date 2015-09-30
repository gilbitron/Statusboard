(function(App) {

	App.Views.Helpscout = React.createClass({displayName: "Helpscout",
		loadMailboxesFromServer: function() {
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
						setTimeout(this.loadMailboxesFromServer, this.props.pollInterval);
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
			this.loadMailboxesFromServer();
		},
		render: function() {
			var loading;
			if (this.state.loading) {
				loading = React.createElement("div", {className: "box-loading"}, React.createElement("img", {src: "/images/loading.svg"}))
			}

			if (this.state.error) {
				return (
					React.createElement("div", {className: "helpscout-status box box-has-error"}, 
						loading, 
						React.createElement(App.Views.Error, {type: this.state.error.type, data: this.state.error.data})
					)
				);
			}

			var mailboxes = this.state.data.map(function(mailbox) {
				return (
					React.createElement("tr", {key: mailbox.id}, 
						React.createElement("td", {className: "name"}, mailbox.name), 
						React.createElement("td", {className: "unassigned"}, mailbox.folders[0].activeCount ? mailbox.folders[0].activeCount : '\u2014'), 
						React.createElement("td", {className: "mine"}, mailbox.folders[1].activeCount ? mailbox.folders[1].activeCount : '\u2014')
					)
				);
			});
			return (
				React.createElement("div", {className: "helpscout-status box"}, 
					loading, 
					React.createElement("table", {className: "helpscout-mailboxes"}, 
						React.createElement("thead", null, 
							React.createElement("tr", null, 
								React.createElement("th", {className: "name"}, "Mailbox"), 
								React.createElement("th", {className: "unassigned"}, "Unassigned"), 
								React.createElement("th", {className: "mine"}, "Mine")
							)
						), 
						mailboxes
					)
				)
			);
		}
	});

})(App);
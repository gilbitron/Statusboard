(function(App) {

	App.Views.Helpscout = React.createClass({
		loadMailboxesFromServer: function() {
			this.setState({loading: true});
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				cache: false,
				success: function(data) {
					if (typeof data.error !== 'undefined') {
						this.setState({error: data.error});
					} else {
						this.setState({data: data, ajaxError: null});
					}
				}.bind(this),
				error: function(xhr, status, err) {
					this.setState({ajaxError: err.toString()});
					console.error(this.props.url, status, err.toString());
				}.bind(this),
				complete: function() {
					this.setState({loading: false});
					setTimeout(this.loadMailboxesFromServer, this.props.pollInterval);
				}.bind(this)
			});
		},
		getInitialState: function() {
			return {
				loading: false,
				error: null,
				ajaxError: null,
				data: []
			};
		},
		componentDidMount: function() {
			this.loadMailboxesFromServer();
		},
		render: function() {
			var loading;
			if (this.state.loading) {
				loading = <div className="box-loading"><i className="fa fa-spinner fa-spin"></i></div>
			}
			if (this.state.ajaxError) {
				loading = <div className="box-ajax-error"><i className="fa fa-exclamation-triangle" title={this.state.ajaxError}></i></div>
			}

			if (this.state.error) {
				return (
					<div className="helpscout-status box box-has-error">
						{loading}
						<App.Views.Error type={this.state.error.type} data={this.state.error.data} />
					</div>
				);
			}

			var mailboxes = null;
			if (typeof this.state.data.map !== 'undefined') {
				mailboxes = this.state.data.map(function(mailbox) {
					return (
						<tr key={mailbox.id}>
							<td className="name">{mailbox.name}</td>
							<td className="unassigned">{mailbox.folders[0].activeCount ? mailbox.folders[0].activeCount : '\u2014'}</td>
							<td className="mine">{mailbox.folders[1].activeCount ? mailbox.folders[1].activeCount : '\u2014'}</td>
						</tr>
					);
				});
			}
			return (
				<div className="helpscout-status box">
					{loading}
					<table className="helpscout-mailboxes">
						<thead>
							<tr>
								<th className="name">Mailbox</th>
								<th className="unassigned">Unassigned</th>
								<th className="mine">Mine</th>
							</tr>
						</thead>
						{mailboxes}
					</table>
				</div>
			);
		}
	});

})(App);
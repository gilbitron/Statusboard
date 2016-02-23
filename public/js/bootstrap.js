var App = {
	Util: {},
	Views: {}
};

App.Util.calcLocalTime = function(tzOffset) {
	var d = new Date();
	var utc = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
	return new Date(utc.getTime() + (tzOffset * 1000));
};

$.ajaxSetup({
	timeout: 30000
});
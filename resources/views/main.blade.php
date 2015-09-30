<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Statusboard</title>

	<link rel="stylesheet" href="{{ url('bower_components/normalize.css/normalize.css') }}">
	<link rel="stylesheet" href="{{ url('css/style.css') }}">

	<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
</head>
<body>
	<div id="content"></div>

	<script src="{{ url('bower_components/moment/min/moment.min.js') }}"></script>
	<script src="{{ url('js/bootstrap.js') }}"></script>
	<script src="{{ url('js/react/error.js') }}"></script>
	<script src="{{ url('js/react/slack.js') }}"></script>
	<script src="{{ url('js/react/github.js') }}"></script>
	<script src="{{ url('js/react/helpscout.js') }}"></script>
	<script src="{{ url('js/react/app.js') }}"></script>
</body>
</html>

# Statusboard

![Statusboard Preview](https://raw.githubusercontent.com/gilbitron/Statusboard/master/preview.png)

### Requirements

* PHP >= 5.5.9

### Install

1. Download/clone and run `composer install`
2. Setup and run as a website (Either run `docker-compose up -d` to run as a Docker container or setup manually using something like MAMP)
3. Create a [Slack app](https://api.slack.com/applications/new) and a [GitHub app](https://github.com/settings/applications/new). Set the redirect URI's to whatever address you setup in step 2
4. Rename `.env.example` to `.env` and fill in the required information

Note: The Slack app needs the `identify` and `users:read` scopes.

### Usage

I recommend using [Fluid](http://fluidapp.com/) to make it feel more like an "app" and
add it to your dock. Point fluid to your web address and add an icon if you want.

Once the app is up and running you will need to authenticate with Slack and GitHub. Follow onscreen instructions.
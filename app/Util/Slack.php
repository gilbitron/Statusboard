<?php

namespace App\Util;

use Cache;
use App\Util;
use Frlnc\Slack\Http\SlackResponseFactory;
use Frlnc\Slack\Http\CurlInteractor;
use Frlnc\Slack\Core\Commander;

class Slack {

	public final static function execute($command, $params = [])
	{
		if (!Cache::has('slack_token')) {
			return new Util\OauthTokenError('Slack', url('auth/slack'));
		}

		try {
			$interactor = new CurlInteractor();
			$interactor->setResponseFactory(new SlackResponseFactory());
			$commander = new Commander(Cache::get('slack_token'), $interactor);

			$response = $commander->execute($command, $params);
			return $response->getBody();
		}
		catch (\Exception $e) {
		}

		return false;
	}

}
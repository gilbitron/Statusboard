<?php

namespace App\Util;

use Cache;
use App\Util;
use Github\Client as GithubClient;

class Github {

	/**
	 * Return GitHub notifications
	 *
	 * @return OauthTokenError|mixed
	 */
	public final static function notifications()
	{
		if (!Cache::has('github_token')) {
			return new Util\OauthTokenError('GitHub', url('auth/github'));
		}

		try {
			$client = new GithubClient();
			$client->authenticate(Cache::get('github_token'), null, GithubClient::AUTH_URL_TOKEN);
			return $client->api('notification')->all(true, false, new \DateTime('-24 hours'));
		}
		catch (\Exception $e) {
		}

		return false;
	}

}
<?php

namespace App\Http\Controllers;

use Cache;
use Illuminate\Http\Request;

class AuthController {

	public function slack(Request $request)
	{
		if (Cache::has('slack_token')) {
			return redirect('/');
		}

		$provider = new \League\OAuth2\Client\Provider\GenericProvider([
			'clientId'                => env('SLACK_CLIENT_ID'),
			'clientSecret'            => env('SLACK_CLIENT_SECRET'),
			'redirectUri'             => url('auth/slack'),
			'urlAuthorize'            => 'https://slack.com/oauth/authorize',
			'urlAccessToken'          => 'https://slack.com/api/oauth.access',
			'urlResourceOwnerDetails' => '',
		]);

		if (!$request->get('code')) {
			$authorizationUrl = $provider->getAuthorizationUrl();

			$request->session()->put('oauth2state', $provider->getState());

			return redirect($authorizationUrl);
		} elseif (empty($request->get('state')) ||
		          ($request->get('state') !== $request->session()->get('oauth2state'))
		) {
			$request->session()->forget('oauth2state');
			exit('Invalid state');
		} else {
			try {
				$accessToken = $provider->getAccessToken('authorization_code', [
					'code' => $request->get('code'),
				]);

				$token = $accessToken->getToken();

				Cache::put('slack_token', $token, 60 * 24 * 30);
			}
			catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
				exit($e->getMessage());
			}
		}

		return redirect('/');
	}

	public function github(Request $request)
	{
		if (Cache::has('github_token')) {
			return redirect('/');
		}

		$provider = new \League\OAuth2\Client\Provider\Github([
			'clientId'          => env('GITHUB_CLIENT_ID'),
			'clientSecret'      => env('GITHUB_CLIENT_SECRET'),
			'redirectUri'       => url('auth/github'),
		]);

		if (!$request->get('code')) {
			$authorizationUrl = $provider->getAuthorizationUrl([
				'scope' => ['notifications']
			]);

			$request->session()->put('oauth2state', $provider->getState());

			return redirect($authorizationUrl);
		} elseif (empty($request->get('state')) ||
		          ($request->get('state') !== $request->session()->get('oauth2state'))
		) {
			$request->session()->forget('oauth2state');
			exit('Invalid state');
		} else {
			try {
				$accessToken = $provider->getAccessToken('authorization_code', [
					'code' => $request->get('code'),
				]);

				$token = $accessToken->getToken();

				Cache::put('github_token', $token, 60 * 24 * 30);
			}
			catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
				exit($e->getMessage());
			}
		}

		return redirect('/');
	}

}
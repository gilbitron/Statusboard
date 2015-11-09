<?php

namespace App\Http\Controllers;

use Cache;
use App\Util;

class ApiController {

	/**
	 * Return a list of Slack users with their "presence" status
	 *
	 * GET /api/slack-users
	 *
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function getSlackUsers()
	{
		if (Cache::has('slack_users')) {
			return response()->json(Cache::get('slack_users'));
		}

		$slackUsers = [];

		$users = $this->handleAuthError(Util\Slack::execute('users.list'));
		if ($users) {
			foreach ($users['members'] as $user) {
				if ($user['deleted']) continue;

				$presence = $this->handleAuthError(Util\Slack::execute('users.getPresence', ['user' => $user['id']]));
				$user['presence'] = isset($presence['presence']) ? $presence['presence'] : 'away';
				$slackUsers[] = $user;
			}

			Cache::put('slack_users', $slackUsers, 5);
		}

		return response()->json($slackUsers);
	}

	/**
	 * Return Help Scout mailboxes
	 *
	 * GET /api/helpscout-mailboxes
	 *
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function getHelpscoutMailboxes()
	{
		if (Cache::has('helpscout_mailboxes')) {
			return response()->json(Cache::get('helpscout_mailboxes'));
		}

		$mailboxes = Util\Helpscout::mailboxes();
		if ($mailboxes) {
			Cache::put('helpscout_mailboxes', $mailboxes, 5);
		}

		return response()->json($mailboxes);
	}

	/**
	 * Return recent GitHub notifications
	 *
	 * GET /api/github-notifications
	 *
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function getGithubNotifications()
	{
		if (Cache::has('github_notifications')) {
			return response()->json(Cache::get('github_notifications'));
		}

		$notifications = $this->handleAuthError(Util\Github::notifications());
		if ($notifications) {
			Cache::put('github_notifications', $notifications, 5);
		}

		return response()->json($notifications);
	}

	/**
	 * If there is an authentication error end the response.
	 * Otherwise return the data.
	 *
	 * @param \App\Util\OauthTokenError|mixed $data
	 * @return mixed
	 */
	protected function handleAuthError($data)
	{
		if (is_a($data, 'App\Util\OauthTokenError')) {
			header('Content-Type: application/json');
			echo json_encode([
				'error' => [
					'type' => 'OauthTokenError',
					'data' => $data->getData(),
				],
			]);
			exit;
		}

		return $data;
	}

}
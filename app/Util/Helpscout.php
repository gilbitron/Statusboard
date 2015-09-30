<?php

namespace App\Util;

class Helpscout {

	public final static function mailboxes()
	{
		try {
			$mailbox_arr = [];

			$mailboxes = self::get('mailboxes.json?fields=id');
			if ($mailboxes) {
				foreach ($mailboxes->items as $mailbox) {
					$mailbox_data = self::get('mailboxes/' . $mailbox->id . '.json');
					$mailbox_arr[] = $mailbox_data->item;
				}
			}

			return $mailbox_arr;
		}
		catch (\Exception $e) {
		}

		return false;
	}

	public final static function get($endpoint)
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, 'https://api.helpscout.net/v1/' . $endpoint);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_USERPWD, env('HELPSCOUT_API_KEY') . ':X');
		$data = curl_exec($ch);
		curl_close($ch);

		if ($data !== false) {
			$data = json_decode($data);
		}

		return $data;
	}

}
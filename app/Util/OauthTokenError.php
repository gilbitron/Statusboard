<?php

namespace App\Util;

class OauthTokenError {

	protected $service;
	protected $auth_url;

	public function __construct($service, $auth_url)
	{
		$this->service = $service;
		$this->auth_url = $auth_url;
	}

	public function getService()
	{
		return $this->service;
	}

	public function getAuthUrl()
	{
		return $this->auth_url;
	}

	public function getData()
	{
		return [
			'service'  => $this->service,
			'auth_url' => $this->auth_url,
		];
	}

}
<?php

// Mail account settings used to send emails

// PHPMailer is used

self::$account = array(
    'mail_host' => 'smtp.gmail.com', // server, eg 'imap.gmail.com' | 'localhost'
    'debug_level' => 0, // enables SMTP debug information (for testing)
    					// 0 = none
                        // 1 = errors and messages
                        // 2 = messages only
    'smtp_auth' => TRUE,  // enable SMTP authentication
    'encryption' => 'ssl', // connection prefix to server: '', 'ssl' or 'tls'
    'port_outgoing' => '465', // TLS port: 587
    'username'=> "mail@gmail.com", // username
    'password'=>  "letmein", // password
    'from_address' => 'replyto@gmail.com',
    'display_name' => 'Dropinbase Administrator'
);

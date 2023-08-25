<?php
// The /peff/Template/environment.js request is made once when the application is refreshed
// It returns values accessible via dibCommon.env.xxx in client side code and HTML attributes etc.
// You can add values or JavaScript code to the $response below...
// NOTE: do not remove existing values.
session_start();

if (empty($_SESSION['DibSettings'])) {
    $settings = $this->getSettings("`name` IN ('auditTrailContainerName','defaultDateTimeFormat','defaultDateFormat','backgroundPalette','warnPalette','primaryPalette','accentPalette')", 'pef_setting');
    $_SESSION['DibSettings'] = json_encode($settings);
}
$settings = json_decode($_SESSION['DibSettings'],true);

// Values 
$args = array(
    // REMOVE:
    'secure_id' => (isset(DIB::$USER['secure_id']) ? DIB::$USER['secure_id'] : null), 
    'user_id' => DIB::$USER['id'],
    'translations' => ['en-US','af-ZA'],
    'environment' => getenv('environment')!='prod' ? DIB::$ENVIRONMENT : getenv('environment'),
    'username' => DIB::$USER['username'],
    'perm_group' => DIB::$USER['perm_group'],
    'site_name' => DIB::$SITENAME,    
    'logo' => DIB::$SITELOGO,
    'user_fullname' => DIB::$USER['title'] . ' ' . DIB::$USER['initials'] . ' ' . DIB::$USER['last_name'] ,
    'default_date_time_format' => (isset($settings['defaultDateTimeFormat']) ? $settings['defaultDateTimeFormat'] : 'YYYY/MM/DD HH:mm'),
    'default_date_format' => (isset($settings['defaultDateFormat']) ? $settings['defaultDateFormat'] : 'YYYY/MM/DD'),
    'audit_trail_container' => (isset($settings['auditTrailContainerName']) ? $settings['auditTrailContainerName'] : 'dibAuditTrailGrid'),
    'audit_trail_port' => '',
    'help_edit_container' => 'dibHelpForm',
    'default_url' => isset(DIB::$USER['default_url']) ? DIB::$USER['default_url'] : '',
    'base_url' => DIB::$BASEURL,
    'remember_tabs' => (DIB::$USER['remember_tabs'] == '1') ? TRUE : FALSE,
    'background_palette' => (isset($settings['backgroundPalette']) ? $settings['backgroundPalette'] : 'dibBackground'),
    'warn_palette' => (isset($settings['warnPalette']) ? $settings['warnPalette'] : 'dibWarn'),
    'primary_palette' => (isset($settings['primaryPalette']) ? $settings['primaryPalette'] : 'dibPrimary'),
    'accent_palette' => (isset($settings['accentPalette']) ? $settings['accentPalette'] : 'dibAccent'),
    'queue_retry_count' => DIB::$ASYNCRETRYCOUNT,
    'nodejs' => (!empty(DIB::$NODEJSHOST)) ? TRUE : FALSE,  
    'nodejs_server_host' => DIB::$NODEJSHOST,
    'debug' => DIB::$CLIENT_DEBUG_LEVEL,
    'can_dib_design' => $canDibDesign ,
    'loaderType' => 'ball-scale-ripple-multiple',
    'loaderColor' => '#6c3d91'
);
$response = 'var DIB = ' . str_replace('","', "\",\r\n\"", json_encode($args));
$response .= "
    DIB['load_time'] = new Date().getTime();
    if (document.location.pathname=='/') {
        document.location.href=DIB.default_url; 
    }
";
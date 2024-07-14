CREATE TABLE IF NOT EXISTS `accelerometer` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_values_0` double DEFAULT '0',
  `double_values_1` double DEFAULT '0',
  `double_values_2` double DEFAULT '0',
  `accuracy` int(11) DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `applications_crashes` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `package_name` text,
  `application_name` text,
  `application_version` double DEFAULT '0',
  `error_short` text,
  `error_long` text,
  `error_condition` int(11) DEFAULT '0',
  `is_system_app` int(11) DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `applications_foreground` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `package_name` text,
  `application_name` text,
  `is_system_app` int(11) DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `applications_history` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `package_name` text,
  `application_name` text,
  `process_importance` int(11) DEFAULT '0',
  `process_id` int(11) DEFAULT '0',
  `double_end_timestamp` double DEFAULT '1',
  `is_system_app` int(11) DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `applications_notifications` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `package_name` text,
  `application_name` text,
  `text` text,
  `sound` text,
  `vibrate` text,
  `defaults` int(11) DEFAULT '-1',
  `flags` int(11) DEFAULT '-1',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `aware_device` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `board` text,
  `brand` text,
  `device` text,
  `build_id` text,
  `hardware` text,
  `manufacturer` text,
  `model` text,
  `product` text,
  `serial` text,
  `release` text,
  `release_type` text,
  `sdk` text,
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `aware_log` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `log_message` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `aware_studies` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `study_url` text,
  `study_key` int(11) DEFAULT '-1', -- TODO: Remove
  `study_api` text,                 -- TODO: Remove
  `study_pi` text,
  `study_config` text,
  `study_title` text,
  `study_description` text,
  `double_join` double DEFAULT '0',
  `double_exit` double DEFAULT '0',
  `study_compliance` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `barometer` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_values_0` double DEFAULT '0',
  `accuracy` int(11) DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `battery` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `battery_status` int(11) DEFAULT '0',
  `battery_level` int(11) DEFAULT '0',
  `battery_scale` int(11) DEFAULT '0',
  `battery_voltage` int(11) DEFAULT '0',
  `battery_temperature` int(11) DEFAULT '0',
  `battery_adaptor` int(11) DEFAULT '0',
  `battery_health` int(11) DEFAULT '0',
  `battery_technology` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `battery_charges` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `battery_start` int(11) DEFAULT '0',
  `battery_end` int(11) DEFAULT '0',
  `double_end_timestamp` double DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `battery_discharges` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `battery_start` int(11) DEFAULT '0',
  `battery_end` int(11) DEFAULT '0',
  `double_end_timestamp` double DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `bluetooth` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `bt_address` varchar(150) DEFAULT '',
  `bt_name` text,
  `bt_rssi` int(11) DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `calls` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `call_type` int(11) DEFAULT '0',
  `call_duration` int(11) DEFAULT '0',
  `trace` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `cdma` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `base_station_id` int(11) DEFAULT '0',
  `double_base_station_latitude` double DEFAULT '0',
  `double_base_station_longitude` double DEFAULT '0',
  `network_id` int(11) DEFAULT '0',
  `system_id` int(11) DEFAULT '0',
  `signal_strength` int(11) DEFAULT '-1',
  `cdma_ecio` int(11) DEFAULT '-1',
  `evdo_dbm` int(11) DEFAULT '-1',
  `evdo_ecio` int(11) DEFAULT '-1',
  `evdo_snr` int(11) DEFAULT '-1',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `esms` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `esm_json` text,
  `esm_status` int(11) DEFAULT '0',
  `esm_expiration_threshold` int(11) DEFAULT '0',
  `esm_notification_timeout` int(11) DEFAULT '0',
  `double_esm_user_answer_timestamp` double DEFAULT '0',
  `esm_user_answer` text,
  `esm_trigger` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `fitbit_data` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `fitbit_id` text,
  `fitbit_data_type` text,
  `fitbit_data` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `fitbit_devices` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `fitbit_id` text,
  `fitbit_version` text,
  `fitbit_battery` text,
  `fitbit_mac` text,
  `fitbit_last_sync` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `fused_geofences` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `geofence_label` text,
  `double_latitude` double DEFAULT NULL,
  `double_longitude` double DEFAULT NULL,
  `double_radius` double DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `fused_geofences_data` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `geofence_label` text,
  `double_latitude` double DEFAULT NULL,
  `double_longitude` double DEFAULT NULL,
  `double_distance` double DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `gravity` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_values_0` double DEFAULT '0',
  `double_values_1` double DEFAULT '0',
  `double_values_2` double DEFAULT '0',
  `accuracy` int(11) DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `gsm` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `cid` int(11) DEFAULT '-1',
  `lac` int(11) DEFAULT '-1',
  `psc` int(11) DEFAULT '0',
  `signal_strength` int(11) DEFAULT '-1',
  `bit_error_rate` int(11) DEFAULT '-1',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `gsm_neighbor` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `cid` int(11) DEFAULT '-1',
  `lac` int(11) DEFAULT '-1',
  `psc` int(11) DEFAULT '-1',
  `signal_strength` int(11) DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `gyroscope` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_values_0` double DEFAULT '0',
  `double_values_1` double DEFAULT '0',
  `double_values_2` double DEFAULT '0',
  `accuracy` int(11) DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `installations` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `package_name` text,
  `application_name` text,
  `installation_status` int(11) DEFAULT '-1',
  `version_name` text,
  `version_code` int(11) DEFAULT '-1',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `keyboard` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `package_name` text,
  `before_text` text,
  `current_text` text,
  `is_password` int(11) DEFAULT '-1',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `light` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_light_lux` double DEFAULT '0',
  `accuracy` int(11) DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `linear_accelerometer` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_values_0` double DEFAULT '0',
  `double_values_1` double DEFAULT '0',
  `double_values_2` double DEFAULT '0',
  `accuracy` int(11) DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `locations` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_latitude` double DEFAULT '0',
  `double_longitude` double DEFAULT '0',
  `double_bearing` double DEFAULT '0',
  `double_speed` double DEFAULT '0',
  `double_altitude` double DEFAULT '0',
  `provider` text,
  `accuracy` double DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `magnetometer` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_values_0` double DEFAULT '0',
  `double_values_1` double DEFAULT '0',
  `double_values_2` double DEFAULT '0',
  `accuracy` int(11) DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `messages` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `message_type` int(11) DEFAULT '0',
  `trace` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `mqtt_history` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `timestamp` double NOT NULL,
  `topic` text NOT NULL,
  `message` text NOT NULL,
  `receivers` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `network` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `network_type` int(11) DEFAULT '0',
  `network_subtype` text,
  `network_state` int(11) DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `network_traffic` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `network_type` int(11) DEFAULT '0',
  `double_received_bytes` double DEFAULT '0',
  `double_sent_bytes` double DEFAULT '0',
  `double_received_packets` double DEFAULT '0',
  `double_sent_packets` double DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `plugin_ambient_noise` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_frequency` double DEFAULT '0',
  `double_decibels` double DEFAULT '0',
  `double_rms` double DEFAULT '0',
  `is_silent` int(11) DEFAULT '0',
  `double_silence_threshold` double DEFAULT '0',
  `blob_raw` blob,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `plugin_contacts` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `name` text,
  `phone_numbers` text,
  `emails` text,
  `groups` text,
  `sync_date` double DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `plugin_device_usage` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_elapsed_device_on` double DEFAULT '0',
  `double_elapsed_device_off` double DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `plugin_google_activity_recognition` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `activity_name` text,
  `activity_type` int(11) DEFAULT '0',
  `confidence` int(11) DEFAULT '0',
  `activities` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `plugin_google_login` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `name` text,
  `email` text,
  `phonenumber` text,
  `blob_picture` blob,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `plugin_openweather` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `city` text,
  `temperature` double DEFAULT '0',
  `temperature_max` double DEFAULT '0',
  `temperature_min` double DEFAULT '0',
  `unit` text,
  `humidity` double DEFAULT '0',
  `pressure` double DEFAULT '0',
  `wind_speed` double DEFAULT '0',
  `wind_degrees` double DEFAULT '0',
  `cloudiness` double DEFAULT '0',
  `rain` double DEFAULT '0',
  `snow` double DEFAULT '0',
  `sunrise` double DEFAULT '0',
  `sunset` double DEFAULT '0',
  `weather_icon_id` int(11) DEFAULT '0',
  `weather_description` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `plugin_studentlife_audio_android` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `datatype` int(11) DEFAULT '0',
  `double_energy` double DEFAULT '0',
  `inference` int(11) DEFAULT '-1',
  `blob_feature` blob,
  `double_convo_start` double DEFAULT '0',
  `double_convo_end` double DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `proximity` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_proximity` double DEFAULT '0',
  `accuracy` int(11) DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `rotation` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_values_0` double DEFAULT '0',
  `double_values_1` double DEFAULT '0',
  `double_values_2` double DEFAULT '0',
  `double_values_3` double DEFAULT '0',
  `accuracy` int(11) DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `rotation_edited` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_values_0` double DEFAULT '0',
  `double_values_1` double DEFAULT '0',
  `double_values_2` double DEFAULT '0',
  `double_values_3` double DEFAULT '0',
  `accuracy` int(11) DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `screen` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `screen_status` int(11) DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `sensor_accelerometer` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_sensor_maximum_range` double DEFAULT '0',
  `double_sensor_minimum_delay` double DEFAULT '0',
  `sensor_name` text,
  `double_sensor_power_ma` double DEFAULT '0',
  `double_sensor_resolution` double DEFAULT '0',
  `sensor_type` text,
  `sensor_vendor` text,
  `sensor_version` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `sensor_barometer` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_sensor_maximum_range` double DEFAULT '0',
  `double_sensor_minimum_delay` double DEFAULT '0',
  `sensor_name` text,
  `double_sensor_power_ma` double DEFAULT '0',
  `double_sensor_resolution` double DEFAULT '0',
  `sensor_type` text,
  `sensor_vendor` text,
  `sensor_version` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `sensor_bluetooth` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `bt_address` varchar(150) DEFAULT '',
  `bt_name` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `sensor_gravity` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_sensor_maximum_range` double DEFAULT '0',
  `double_sensor_minimum_delay` double DEFAULT '0',
  `sensor_name` text,
  `double_sensor_power_ma` double DEFAULT '0',
  `double_sensor_resolution` double DEFAULT '0',
  `sensor_type` text,
  `sensor_vendor` text,
  `sensor_version` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `sensor_gyroscope` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_sensor_maximum_range` double DEFAULT '0',
  `double_sensor_minimum_delay` double DEFAULT '0',
  `sensor_name` text,
  `double_sensor_power_ma` double DEFAULT '0',
  `double_sensor_resolution` double DEFAULT '0',
  `sensor_type` text,
  `sensor_vendor` text,
  `sensor_version` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `sensor_light` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_sensor_maximum_range` double DEFAULT '0',
  `double_sensor_minimum_delay` double DEFAULT '0',
  `sensor_name` text,
  `double_sensor_power_ma` double DEFAULT '0',
  `double_sensor_resolution` double DEFAULT '0',
  `sensor_type` text,
  `sensor_vendor` text,
  `sensor_version` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `sensor_linear_accelerometer` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_sensor_maximum_range` double DEFAULT '0',
  `double_sensor_minimum_delay` double DEFAULT '0',
  `sensor_name` text,
  `double_sensor_power_ma` double DEFAULT '0',
  `double_sensor_resolution` double DEFAULT '0',
  `sensor_type` text,
  `sensor_vendor` text,
  `sensor_version` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `sensor_magnetometer` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_sensor_maximum_range` double DEFAULT '0',
  `double_sensor_minimum_delay` double DEFAULT '0',
  `sensor_name` text,
  `double_sensor_power_ma` double DEFAULT '0',
  `double_sensor_resolution` double DEFAULT '0',
  `sensor_type` text,
  `sensor_vendor` text,
  `sensor_version` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `sensor_proximity` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_sensor_maximum_range` double DEFAULT '0',
  `double_sensor_minimum_delay` double DEFAULT '0',
  `sensor_name` text,
  `double_sensor_power_ma` double DEFAULT '0',
  `double_sensor_resolution` double DEFAULT '0',
  `sensor_type` text,
  `sensor_vendor` text,
  `sensor_version` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `sensor_rotation` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_sensor_maximum_range` double DEFAULT '0',
  `double_sensor_minimum_delay` double DEFAULT '0',
  `sensor_name` text,
  `double_sensor_power_ma` double DEFAULT '0',
  `double_sensor_resolution` double DEFAULT '0',
  `sensor_type` text,
  `sensor_vendor` text,
  `sensor_version` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `sensor_temperature` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `double_sensor_maximum_range` double DEFAULT '0',
  `double_sensor_minimum_delay` double DEFAULT '0',
  `sensor_name` text,
  `double_sensor_power_ma` double DEFAULT '0',
  `double_sensor_resolution` double DEFAULT '0',
  `sensor_type` text,
  `sensor_vendor` text,
  `sensor_version` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `sensor_wifi` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `mac_address` text,
  `ssid` text,
  `bssid` varchar(255) DEFAULT '',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `significant` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `is_moving` int(11) DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `telephony` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `data_enabled` int(11) DEFAULT '0',
  `imei_meid_esn` text,
  `software_version` text,
  `line_number` text,
  `network_country_iso_mcc` text,
  `network_operator_code` text,
  `network_operator_name` text,
  `network_type` int(11) DEFAULT '0',
  `phone_type` int(11) DEFAULT '0',
  `sim_state` int(11) DEFAULT '0',
  `sim_operator_code` text,
  `sim_operator_name` text,
  `sim_serial` text,
  `subscriber_id` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `temperature` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `temperature_celsius` double DEFAULT '0',
  `accuracy` int(11) DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `timezone` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `timezone` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `touch` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `touch_app` text,
  `touch_action` text,
  `touch_action_text` text,
  `scroll_items` int(11) DEFAULT '-1',
  `scroll_from_index` int(11) DEFAULT '-1',
  `scroll_to_index` int(11) DEFAULT '-1',
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `wifi` (
  `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` double DEFAULT '0',
  `device_id` varchar(150) DEFAULT '',
  `bssid` varchar(255) DEFAULT '',
  `ssid` text,
  `security` text,
  `frequency` int(11) DEFAULT '0',
  `rssi` int(11) DEFAULT '0',
  `label` text,
  PRIMARY KEY (`_id`),
  KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `screentext` (
    `_id` bigint unsigned NOT NULL AUTO_INCREMENT,
    `timestamp` double DEFAULT '0',
    `device_id` varchar(150) DEFAULT '',
    `class_name` varchar(150) DEFAULT '',
    `package_name` varchar(150) DEFAULT '',
    `text` longtext,
    `user_action` int(11) DEFAULT '0',
    `event_type` int(11) DEFAULT '0',
    PRIMARY KEY (`_id`),
    KEY `time_device` (`timestamp`,`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `screenshot` (
     `_id` bigint NOT NULL AUTO_INCREMENT,
    `timestamp` double DEFAULT '0',
    `device_id` varchar(150) DEFAULT '',
    `image_data` blob,
    PRIMARY KEY (`_id`),
    KEY `time_device` (`timestamp`, `device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
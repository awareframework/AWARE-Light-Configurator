#! /bin/bash

nohup gunicorn aware_light_config_Django.wsgi -c util/gunicorn.conf &
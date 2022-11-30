# aware-light-config-Django
Use the Django framework to setup the configurator for AWARE-light

* Technology Stack:
  * back-end: [Django](https://www.djangoproject.com/)
  * front-end: [React](https://reactjs.org/)
    * UI Component: [Material UI](https://mui.com/)
* Please install the latest [python](https://www.python.org/downloads/) and [nodejs](https://nodejs.org/en/) in advanced


Initializing Environment Guide:
1. `pip install -r requirements.txt` install python dependencies
2. `cd reactapp` enter react file
3. `npm install` install javascript dependencies
4. `npm run build` build react file
5. `cd ..` 
6. `python manage.py runserver 8000` run application

Developing Frontend Code Guide:
1. `cd reactapp` 
2. `npm run build`
3. `serve -s build` start server
4. `npm start` (run this if step3 not works)


## Deployment Guide without SSL setting:
1. clone repository 
`git clone https://github.com/awareframework/AWARE-Light-Configurator.git`
2. make sure nginx and gunicorn is installed on the server
3. modify preparation.sh file
```
# please enter the correct ip address
REPLACEABLE_IP_ADDR=""

...

# please correct the nginx path if you install nginx in other place.
NGINX_PATH=/etc/nginx/
```
4. run preparation.sh `bash preparation.sh`
5. run start.sh `bash start.sh`


## Deployment Guide with SSL setting:
1. clone repository 
`git clone https://github.com/awareframework/AWARE-Light-Configurator.git`
2. make sure nginx and gunicorn is installed on the server
3. create `cert` directory in root path `mkdir cert`
4. upload certificate file to `<project_root_path>/cert` directory
5. modify preparation.sh file
```
# please enter the correct ip address
REPLACEABLE_IP_ADDR=""

# please enter the certificate file name for ssl setting
REPLACEABLE_CERTIFICATE=""
REPLACEABLE_CERTIFICATE_KEY=""

# please correct the nginx path if you install nginx in other place.
NGINX_PATH=/etc/nginx/
```
6. run preparation.sh `bash preparation.sh -e`
7. run start.sh `bash start.sh`

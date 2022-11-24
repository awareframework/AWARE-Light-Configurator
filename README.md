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



Deploying Guide:
1. clone repository 
`git clone https://github.com/awareframework/AWARE-Light-Configurator.git`
2. make sure nginx and gunicorn is installed on the server
3. modify preparation.sh file
```
# please enter the correct ip address and port number
REPLACEABLE_IP_ADDR="localhost"
REPLACEABLE_PORT_NUM="8000"  # please use 80 as default production environment port number
```
4. run preparation.sh
`bash preparation.sh`
5. run start.sh
`bash start.sh`

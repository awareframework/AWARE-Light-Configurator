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
2. `npm i sass --save-dev`
3. `npm run build`
4. `serve -s build` start server
5. `npm start` (run this if step3 not works)

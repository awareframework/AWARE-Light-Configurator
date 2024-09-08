# aware-light-config-Django

Use the Django framework to setup the configurator for AWARE-light

* Technology Stack:
  * back-end: [Django](https://www.djangoproject.com/)
  * front-end: [React](https://reactjs.org/)
    * UI Component: [Material UI](https://mui.com/)
* Please install the latest [python](https://www.python.org/downloads/) and [nodejs](https://nodejs.org/en/) in advanced

## Initializing Environment Guide

1. `pip install -r requirements.txt` install python dependencies
2. `cd reactapp` enter react file
3. `npm install` install javascript dependencies
4. `npm run build` build react file
5. `cd ..`
6. `python manage.py runserver 8000` run application

## Developing Frontend Code Guide

1. `cd reactapp`
2. `npm run build`
3. `serve -s build` start server
4. `npm start` (run this if step3 not works)

## Testing the application on localhost

Follow these steps to run the app locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/awareframework/AWARE-Light-Configurator.git
   ```

2. Set up the backend:

   * Install the required Python packages:

     ```bash
     pip install -r requirements.txt
     ```

   * Update `aware_light_config_Django/settings.py`:
     Add `"127.0.0.1"` to `ALLOWED_HOSTS`:

     ```python
     ALLOWED_HOSTS = ["127.0.0.1"]
     ```

3. Set up the frontend:

   * Navigate to the React app directory:

     ```bash
     cd reactapp
     ```

   * Install the required npm packages:

     ```bash
     npm install
     ```

   * Update `reactapp/src/settings`:

     ```javascript
     const config = {
       SERVER_PROTOCOL: "http",
       SERVER_IP: "127.0.0.1",
       SERVER_PORT: [8000],
     };
     ```

4. Build the React app:

   ```bash
   npm run build
   ```

5. Run the Django server:

   ```bash
   python manage.py runserver
   ```

6. Open your browser and visit `http://127.0.0.1:8000` to view the app.

**Note:** When testing the app locally, you don't need to run the frontend app separately on port 3000. The Django server will serve the built React app.

## Deployment Guide without SSL setting

1. clone repository
`git clone https://github.com/awareframework/AWARE-Light-Configurator.git`
2. make sure nginx and gunicorn is installed on the server
3. modify preparation.sh file

    ```bash
    # please enter the correct ip address
    REPLACEABLE_IP_ADDR=""

    ...

    # please correct the nginx path if you install nginx in other place.
    NGINX_PATH=/etc/nginx/
    ```

4. run preparation.sh `bash preparation.sh`
5. run start.sh `bash start.sh`

## Deployment Guide with SSL setting

1. clone repository
`git clone https://github.com/awareframework/AWARE-Light-Configurator.git`
2. make sure nginx and gunicorn is installed on the server
3. create `cert` directory in AWARE project root path `mkdir cert`
4. upload certificate file to `<project_root_path>/cert` directory
5. modify preparation.sh file

    ```bash
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

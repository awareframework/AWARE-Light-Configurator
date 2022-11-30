#! /bin/bash

CUR_PATH=$(pwd)

REPLACEABLE_STATIC_ROOT="$(echo "$CUR_PATH" | sed 's/\//\\\//g')\/static"
REPLACEABLE_ROOT_PATH="$(echo "$CUR_PATH" | sed 's/\//\\\//g')"

# please enter the correct ip address and port number
REPLACEABLE_IP_ADDR=""
REPLACEABLE_PORT_NUM=""  # please use 80 as default production environment port number

# please enter the certificate file name for ssl setting
REPLACEABLE_CERTIFICATE=""
REPLACEABLE_CERTIFICATE_KEY=""

# please correct the nginx path if you install nginx in other place.
NGINX_PATH=/etc/nginx/



useEncryption="false"
while getopts ":e:" opt
do
    case $opt in
        e)
        useEncryption="true"
        ;;
        ?)
        echo "unknown parameter"
        exit 1;;
    esac
done


replace_parameter(){
    files=$(ls "$1")
    for file in $files
    do
        if test -d "$1/$file"
        then
            if [ "$file" != "node_modules" ]
            then
              replace_parameter "$1/$file"
            fi
        else
            sed -i "s/\[REPLACEABLE_IP_ADDR\]/$REPLACEABLE_IP_ADDR/" "$1/$file"
            sed -i "s/\[REPLACEABLE_PORT_NUM\]/$REPLACEABLE_PORT_NUM/" "$1/$file"
            sed -i "s/\[REPLACEABLE_ROOT_PATH\]/$REPLACEABLE_ROOT_PATH/" "$1/$file"
            sed -i "s/\[REPLACEABLE_STATIC_ROOT\]/$REPLACEABLE_STATIC_ROOT/" "$1/$file"
            sed -i "s/\[REPLACEABLE_CERTIFICATE\]/$REPLACEABLE_CERTIFICATE/" "$1/$file"
            sed -i "s/\[REPLACEABLE_CERTIFICATE_KEY\]/$REPLACEABLE_CERTIFICATE_KEY/" "$1/$file"
        fi
    done
}

replace_parameter "$CUR_PATH"

# install dependencies and build the package for react
cd "$CUR_PATH/reactapp" || exit
npm install
npm run build

cd "$CUR_PATH" || exit
# install dependencies for django
pip install -r requirements.txt
# collect static files to target directory
echo yes | python manage.py collectstatic

# create shortcut for nginx config file
if [ "$useEncryption" == "true" ]
then
  sudo rm "$NGINX_PATH/sites-available/AWARE-Light-Configurator_nginx"
  sudo rm "$NGINX_PATH/sites-enabled/AWARE-Light-Configurator_nginx"
  sudo ln -s "$CUR_PATH/util/nginx_config_https" "$NGINX_PATH/sites-available/AWARE-Light-Configurator_nginx"
  sudo ln -s "$CUR_PATH/util/nginx_config_https" "$NGINX_PATH/sites-enabled/AWARE-Light-Configurator_nginx"
else
  sudo rm "$NGINX_PATH/sites-available/AWARE-Light-Configurator_nginx"
  sudo rm "$NGINX_PATH/sites-enabled/AWARE-Light-Configurator_nginx"
  sudo ln -s "$CUR_PATH/util/nginx_config_http" "$NGINX_PATH/sites-available/AWARE-Light-Configurator_nginx"
  sudo ln -s "$CUR_PATH/util/nginx_config_http" "$NGINX_PATH/sites-enabled/AWARE-Light-Configurator_nginx"
fi
sudo systemctl restart nginx
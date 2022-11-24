#! /bin/bash

CUR_PATH=$(pwd)


REPLACEABLE_IP_ADDR="localhost"
REPLACEABLE_PORT_NUM="8000"
REPLACEABLE_STATIC_ROOT="$(echo "$CUR_PATH" | sed 's/\//\\\//g')\/static"
echo $REPLACEABLE_STATIC_ROOT

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
            sed -i "s/\[REPLACEABLE_STATIC_ROOT\]/$REPLACEABLE_STATIC_ROOT/" "$1/$file"
        fi
    done
}

replace_parameter "$CUR_PATH"

cd "$CUR_PATH/reactapp" || exit
npm install
npm run build

cd "$CUR_PATH" || exit
echo yes | python manage.py collectstatic
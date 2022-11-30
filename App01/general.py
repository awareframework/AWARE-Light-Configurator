import json
import logging
import os
import uuid
from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie

from aware_light_config_Django import settings

logger = logging.getLogger(__name__)
storage_path = settings.STORAGE_DIR


@ensure_csrf_cookie
def get_token(request):
    return HttpResponse("success")


def save_json_file(request):
    if request.method == "POST":
        json_str = request.body
        json_dict = json.loads(json_str)
        jsonText = json.dumps(json_dict.get('text', None))
        save(jsonText)
    return HttpResponse("success")


def save(content):
    folder = os.path.exists(storage_path)
    if not folder:
        os.makedirs(storage_path)

    file_name = str(uuid.uuid4()) + ".json"
    file = open(os.path.join(storage_path, file_name), 'w')
    file.write(content)
    file.close()
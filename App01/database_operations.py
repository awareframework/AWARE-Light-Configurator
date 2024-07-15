import json
from django.http import HttpResponse
import logging
from App01.db import check_insert_privileges, init_database
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.http import JsonResponse

logger = logging.getLogger(__name__)

@csrf_exempt
def test_connection(request):
    if request.method == "POST":
        # Validate CSRF token
        ensure_csrf_cookie(request)  # Ensure CSRF cookie is set

        json_str = request.body
        json_dict = json.loads(json_str)
        ip = json_dict.get('ip', None)
        port = json_dict.get('port', None)
        database = json_dict.get('database', None)
        username = json_dict.get('username', None)
        password = json_dict.get('password', None)

        result = check_insert_privileges(ip, port, database, username, password)
        return JsonResponse(result)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def initialize_database(request):
    if request.method == "POST":
        # Validate CSRF token
        ensure_csrf_cookie(request)  # Ensure CSRF cookie is set

        # Proceed with processing the request
        json_str = request.body
        json_dict = json.loads(json_str)
        ip = json_dict.get('ip', None)
        port = json_dict.get('port', None)
        database = json_dict.get('database', None)
        username = json_dict.get('username', None)
        password = json_dict.get('password', None)
        root_username = json_dict.get('root_username', None)
        root_password = json_dict.get('root_password', None)
        require_ssl = json_dict.get('require_ssl', None)

        result = init_database(ip, port, database, root_username, root_password, username, password, require_ssl)
        return JsonResponse(result)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

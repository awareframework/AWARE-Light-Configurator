from django.http import HttpResponse
import logging

from django.views.decorators.csrf import ensure_csrf_cookie

logger = logging.getLogger(__name__)


def test_connection(request):
    logger.warning('test logging')
    logger.info(request)
    return HttpResponse("hello")


@ensure_csrf_cookie
def get_token(request):
    return HttpResponse("success")

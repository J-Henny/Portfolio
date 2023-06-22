from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.core.mail import send_mail
import environ

env = environ.Env()


@api_view(['POST'])
@method_decorator(csrf_exempt)
def sendMail(request):
    if request.method == 'POST':
        data = request.data
        name = data['name']
        email = data['email']
        message = data['message']

        subject = f'Someone sent you a message from Hurd Haven!'
        body = f'From: {name}\n\nEmail: {email}\n\n\n\n{message}'
        send_mail(
            subject,
            body,
            env('EMAIL_HOST_USER'),
            ['jackhenry.hurd@gmail.com']
        )
        return Response(request.data, status=status.HTTP_200_OK)



    else:
        return Response(request.data, status=status.HTTP_400_BAD_REQUEST)
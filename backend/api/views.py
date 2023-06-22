from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.core.mail import send_mail

@api_view(['POST'])
@method_decorator(csrf_exempt)
def sendMail(request):
    if request.method == 'POST':
        data = request.data
        name = data['name']
        email = data['email']
        message = data['message']

        subject = f'{name} sent you a message from Hurd Haven!'
        body = message
        send_mail(
            subject,
            body,
            email,
            ['jackhenry.hurd@gmail.com']
        )
        return Response(request.data, status=status.HTTP_200_OK)



    else:
        return Response(request.data, status=status.HTTP_400_BAD_REQUEST)
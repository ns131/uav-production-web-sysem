from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Normal yoldan tokenı al
        token = super().get_token(user)

        # Token a username ekle
        token['username'] = user.username
        #token['email'] = user.email
        #token['role'] = user.role

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




"""
# JWT token oluşturma fonksiyonu
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def get_token_from_request(request):
    user = request.user  # Oturum açmış kullanıcı
    if user.is_authenticated:  # Kullanıcı giriş yapmış mı kontrol et
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            # Başarılı giriş
            tokens = get_tokens_for_user(user)
            return Response({
                "login": True, 
                "message": "Giriş başarılı!",
                'tokens': tokens
            }, status=HTTP_200_OK)
        return Response({
            "login": False, 
            "message": "E-posta veya şifre yanlış!"
        }, status=HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"logout": True, 'message': 'Çıkış başarılı'}, status=HTTP_200_OK)
        except Exception as e:
            return Response({'logout': 'Geçersiz token'}, status=HTTP_400_BAD_REQUEST)
"""
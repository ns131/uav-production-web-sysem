from django.http import JsonResponse
from django.core.paginator import Paginator
from .models import Employee
from django.db.models import Q
from django.core.exceptions import ValidationError
from employees.serializers import EmployeeSerializer


from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Kullanıcı girişi kontrolü
def get_employees(request):
    employees = Employee.objects.all()  # Tüm çalışanları al
    serializer = EmployeeSerializer(employees, many=True)  # Çalışanları serialize et
    return Response(serializer.data)  # JSON formatında geri döndür

def employee_list(request):
    # Sayfalama parametrelerini al
    page = request.GET.get('page', 1)
    length = int(request.GET.get('length', 10))  # Sayfa başına gösterilecek veri sayısı
    search_value = request.GET.get('search[value]', '')  # Arama filtresi
    
    # Sıralama parametrelerini al
    order_column = int(request.GET.get('order[0][column]', 0))  # Hangi kolon sıralanacak
    order_dir = request.GET.get('order[0][dir]', 'asc')  # Sıralama yönü (asc/desc)

    # Sıralama yapılacak kolon
    order_fields = ['first_name', 'last_name', 'user_name', 'email', 'hire_date']
    order_field = order_fields[order_column]  # Sıralama yapılacak kolon

    if order_dir == 'desc':
        order_field = '-' + order_field  # Azalan sıralama

    # Veri sorgusu
    employees = Employee.objects.all()
    
    # Arama filtresi (eğer varsa)
    if search_value:
        employees = employees.filter(
            Q(first_name__icontains=search_value) | 
            Q(last_name__icontains=search_value) |
            Q(user_name__icontains=search_value) |
            Q(email__icontains=search_value)
        )
    
    # Sayfalama işlemi
    paginator = Paginator(employees, length)
    page_obj = paginator.get_page(page)
    
    # JSON formatında yanıt dön
    data = {
        'draw': request.GET.get('draw', 1),  # DataTable'ın her AJAX çağrısında göndereceği benzersiz sayı
        'recordsTotal': employees.count(),
        'recordsFiltered': employees.count(),
        'data': list(page_obj.object_list.values('id', 'first_name', 'last_name', 'email', 'hire_date'))  # Veriyi JSON'a çevir
    }

    return JsonResponse(data)

def add_employee(request):
    if request.method == 'POST':
        try:
            # Frontend'den gelen veriyi alıyoruz
            first_name = request.POST.get('first_name')
            last_name = request.POST.get('last_name')
            user_name = request.POST.get('user_name')
            team = request.POST.get('team')  # team id'si
            email = request.POST.get('email')
            birth_date = request.POST.get('birth_date')  # 'YYYY-MM-DD' formatında
            hire_date = request.POST.get('hire_date')  # 'YYYY-MM-DD' formatında
            # Yeni çalışanı oluşturuyoruz
            employee = Employee(
                first_name=first_name,
                last_name=last_name,
                user_name=user_name,
                team_id=team,  # team_id, ForeignKey ile ilişkilendirilen team modelinin ID'si
                email=email,
                birth_date=birth_date,
                hire_date=hire_date
            )
            employee.full_clean()  # Modeldeki validasyonları tetikler
            employee.save()  # Çalışanı kaydederiz

            return JsonResponse({'message': 'Çalışan başarıyla eklendi!', 'status': 'success'}, status=201)
        except ValidationError as e:
            return JsonResponse({'message': 'Veri doğrulama hatası', 'errors': e.message_dict, 'status': 'error'}, status=400)
        except Exception as e:
            return JsonResponse({'message': str(e), 'status': 'error'}, status=500)
    else:
        return JsonResponse({'message': 'Yalnızca POST isteği kabul edilir', 'status': 'error'}, status=405)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_employee(request, employee_id):
    try:
        # Employee'yi id ile bul
        employee = Employee.objects.get(id=employee_id)
        
        # Employee'yi sil
        employee.delete()
        
        # Silme işlemi başarılıysa 204 No Content döndür
        return Response({"detail": "Personel başarıyla silindi!"}, status=status.HTTP_204_NO_CONTENT)
    
    except Employee.DoesNotExist:
        # Eğer Employee bulunamazsa, 404 Not Found döndür
        return Response({"detail": "Personel bulunamadı."}, status=status.HTTP_404_NOT_FOUND)
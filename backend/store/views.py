from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
# pyrefly: ignore [missing-import]
from .models import Product, Category, UserProfile, Order, OrderItem, Cart, CartItem

# pyrefly: ignore [missing-import]
from .serializers import ProductSerializer, CategorySerializer, CartItemSerializer, CartSerializer

def get_cart(request):
    user = request.user if request.user.is_authenticated else None
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart

from django.db.models import Q

@api_view(['GET'])
def getProducts(request):
    query = request.GET.get('search', '')
    category = request.GET.get('category', '')
    
    products = Product.objects.all()
    
    if query:
        products = products.filter(
            Q(name__icontains=query) | Q(description__icontains=query)
        )
    if category:
        products = products.filter(category__name__iexact=category)
        
    serializer = ProductSerializer(products, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def Categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)  # ✅ categories pass karo
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product, context={'request': request})
        return JsonResponse(serializer.data)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['GET'])
def cart_view(request):
    cart = get_cart(request)
    cart_items = CartItem.objects.filter(cart=cart)
    serializer = CartItemSerializer(cart_items, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def add_to_cart(request, product_id):
    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'}, status=404)
        
    cart = get_cart(request)
    cart_item, item_created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not item_created:
        cart_item.quantity += 1
        cart_item.save()
    serializer = CartItemSerializer(cart_item)
    return JsonResponse(serializer.data)

@api_view(['POST'])
def remove_from_cart(request, product_id):
    try:
        product = Product.objects.get(pk=product_id)
        cart = get_cart(request)
        cart_item = CartItem.objects.get(cart=cart, product=product)
        cart_item.delete()
        return JsonResponse({'message': 'Item removed from cart'})
    except (Product.DoesNotExist, CartItem.DoesNotExist):
        return JsonResponse({'error': 'Ipython3 manage.py runservertem not found'}, status=404)

@api_view(['POST'])
def update_cart(request, product_id):
    try:
        product = Product.objects.get(pk=product_id)
        cart = get_cart(request)
        cart_item = CartItem.objects.get(cart=cart, product=product)
    except (Product.DoesNotExist, CartItem.DoesNotExist):
        return JsonResponse({'error': 'Item not found'}, status=404)

    quantity = request.data.get('quantity', 0)
    if quantity == 0:
        cart_item.delete()
        return JsonResponse({'message': 'Item removed from cart'})

    cart_item.quantity = quantity
    cart_item.save()
    serializer = CartItemSerializer(cart_item)
    return JsonResponse(serializer.data)

@api_view(['POST'])
def create_order(request):
    cart = get_cart(request)
    cart_items = cart.items.all()
    
    if not cart_items.exists():
        return JsonResponse({'error': 'Cart is empty'}, status=400)
        
    data = request.data
    total_amount = sum(item.subtotal for item in cart_items)
    
    # Create the order
    order = Order.objects.create(
        user=request.user if request.user.is_authenticated else None,
        full_name=data.get('full_name'),
        address=data.get('address'),
        city=data.get('city'),
        postal_code=data.get('postal_code'),
        phone_number=data.get('phone_number'),
        payment_method=data.get('payment_method', 'Cash on Delivery'),
        total_amount=total_amount
    )
    
    # Create order items
    for item in cart_items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )
        
    # Clear the cart
    cart_items.delete()
    
    return JsonResponse({
        'message': 'Order created successfully',
        'order_id': order.id
    })

from .serializers import RegisterSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        refresh['username'] = user.username # Add custom claim
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'User registered successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def create_superuser_view(request):
    import os
    username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
    password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin123')
    email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
    
    if User.objects.filter(username=username).exists():
        return Response({"message": f"Superuser {username} already exists!"})
    
    try:
        User.objects.create_superuser(username, email, password)
        return Response({"message": f"Superuser {username} created successfully!"})
    except Exception as e:
        return Response({"error": str(e)}, status=500)
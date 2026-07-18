from django.http import JsonResponse
from rest_framework.decorators import api_view
# pyrefly: ignore [missing-import]
from .models import Product, Category, UserProfile, Order, OrderItem, Cart, CartItem


# pyrefly: ignore [missing-import]
from .serializers import ProductSerializer, CategorySerializer, CartItemSerializer, CartSerializer


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
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
    cart_items = CartItem.objects.all()
    serializer = CartItemSerializer(cart_items, many=True)
    return JsonResponse(serializer.data, safe=False)
@api_view(['POST'])
def add_to_cart(request, product_id):
    product = Product.objects.get(pk=product_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    cart_item, item_created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not item_created:
        cart_item.quantity += 1
        cart_item.save()
    serializer = CartItemSerializer(cart_item)
    return JsonResponse(serializer.data)
@api_view(['POST'])
def remove_from_cart(request, product_id):
    product = Product.objects.get(pk=product_id)
    cart_item = CartItem.objects.get(product=product)
    cart_item.delete()
    return JsonResponse({'message': 'Item removed from cart'})
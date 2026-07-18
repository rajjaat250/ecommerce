from django.urls import path
from .import views
urlpatterns=[
   
    path('products/',views.getProducts,name='getProducts'),
    path('categories/',views.Categories,name='categories'),
    path('products/<int:pk>/', views.getProduct, name='product_detail'),
    path('cart/', views.cart_view, name='cart'),
    path('cart/add/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/remove/<int:product_id>/', views.remove_from_cart, name='remove_from_cart'),
    
]


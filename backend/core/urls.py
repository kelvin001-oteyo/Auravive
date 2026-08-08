from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

# Register viewsets
router.register(r'moods', views.MoodViewSet, basename='mood')
router.register(r'journals', views.JournalEntryViewSet, basename='journal')
router.register(r'goals', views.GoalViewSet, basename='goal')
router.register(r'mindfulness', views.MindfulnessActivityViewSet, basename='mindfulness')
router.register(r'posts', views.CommunityPostViewSet, basename='post')
router.register(r'circles', views.SupportCircleViewSet, basename='circle')
router.register(r'resources', views.ResourceViewSet, basename='resource')
router.register(r'courses', views.CourseViewSet, basename='course')
router.register(r'psychologists', views.PsychologistViewSet, basename='psychologist')
router.register(r'bookings', views.BookingViewSet, basename='booking')

urlpatterns = [
    path('', include(router.urls)),
]
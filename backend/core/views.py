from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import *
from .serializers import *

class MoodViewSet(viewsets.ModelViewSet):
    serializer_class = MoodSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['mood_type', 'date']
    ordering_fields = ['date', 'time']
    
    def get_queryset(self):
        return Mood.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        moods = self.get_queryset()
        stats = {
            'total': moods.count(),
            'recent': moods[:5].values('mood_type', 'date'),
            'avg_mood': self.get_avg_mood(moods)
        }
        return Response(stats)
    
    def get_avg_mood(self, moods):
        mood_values = {'amazing': 5, 'good': 4, 'okay': 3, 'bad': 2, 'awful': 1}
        total = sum(mood_values.get(m.mood_type, 0) for m in moods)
        return round(total / moods.count(), 1) if moods.count() > 0 else 0

class JournalEntryViewSet(viewsets.ModelViewSet):
    serializer_class = JournalEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'entry_date']
    search_fields = ['title', 'content']
    ordering_fields = ['entry_date', 'created_at']
    
    def get_queryset(self):
        return JournalEntry.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status']
    ordering_fields = ['created_at', 'target_date']
    
    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def mark_complete(self, request, pk=None):
        goal = self.get_object()
        goal.status = 'completed'
        goal.completed_date = timezone.now()
        goal.save()
        return Response({'status': 'goal completed'})

class MindfulnessActivityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MindfulnessActivity.objects.all()
    serializer_class = MindfulnessActivitySerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['activity_type', 'is_premium']
    search_fields = ['name', 'description']

    @action(detail=False, methods=['get'])
    def recent(self, request):
        activities = self.get_queryset()[:5]
        serializer = self.get_serializer(activities, many=True)
        return Response(serializer.data)

class CommunityPostViewSet(viewsets.ModelViewSet):
    serializer_class = CommunityPostSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['content']
    ordering_fields = ['created_at', 'shares']
    
    def get_queryset(self):
        return CommunityPost.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        posts = self.get_queryset()[:5]
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        user = request.user
        if user in post.likes.all():
            post.likes.remove(user)
            liked = False
        else:
            post.likes.add(user)
            liked = True
        return Response({'liked': liked, 'likes_count': post.likes.count()})
    
    @action(detail=True, methods=['post'])
    def comment(self, request, pk=None):
        post = self.get_object()
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(post=post, user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SupportCircleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SupportCircle.objects.filter(is_active=True)
    serializer_class = SupportCircleSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['name', 'description']
    
    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        circle = self.get_object()
        if request.user not in circle.members.all():
            circle.members.add(request.user)
        return Response({'status': 'joined successfully'})
    
    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        circle = self.get_object()
        if request.user in circle.members.all():
            circle.members.remove(request.user)
        return Response({'status': 'left successfully'})

class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'is_premium', 'tags']
    search_fields = ['title', 'description', 'author']
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        resource = self.get_object()
        user = request.user
        if user in resource.likes.all():
            resource.likes.remove(user)
            liked = False
        else:
            resource.likes.add(user)
            liked = True
        return Response({'liked': liked, 'likes_count': resource.likes.count()})

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['is_premium']
    search_fields = ['title', 'description', 'instructor']
    
    @action(detail=True, methods=['post'])
    def enroll(self, request, pk=None):
        course = self.get_object()
        if request.user not in course.enrolled.all():
            course.enrolled.add(request.user)
        return Response({'status': 'enrolled successfully'})
    
    @action(detail=True, methods=['post'])
    def unenroll(self, request, pk=None):
        course = self.get_object()
        if request.user in course.enrolled.all():
            course.enrolled.remove(request.user)
        return Response({'status': 'unenrolled successfully'})

class PsychologistViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Psychologist.objects.filter(is_available=True)
    serializer_class = PsychologistSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['specialty', 'is_available']
    search_fields = ['name', 'specialty']

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['booking_type', 'status', 'scheduled_date']
    ordering_fields = ['scheduled_date', 'created_at']
    
    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
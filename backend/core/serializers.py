from rest_framework import serializers
from .models import *

# ============ MOOD SERIALIZERS ============
class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mood
        fields = ['id', 'mood_type', 'note', 'date', 'time', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

# ============ JOURNAL SERIALIZERS ============
class JournalCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalCategory
        fields = ['id', 'name', 'description', 'icon']

class JournalEntrySerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = JournalEntry
        fields = ['id', 'category', 'category_name', 'title', 'content', 
                 'image', 'video', 'audio', 'entry_date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

# ============ GOAL SERIALIZERS ============
class GoalProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoalProgress
        fields = ['id', 'progress_percentage', 'note', 'created_at']

class GoalSerializer(serializers.ModelSerializer):
    progress = GoalProgressSerializer(many=True, read_only=True)
    progress_percentage = serializers.SerializerMethodField()
    
    class Meta:
        model = Goal
        fields = ['id', 'title', 'description', 'status', 'target_date', 
                 'completed_date', 'progress', 'progress_percentage', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_progress_percentage(self, obj):
        if obj.progress.exists():
            return obj.progress.last().progress_percentage
        return 0

# ============ MINDFULNESS SERIALIZERS ============
class MindfulnessActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = MindfulnessActivity
        fields = ['id', 'name', 'activity_type', 'description', 'duration', 
                 'audio_url', 'video_url', 'guide_text', 'is_premium', 'thumbnail']

class MindfulnessSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MindfulnessSession
        fields = ['id', 'activity', 'duration_completed', 'started_at', 
                 'completed_at', 'notes', 'is_completed', 'created_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

# ============ COMMUNITY SERIALIZERS ============
class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    user_avatar = serializers.ImageField(source='user.profile_picture', read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'user', 'user_name', 'user_avatar', 'content', 'created_at']
        read_only_fields = ['id', 'created_at']

class CommunityPostSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    user_avatar = serializers.ImageField(source='user.profile_picture', read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    is_liked = serializers.SerializerMethodField()
    
    class Meta:
        model = CommunityPost
        fields = ['id', 'user', 'user_name', 'user_avatar', 'content', 'image', 
                 'video', 'likes_count', 'is_liked', 'shares', 'comments', 
                 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False

class SupportCircleSerializer(serializers.ModelSerializer):
    members_count = serializers.IntegerField(source='members.count', read_only=True)
    
    class Meta:
        model = SupportCircle
        fields = ['id', 'name', 'description', 'category', 'icon', 
                 'members_count', 'is_active', 'created_at']
        read_only_fields = ['id', 'created_at']

# ============ RESOURCE SERIALIZERS ============
class ResourceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceCategory
        fields = ['id', 'name', 'description', 'icon']

class ResourceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    is_liked = serializers.SerializerMethodField()
    
    class Meta:
        model = Resource
        fields = ['id', 'title', 'category', 'category_name', 'description', 
                 'content_url', 'content_text', 'thumbnail', 'author', 
                 'summary', 'review', 'purchase_url', 'price', 'is_premium',
                 'tags', 'views', 'likes_count', 'is_liked', 'created_at']
        read_only_fields = ['id', 'created_at', 'views']
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False

# ============ COURSE SERIALIZERS ============
class CourseLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseLesson
        fields = ['id', 'title', 'content', 'video_url', 'duration', 'order', 'is_free']

class CourseSerializer(serializers.ModelSerializer):
    lessons = CourseLessonSerializer(many=True, read_only=True)
    enrolled_count = serializers.IntegerField(source='enrolled.count', read_only=True)
    is_enrolled = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'instructor', 'thumbnail', 
                 'is_premium', 'duration', 'lessons_count', 'lessons', 
                 'enrolled_count', 'is_enrolled', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.enrolled.filter(id=request.user.id).exists()
        return False

class EnrollmentProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnrollmentProgress
        fields = ['id', 'lesson', 'is_completed', 'completed_at', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

# ============ BOOKING SERIALIZERS ============
class PsychologistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Psychologist
        fields = ['id', 'name', 'specialty', 'biography', 'profile_picture', 
                 'rating', 'reviews_count', 'is_available', 'consultation_fee', 
                 'experience_years']

class BookingSerializer(serializers.ModelSerializer):
    psychologist_name = serializers.CharField(source='psychologist.name', read_only=True)
    user_name = serializers.CharField(source='user.full_name', read_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'booking_type', 'psychologist', 'psychologist_name', 
                 'trainer_name', 'trainer_specialty', 'scheduled_date', 
                 'duration_minutes', 'notes', 'status', 'is_virtual', 
                 'amount_paid', 'payment_status', 'rating', 'feedback',
                 'user_name', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
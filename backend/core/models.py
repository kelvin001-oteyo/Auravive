from django.db import models
from django.conf import settings
from django.utils import timezone

# ============ MOOD TRACKING ============
class Mood(models.Model):
    MOOD_CHOICES = [
        ('amazing', 'Amazing 😊'),
        ('good', 'Good 🙂'),
        ('okay', 'Okay 😐'),
        ('bad', 'Bad 🙁'),
        ('awful', 'Awful 😢'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='moods')
    mood_type = models.CharField(max_length=20, choices=MOOD_CHOICES)
    note = models.TextField(blank=True)
    date = models.DateField(default=timezone.now)
    time = models.TimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'moods'
        ordering = ['-date', '-time']
    
    def __str__(self):
        return f"{self.user.email} - {self.get_mood_type_display()} on {self.date}"

# ============ JOURNALS ============
class JournalCategory(models.Model):
    CATEGORY_CHOICES = [
        ('daily', 'Daily Journal'),
        ('pain', 'Pain Memories'),
        ('growth', 'Growth Memories'),
        ('victory', 'Victory Memories'),
        ('gratitude', 'Gratitude Memories'),
        ('future', 'Future Letters'),
    ]
    
    name = models.CharField(max_length=50, choices=CATEGORY_CHOICES, unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    
    class Meta:
        db_table = 'journal_categories'
        verbose_name_plural = 'Journal Categories'
    
    def __str__(self):
        return self.get_name_display()

class JournalEntry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='journal_entries')
    category = models.ForeignKey(JournalCategory, on_delete=models.SET_NULL, null=True, related_name='entries')
    
    title = models.CharField(max_length=200)
    content = models.TextField()
    
    # Media attachments
    image = models.ImageField(upload_to='journal_images/', null=True, blank=True)
    video = models.FileField(upload_to='journal_videos/', null=True, blank=True)
    audio = models.FileField(upload_to='journal_audio/', null=True, blank=True)
    
    # Metadata
    is_private = models.BooleanField(default=True)
    entry_date = models.DateField(default=timezone.now)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'journal_entries'
        ordering = ['-entry_date', '-created_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.title[:50]}"

# ============ GOALS ============
class Goal(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('archived', 'Archived'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='goals')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    target_date = models.DateField(null=True, blank=True)
    completed_date = models.DateField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'goals'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.title}"

class GoalProgress(models.Model):
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE, related_name='progress')
    progress_percentage = models.IntegerField(default=0)
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'goal_progress'
        ordering = ['-created_at']

# ============ MINDFULNESS ============
class MindfulnessActivity(models.Model):
    ACTIVITY_TYPES = [
        ('breathing', 'Deep Breathing'),
        ('meditation', 'Guided Meditation'),
        ('body_scan', 'Body Scan'),
        ('manifestation', 'Manifestation'),
        ('awareness', 'Mindfulness Awareness'),
        ('affirmations', 'Daily Affirmations'),
    ]
    
    name = models.CharField(max_length=100)
    activity_type = models.CharField(max_length=20, choices=ACTIVITY_TYPES)
    description = models.TextField()
    duration = models.IntegerField(help_text='Duration in minutes')
    audio_url = models.URLField(blank=True)
    video_url = models.URLField(blank=True)
    guide_text = models.TextField(blank=True)
    is_premium = models.BooleanField(default=False)
    thumbnail = models.ImageField(upload_to='mindfulness/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'mindfulness_activities'
        verbose_name_plural = 'Mindfulness Activities'
    
    def __str__(self):
        return f"{self.name} ({self.get_activity_type_display()})"

class MindfulnessSession(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='mindfulness_sessions')
    activity = models.ForeignKey(MindfulnessActivity, on_delete=models.CASCADE, related_name='sessions')
    
    duration_completed = models.IntegerField(help_text='Duration in minutes')
    started_at = models.DateTimeField()
    completed_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'mindfulness_sessions'
        ordering = ['-created_at']

# ============ COMMUNITY ============
class CommunityPost(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    
    content = models.TextField()
    image = models.ImageField(upload_to='community_posts/', null=True, blank=True)
    video = models.FileField(upload_to='community_videos/', null=True, blank=True)
    
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_posts', blank=True)
    shares = models.IntegerField(default=0)
    
    is_flagged = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'community_posts'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Post by {self.user.email} - {self.created_at}"

class Comment(models.Model):
    post = models.ForeignKey(CommunityPost, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'comments'
        ordering = ['created_at']

class SupportCircle(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=50)
    icon = models.CharField(max_length=50)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='support_circles', blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='created_circles')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'support_circles'
    
    def __str__(self):
        return self.name

# ============ RESOURCES ============
class ResourceCategory(models.Model):
    CATEGORY_CHOICES = [
        ('guides', 'Mental Health Guides'),
        ('stories', 'Inspiring Stories'),
        ('spoken_word', 'Spoken Word'),
        ('poems', 'Poems'),
        ('music', 'Healing Music'),
        ('videos', 'Wellness Videos'),
        ('books', 'Books'),
    ]
    
    name = models.CharField(max_length=50, choices=CATEGORY_CHOICES, unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50)
    
    class Meta:
        db_table = 'resource_categories'
    
    def __str__(self):
        return self.get_name_display()

class Resource(models.Model):
    title = models.CharField(max_length=200)
    category = models.ForeignKey(ResourceCategory, on_delete=models.CASCADE, related_name='resources')
    description = models.TextField()
    
    # Content fields
    content_url = models.URLField(blank=True)
    content_text = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to='resources/', null=True, blank=True)
    
    # For books
    author = models.CharField(max_length=100, blank=True)
    summary = models.TextField(blank=True)
    review = models.TextField(blank=True)
    purchase_url = models.URLField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Metadata
    is_premium = models.BooleanField(default=False)
    tags = models.CharField(max_length=200, blank=True, help_text='Comma separated tags')
    views = models.IntegerField(default=0)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_resources', blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'resources'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

# ============ COURSES ============
class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructor = models.CharField(max_length=100)
    thumbnail = models.ImageField(upload_to='courses/', null=True, blank=True)
    is_premium = models.BooleanField(default=False)
    duration = models.CharField(max_length=50, help_text='e.g., 4 weeks')
    lessons_count = models.IntegerField(default=0)
    enrolled = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='enrolled_courses', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'courses'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

class CourseLesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    content = models.TextField()
    video_url = models.URLField(blank=True)
    duration = models.CharField(max_length=50)
    order = models.IntegerField(default=0)
    is_free = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'course_lessons'
        ordering = ['order']
    
    def __str__(self):
        return f"{self.course.title} - {self.title}"

class EnrollmentProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='enrollment_progress')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    lesson = models.ForeignKey(CourseLesson, on_delete=models.CASCADE, related_name='progress')
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'enrollment_progress'
        unique_together = ['user', 'course', 'lesson']

# ============ BOOKINGS ============
class Psychologist(models.Model):
    name = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100)
    biography = models.TextField()
    profile_picture = models.ImageField(upload_to='psychologists/', null=True, blank=True)
    rating = models.FloatField(default=0)
    reviews_count = models.IntegerField(default=0)
    is_available = models.BooleanField(default=True)
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2)
    experience_years = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'psychologists'
    
    def __str__(self):
        return f"Dr. {self.name}"

class Booking(models.Model):
    BOOKING_TYPES = [
        ('psychologist', 'Psychologist Session'),
        ('trainer', 'Trainer Session'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('rescheduled', 'Rescheduled'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    booking_type = models.CharField(max_length=20, choices=BOOKING_TYPES)
    
    # For psychologist
    psychologist = models.ForeignKey(Psychologist, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    
    # For trainer
    trainer_name = models.CharField(max_length=100, blank=True)
    trainer_specialty = models.CharField(max_length=100, blank=True)
    
    scheduled_date = models.DateTimeField()
    duration_minutes = models.IntegerField(default=60)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    is_virtual = models.BooleanField(default=True)
    
    # Payment
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_status = models.CharField(max_length=20, default='pending')
    
    # Feedback
    rating = models.IntegerField(null=True, blank=True)
    feedback = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'bookings'
        ordering = ['-scheduled_date']
    
    def __str__(self):
        return f"{self.user.email} - {self.get_booking_type_display()} on {self.scheduled_date}"
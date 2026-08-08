from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User(AbstractUser):
    # Account Types
    PLAN_CHOICES = [
        ('free', 'Free Plan'),
        ('premium', 'Premium Subscription'),
    ]
    
    # Basic Info
    email = models.EmailField(unique=True)
    plan_type = models.CharField(max_length=20, choices=PLAN_CHOICES, default='free')
    
    # Profile Fields
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    
    # Wellness Journey
    joined_date = models.DateTimeField(default=timezone.now)
    last_active = models.DateTimeField(auto_now=True)
    
    # Settings
    is_active = models.BooleanField(default=True)
    email_notifications = models.BooleanField(default=True)
    push_notifications = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return self.email
    
    @property
    def is_premium(self):
        return self.plan_type == 'premium'
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.username
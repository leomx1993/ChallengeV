from rest_framework import serializers
from .models import *

class ReactSeralizer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['policy_string']
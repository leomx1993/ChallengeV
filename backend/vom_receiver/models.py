from django.db import models

class React(models.Model):
    id = models.AutoField(primary_key=True)
    policy_string = models.CharField(max_length=300)

    class Meta:
        db_table = "VOM_POLICIES"
from django.db import models
from django.contrib.auth.models import User
from PIL import Image

class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	image = models.ImageField(default='default.jpg', upload_to='profile_pics')

	def save(self):
		# compress images
		super().save() # run parent class' save function

		img = Image.open(self.image.path)

		if (img.height > 300 or img.width > 300):
			# if image too large, downsize with pillow
			output_size = (300,300)
			img.thumbnail(output_size)
			img.save(self.image.path)

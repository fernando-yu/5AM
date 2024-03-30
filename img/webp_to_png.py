from PIL import Image
import pillow_avif
import os
import glob

for file in glob.glob("*.webp"):
	print(file)
	image = Image.open(file)
	image.save(file.replace("webp", "png"))
	os.remove(file)

for file in glob.glob("*.jpg"):
	print(file)
	image = Image.open(file)
	image.save(file.replace("jpg", "png"))
	os.remove(file)

for file in glob.glob("*.avif"):
	print(file)
	image = Image.open(file)
	image.save(file.replace("avif", "png"))
	os.remove(file)

# file = "logo_icon.png"
# image = Image.open(file)
# image.save("logo_icon.ico", format="ICO")
# os.remove(file)
import json

with open("additional_products.json", 'r') as f, open("additional_products_name.txt", 'w') as nf, open("additional_products_images.txt", 'w') as qf:
    data = json.load(f)

    for product in data.values():
        image_name = product["images_path"][0]
        nf.write(f'{product["name"]}\n')
        qf.write(f'{image_name[6:len(image_name) - 5]} {len(product["images_path"])}\n')
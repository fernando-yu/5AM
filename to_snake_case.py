import json

with open('additional_products.json', 'r+') as f:
    data = json.load(f)
    new_dict = {}

    for id, product in data.items():
        sc_name = product["name"].lower().replace(' ', '_')
        new_dict[sc_name] = product

    json_obj = json.dumps(new_dict, indent=2)
    f.write(json_obj)
    # print(len(new_dict))

    # names = []
    # repeated = []
    # for prod in data.values():
    #     names.append(prod["name"])

    # for name in names:
    #     times = names.count(name)
    #     if times > 1:
    #         repeated.append((name, times, names.index(name)))

    # print(repeated)
    # print(len(repeated))
        
    f.close()

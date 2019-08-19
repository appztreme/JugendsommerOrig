module.exports = {
    "validLocations": [
        {"name": 'Bozen',            "name_it": 'Bolzano'},
        {"name": 'Fennberg',         "name_it": 'Fennberg'}
    ],
    "tSizes": [
        /*
5-6 y (110 – 116 cm)
7-8 y (122 – 128 cm)
9-11 y (134 – 146 cm)
12-14 y (152-164 cm)
S
M
L
XL
        */
        {"name": '5-6 Jahre/110-116cm',            "name_it": '5-6 anni/110-116cm'},
        {"name": '7-8 Jahre/122-128cm',            "name_it": '7-8 anni/122-128cm'},
        {"name": '9-11 Jahre/134-146cm',           "name_it": '9-11 anni/134-146cm'},
        {"name": '12-14 Jahre/152-164cm',          "name_it": '12-14 anni/152-164cm'},
        {"name": 'Erwachsenengröße S',             "name_it": 'Misura adulti S'},
        {"name": 'Erwachsenengröße M',             "name_it": 'Misura adulti M'},
        {"name": 'Erwachsenengröße L',             "name_it": 'Misura adulti L'},
        {"name": 'Erwachsenengröße XL',             "name_it": 'Misura adulti XL'},
    ],
    "cities": ['Bozen', 'Andere'],
    "db_test": "mongodb://localhost/kiso_test",
    "db_prod": "mongodb://localhost/kiso",
    "shop_test": "mongodb://localhost/kiso_shop_test",
    "shop_prod": "mongodb://localhost/kiso_shop",
    "port": 3000,
    "caching": true
}

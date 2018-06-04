module.exports = {
    "validLocations": [
        {"name": 'Bozen',            "name_it": 'Bolzano'},
        {"name": 'Fennberg',         "name_it": 'Fennberg'}
    ],
    "tSizes": [
        {"name": '3-4 Jahre/89-104cm',             "name_it": '3-4 anni/89-104cm'},
        {"name": '5-6 Jahre/110-116cm',            "name_it": '5-6 anni/110-116cm'},
        {"name": '7-8 Jahre/122-128cm',            "name_it": '7-8 anni/122-128cm'},
        {"name": '9-10 Jahre/134-140cm',           "name_it": '9-10 anni/134-140cm'},
        {"name": '11-12 Jahre/146-152cm',          "name_it": '11-12 anni/146-152cm'},
        {"name": 'Erwachsenengröße S',             "name_it": 'Misura adulti S'},
        {"name": 'Erwachsenengröße M',             "name_it": 'Misura adulti M'},
    ],
    "cities": ['Bozen', 'Andere'],
    "db_test": "mongodb://localhost/kiso_test",
    "db_prod": "mongodb://localhost/kiso",
    "shop_test": "mongodb://localhost/kiso_shop_test",
    "shop_prod": "mongodb://localhost/kiso_shop",
    "port": 3000,
    "caching": true
}

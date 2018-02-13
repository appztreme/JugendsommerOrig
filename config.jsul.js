module.exports = {
    "validLocations": [
        {"name": 'Altrei',                  "name_it": 'Anterivo'},
        {"name": 'Aldein',                  "name_it": 'Aldino'},
        {"name": 'Auer',                    "name_it": 'Ora'},
        {"name": 'Kurtatsch',               "name_it": 'Cortaccia'},
        {"name": 'Laag',                    "name_it": 'Laghetti'},
        {"name": 'Margreid',                "name_it": 'Magre'},
        {"name": 'Montan',                  "name_it": 'Montagna'},
        {"name": 'Neumarkt',                "name_it": 'Egna'},
        {"name": 'Tramin',                  "name_it": 'Temeno'},
        {"name": 'Truden',                  "name_it": 'Trodena'},
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
    "cities": ['Altrei', 'Aldein', 'Auer', 'Kurtatsch', 'Laag', 'Margreid', 'Montan', 'Neumarkt', 'Tramin', 'Truden', 'Andere'],
    "db_test": "mongodb://localhost/jdul_test",
    "db_prod": "mongodb://localhost/jdul",
    "port": 3000,
    "caching": true
}
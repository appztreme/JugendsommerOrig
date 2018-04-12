module.exports = {
    "validLocations": [
        {"name": 'Deutschnofen',            "name_it": 'Nova Ponente'},
        {"name": 'Jenesien',                "name_it": 'San Genesio'},
        {"name": 'Jugenddienst Bozen-Land', "name_it": 'Jugenddienst Bozen-Land'},
        {"name": 'Jugenddienst Wipptal',    "name_it": 'Jugenddienst Wipptal'},
        {"name": 'Karneid',                 "name_it": 'Cornedo'},
        {"name": 'Mölten',                  "name_it": 'Meltina'},
        {"name": 'Neustift',                "name_it": 'Neustift'},
        {"name": 'Ritten',                  "name_it": 'Renon'},
        {"name": 'Sarntal',                 "name_it": 'Val Sarentino'},
        {"name": 'SpaceCamp',               "name_it": 'SpaceCamp'},
        {"name": 'Tiers',                   "name_it": 'Tires'},
        {"name": 'Welschnofen',             "name_it": 'Nova Levante'},
        {"name": 'Hüttenlagerwoche',        "name_it": 'Hüttenlagerwoche'},
        {"name": 'Tschögglberger Jungbläserwoche', "name_it": 'Tschögglberger Jungbläserwoche'}
    ],
    "cities": ['Deutschnofen', 'Jenesien', 'Karneid', 'Mölten', 'Ritten', 'Sarntal', 'Tiers', 'Vöran', 'Welschnofen', 'Andere'],
    "tSizes": [
        {"name": '3-4 Jahre/89-104cm',             "name_it": '3-4 anni/89-104cm'},
        {"name": '5-6 Jahre/110-116cm',            "name_it": '5-6 anni/110-116cm'},
        {"name": '7-8 Jahre/122-128cm',            "name_it": '7-8 anni/122-128cm'},
        {"name": '9-10 Jahre/134-140cm',           "name_it": '9-10 anni/134-140cm'},
        {"name": '11-12 Jahre/146-152cm',          "name_it": '11-12 anni/146-152cm'},
        {"name": 'Erwachsenengröße S',             "name_it": 'Misura adulti S'},
        {"name": 'Erwachsenengröße M',             "name_it": 'Misura adulti M'},
    ],
    "db_test": "mongodb://localhost/jd_bozenland_test",
    "db_prod": "mongodb://localhost/jd_bozenland",
    "shop_test": "mongodb://localhost/jdbl_shop_test",
    "shop_prod": "mongodb://localhost/jdbl_shop",
    "port": 3000,
    "caching": true
}
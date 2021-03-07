//conn = new Mongo();
var db = connect('kiso_integration')

//db.events.insert({ "_id" : ObjectId("600ff58919b231a71fedb254"), "type" : "summer", "location" : "Bozen", "penalty" : 0, "budgetBusiness" : 0, "budgetFood" : 0, "feePerWeek" : 80, "siblingDiscount" : 70, "optionalFeePerWeek" : 10, "isInternal" : true, "contacts" : [ ], "name" : "KiSo 2021", "name_it" : "KiSo 2021", "description" : "Für Grundschüler", "description_it" : "per ragazzi della scuola elementare", "location_it" : "Bolzano", "startDate" : ISODate("2021-06-21T00:00:00Z"), "endDate" : ISODate("2021-08-06T00:00:00Z"), "visibleFrom" : ISODate("2021-03-02T00:00:00Z"), "visibleTo" : ISODate("2021-08-03T00:00:00Z"), "deadline" : ISODate("2021-08-03T00:00:00Z"), "info" : "von 08:00 Uhr bis 15:00 (Mittagsessen und Jause einbegriffen)", "info_it" : "dalle 08:00 alle 15:00 (pranzo e merenda incluso)", "contactRels" : [ ], "__v" : 0 }, function(err, result) {console.log(err, result);})

//db.activities.insert({ "_id" : ObjectId("601029d2fadc13a71e1b944c"), "curParticipants" : 0, "contacts" : [ ], "name" : "21.06. - 25.06.2021", "name_it" : "21.06. - 25.06.2021", "description" : "1. Woche KiSo 2021", "description_it" : "1• settimana KiSo 2021", "startDate" : ISODate("2021-06-21T00:00:00Z"), "endDate" : ISODate("2021-06-25T00:00:00Z"), "eventId" : ObjectId("600ff58919b231a71fedb254"), "maxParticipants" : 30, "queueSize" : 15, "contactRels" : [ ], "__v" : 0 }, function(err, result) {console.log(err, result);})
//db.activities.insert({ "_id" : ObjectId("6038abe37252de909162d31c"), "curParticipants" : 0, "contacts" : [ ], "name" : "28.06. - 02.07.2021", "name_it" : "28/06 - 02/07/2021", "description" : "2. Woche KiSo 2021", "description_it" : "2°settimana KiSo 2021", "startDate" : ISODate("2021-06-28T00:00:00Z"), "endDate" : ISODate("2021-07-02T00:00:00Z"), "eventId" : ObjectId("600ff58919b231a71fedb254"), "maxParticipants" : 45, "queueSize" : 15, "contactRels" : [ ], "__v" : 0 }, function(err, result) {console.log(err, result);})
//db.activities.insert({ "_id" : ObjectId("6038ac678064c2908f4d20d4"), "curParticipants" : 0, "contacts" : [ ], "name" : "05.07. - 09.07.2021", "name_it" : "05/07 - 09/07/2021", "description" : "3. Woche KiSo 2021", "description_it" : "3°settimana KiSo 2021", "startDate" : ISODate("2021-07-05T00:00:00Z"), "endDate" : ISODate("2021-07-09T00:00:00Z"), "eventId" : ObjectId("600ff58919b231a71fedb254"), "maxParticipants" : 45, "queueSize" : 15, "contactRels" : [ ], "__v" : 0 }, function(err, result) {console.log(err, result);})
//db.activities.insert({ "_id" : ObjectId("6038ae64cd4d5390868c4578"), "curParticipants" : 0, "contacts" : [ ], "name" : "12.07. - 16.07.2021", "name_it" : "12/07 - 16/07/2021", "description" : "4. Woche KiSo 2021", "description_it" : "4°settimana KiSo2021", "startDate" : ISODate("2021-07-12T00:00:00Z"), "endDate" : ISODate("2021-07-16T00:00:00Z"), "eventId" : ObjectId("600ff58919b231a71fedb254"), "maxParticipants" : 45, "queueSize" : 15, "contactRels" : [ ], "__v" : 0 }, function(err, result) {console.log(err, result);})
//db.activities.insert({ "_id" : ObjectId("6038aeea1b6ec0909019ab15"), "curParticipants" : 0, "contacts" : [ ], "name" : "19.07. - 23.07.2021", "name_it" : "19/07 - 23/07/2021", "description" : "5. Woche KiSo 2021", "description_it" : "5°settiman KiSo 2021", "startDate" : ISODate("2021-07-19T00:00:00Z"), "endDate" : ISODate("2021-07-23T00:00:00Z"), "eventId" : ObjectId("600ff58919b231a71fedb254"), "maxParticipants" : 45, "queueSize" : 15, "contactRels" : [ ], "__v" : 0 }, function(err, result) {console.log(err, result);})
//db.activities.insert({ "_id" : ObjectId("6038af4e1b6ec0909019ab16"), "curParticipants" : 0, "contacts" : [ ], "name" : "26.07. - 30.07.2021", "name_it" : "26/07 - 30/07/2021", "description" : "6. Woche KiSo 2021", "description_it" : "6°settimana KiSo 2021", "startDate" : ISODate("2021-07-26T00:00:00Z"), "endDate" : ISODate("2021-07-30T00:00:00Z"), "eventId" : ObjectId("600ff58919b231a71fedb254"), "maxParticipants" : 45, "queueSize" : 15, "contactRels" : [ ], "__v" : 0 }, function(err, result) {console.log(err, result);})
//db.activities.insert({ "_id" : ObjectId("6038afd0cd4d5390868c4579"), "curParticipants" : 0, "contacts" : [ ], "name" : "02.08. - 06.08.2021", "name_it" : "02/08 - 06/08/2021", "description" : "7. Woche KiSo 2021 (NUR UGO FOSCOLO!)", "description_it" : "7°settimana KiSo 2021 (SOLO UGO FOSCOLO!)", "startDate" : ISODate("2021-08-02T00:00:00Z"), "endDate" : ISODate("2021-08-06T00:00:00Z"), "eventId" : ObjectId("600ff58919b231a71fedb254"), "maxParticipants" : 22, "queueSize" : 15, "contactRels" : [ ], "__v" : 0 }, function(err, result) {console.log(err, result);})

db.users.insert(
    {
		"_id" : "58c15d07c189be38633a8b80",
		"firstName" : "Florian",
		"lastName" : "Edelmaier",
		"userEmail" : "florian.edelmaier@gmail.com",
		"userName" : "flo"
	}
, function(err, result) {console.log(err, result)});
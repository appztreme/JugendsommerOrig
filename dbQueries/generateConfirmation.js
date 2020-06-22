const mail = require('./../server/controller/mailBuilder');
const mongoose = require('mongoose');
const moment = require('moment');
const pdf = require('pdfkit');
const fs = require('fs');
const chalk = require('chalk');

let regs = [{
	"_id" : mongoose.Types.ObjectId("5cf81784630ad3190d35f30e"),
	"firstNameParent" : "alessandra",
	"lastNameParent" : "fusina",
	"phoneNumberParent" : "3498585559",
	"emailParent" : "afusina@realestate.bz.it",
	"firstNameChild" : "stefano",
    "lastNameChild" : "dallapiazza",
	"birthdayChild" : new Date("2009-01-21T23:00:00Z"),
	"schoolChild" : "4",
	"nameContact1" : "alessandra",
	"telContact1" : "3498585559",
	"nameContact2" : "marco",
	"telContact2" : "3395681877",
	"activityId" : {
        "_id" : mongoose.Types.ObjectId("5c35fc255f41f9b16ce134f7"),
        "name" : "Woche 1",
        "name_it" : "Settimana 1",
        "description" : "Zielgruppe: GrundschülerInnen 1. - 4. Klasse in Klobenstein",
        "description_it" : "Destinatari: Alunni delle scuole elementari dalla 1° alla 4° a Collalbo",
        "startDate" : new Date("2019-07-08T00:00:00Z"),
        "endDate" : new Date("2019-07-12T00:00:00Z"),
        "eventId" : {
            "_id" : mongoose.Types.ObjectId("5c35b2945f41f9b16ce134b6"),
            "name" : "Kindersommer - Klobenstein",
            "name_it" : "Estate bambini - Collalbo",
            "description" : "Zielgruppe: GrundschülerInnen 1. - 4. Klasse in Klobenstein",
            "description_it" : "Destinatari: Alunni delle scuole elementari dalla 1° alla 4° a Collalbo",
            "location_it" : "Renon",
            "startDate" : new Date("2019-07-08T00:00:00Z"),
            "endDate" : new Date("2019-08-09T00:00:00Z"),
            "deadline" : new Date("2019-02-24T00:00:00Z"),
            "info" : "oo",
            "info_it" : "oo",
            "contactRels" : [
                {
                    "contact" : mongoose.Types.ObjectId("5acdcffa08a26943927f1383"),
                    "role" : "TeamleiterIn 0.5",
                    "_id" : mongoose.Types.ObjectId("5c9b842809aaf5cd83b11ee4")
                },
                {
                    "contact" : mongoose.Types.ObjectId("5acdc79a08a26943927f131c"),
                    "role" : "TeamleiterIn 0.5",
                    "_id" : mongoose.Types.ObjectId("5c9b843209aaf5cd83b11ee5")
                },
                {
                    "contact" : mongoose.Types.ObjectId("5acdd9a508a26943927f13ff"),
                    "role" : "BetreuerIn",
                    "_id" : mongoose.Types.ObjectId("5c9b843a09aaf5cd83b11ee6")
                },
                {
                    "contact" : mongoose.Types.ObjectId("58edefa8f100e2a92a7c5768"),
                    "role" : "BetreuerIn",
                    "_id" : mongoose.Types.ObjectId("5c9b844509aaf5cd83b11ee7")
                },
                {
                    "contact" : mongoose.Types.ObjectId("58edee23f100e2a92a7c5764"),
                    "role" : "BetreuerIn",
                    "_id" : mongoose.Types.ObjectId("5c9b844e09aaf5cd83b11ee8")
                },
                {
                    "contact" : mongoose.Types.ObjectId("58ef3516ca1ef2ae334615ff"),
                    "role" : "BetreuerIn",
                    "_id" : mongoose.Types.ObjectId("5c9b845409aaf5cd83b11ee9")
                },
                {
                    "contact" : mongoose.Types.ObjectId("5acddedf08a26943927f1465"),
                    "role" : "BetreuerIn",
                    "_id" : mongoose.Types.ObjectId("5c9b846109aaf5cd83b11eea")
                },
                {
                    "contact" : mongoose.Types.ObjectId("5c9b858109aaf5cd83b11eeb"),
                    "role" : "PraktikantIn",
                    "_id" : mongoose.Types.ObjectId("5c9b858109aaf5cd83b11eec")
                }
            ],
            "contacts" : [ ],
            "isInternal" : false,
            "feePerWeek" : 95,
            "budgetFood" : 0,
            "budgetBusiness" : 3185,
            "penalty" : 5,
            "visibleTo" : new Date("2019-08-09T00:00:00Z"),
            "visibleFrom" : new Date("2019-02-04T00:00:00Z"),
            "location" : "Ritten",
            "type" : "summer",
            "__v" : 8,
            "optionalFeePerWeek" : 0,
            "siblingDiscount" : 0
        },
        "maxParticipants" : 33,
        "queueSize" : 5,
        "contactRels" : [
            {
                "contact" : mongoose.Types.ObjectId("5acdcffa08a26943927f1383"),
                "role" : "TeamleiterIn 0.5",
                "_id" : mongoose.Types.ObjectId("5c9b9bdd09aaf5cd83b11fb1")
            },
            {
                "contact" : mongoose.Types.ObjectId("5acdc79a08a26943927f131c"),
                "role" : "TeamleiterIn 0.5",
                "_id" : mongoose.Types.ObjectId("5c9b9be309aaf5cd83b11fb2")
            },
            {
                "contact" : mongoose.Types.ObjectId("5acdd9a508a26943927f13ff"),
                "role" : "BetreuerIn",
                "_id" : mongoose.Types.ObjectId("5c9b9beb09aaf5cd83b11fb3")
            },
            {
                "contact" : mongoose.Types.ObjectId("5c9b858109aaf5cd83b11eeb"),
                "role" : "PraktikantIn",
                "_id" : mongoose.Types.ObjectId("5c9b9bf009aaf5cd83b11fb4")
            }
        ],
        "contacts" : [ ],
        "curParticipants" : 27,
        "__v" : 4
    }
    ,
	"userId" : mongoose.Types.ObjectId("5ae6b741e40e5f82d6b10f25"),
	"acceptsMediaPublication" : false,
	"acceptsNewsletter" : false,
	"acceptsOptionalFee" : false,
	"isSiblingReservation" : false,
	"canGoHomeAllone" : false,
	"canSwim" : false,
	"needsEbK" : true,
	"hasDisability" : false,
	"needsPreCare" : false,
	"isEmailNotified" : true,
	"isPaymentDone" : true,
	"registrationDate" : new Date("2019-06-05T19:27:00.731Z"),
	"cityChild" : "Andere",
	"addressChild" : "schmiedgasse 2",
	"__v" : 0,
	"prevActivityId" : mongoose.Types.ObjectId("5c35fc255f41f9b16ce134f7"),
	"receiptNumber" : 2381,
	"isPrioDown" : false,
	"isPrioUp" : false
},
{
	"_id" : mongoose.Types.ObjectId("5cf81784630ad3190d35f30f"),
	"firstNameParent" : "alessandra",
	"lastNameParent" : "fusina",
	"phoneNumberParent" : "3498585559",
	"emailParent" : "afusina@realestate.bz.it",
	"firstNameChild" : "stefano",
	"lastNameChild" : "dallapiazza",
	"birthdayChild" : new Date("2009-01-21T23:00:00Z"),
	"schoolChild" : "4",
	"nameContact1" : "alessandra",
	"telContact1" : "3498585559",
	"nameContact2" : "marco",
	"telContact2" : "3395681877",
	"activityId" : {
        "_id" : mongoose.Types.ObjectId("5c35fc3d5f41f9b16ce134f8"),
        "name" : "Woche 2",
        "name_it" : "Settimana 2",
        "description" : "Zielgruppe: GrundschülerInnen 1. - 4. Klasse in Klobenstein",
        "description_it" : "Destinatari: Alunni delle scuole elementari dalla 1° alla 4° a Collalbo",
        "startDate" : new Date("2019-07-15T00:00:00Z"),
        "endDate" : new Date("2019-07-12T00:00:00Z"),
        "eventId" : {
            "_id" : mongoose.Types.ObjectId("5c35b2945f41f9b16ce134b6"),
            "name" : "Kindersommer - Klobenstein",
            "name_it" : "Estate bambini - Collalbo",
            "description" : "Zielgruppe: GrundschülerInnen 1. - 4. Klasse in Klobenstein",
            "description_it" : "Destinatari: Alunni delle scuole elementari dalla 1° alla 4° a Collalbo",
            "location_it" : "Renon",
            "startDate" : new Date("2019-07-08T00:00:00Z"),
            "endDate" : new Date("2019-08-09T00:00:00Z"),
            "deadline" : new Date("2019-02-24T00:00:00Z"),
            "info" : "oo",
            "info_it" : "oo",
            "contactRels" : [
                {
                    "contact" : mongoose.Types.ObjectId("5acdcffa08a26943927f1383"),
                    "role" : "TeamleiterIn 0.5",
                    "_id" : mongoose.Types.ObjectId("5c9b842809aaf5cd83b11ee4")
                },
                {
                    "contact" : mongoose.Types.ObjectId("5acdc79a08a26943927f131c"),
                    "role" : "TeamleiterIn 0.5",
                    "_id" : mongoose.Types.ObjectId("5c9b843209aaf5cd83b11ee5")
                },
                {
                    "contact" : mongoose.Types.ObjectId("5acdd9a508a26943927f13ff"),
                    "role" : "BetreuerIn",
                    "_id" : mongoose.Types.ObjectId("5c9b843a09aaf5cd83b11ee6")
                },
                {
                    "contact" : mongoose.Types.ObjectId("58edefa8f100e2a92a7c5768"),
                    "role" : "BetreuerIn",
                    "_id" : mongoose.Types.ObjectId("5c9b844509aaf5cd83b11ee7")
                },
                {
                    "contact" : mongoose.Types.ObjectId("58edee23f100e2a92a7c5764"),
                    "role" : "BetreuerIn",
                    "_id" : mongoose.Types.ObjectId("5c9b844e09aaf5cd83b11ee8")
                },
                {
                    "contact" : mongoose.Types.ObjectId("58ef3516ca1ef2ae334615ff"),
                    "role" : "BetreuerIn",
                    "_id" : mongoose.Types.ObjectId("5c9b845409aaf5cd83b11ee9")
                },
                {
                    "contact" : mongoose.Types.ObjectId("5acddedf08a26943927f1465"),
                    "role" : "BetreuerIn",
                    "_id" : mongoose.Types.ObjectId("5c9b846109aaf5cd83b11eea")
                },
                {
                    "contact" : mongoose.Types.ObjectId("5c9b858109aaf5cd83b11eeb"),
                    "role" : "PraktikantIn",
                    "_id" : mongoose.Types.ObjectId("5c9b858109aaf5cd83b11eec")
                }
            ],
            "contacts" : [ ],
            "isInternal" : false,
            "feePerWeek" : 95,
            "budgetFood" : 0,
            "budgetBusiness" : 3185,
            "penalty" : 5,
            "visibleTo" : new Date("2019-08-09T00:00:00Z"),
            "visibleFrom" : new Date("2019-02-04T00:00:00Z"),
            "location" : "Ritten",
            "type" : "summer",
            "__v" : 8,
            "optionalFeePerWeek" : 0,
            "siblingDiscount" : 0
        }
        ,
        "maxParticipants" : 33,
        "queueSize" : 5,
        "contactRels" : [
            {
                "contact" : mongoose.Types.ObjectId("5acdcffa08a26943927f1383"),
                "role" : "TeamleiterIn",
                "_id" : mongoose.Types.ObjectId("5c9b9c1609aaf5cd83b11fb7")
            },
            {
                "contact" : mongoose.Types.ObjectId("58edefa8f100e2a92a7c5768"),
                "role" : "BetreuerIn",
                "_id" : mongoose.Types.ObjectId("5c9b9c1c09aaf5cd83b11fb8")
            }
        ],
        "contacts" : [ ],
        "curParticipants" : 20,
        "__v" : 6
    },
	"userId" : mongoose.Types.ObjectId("5ae6b741e40e5f82d6b10f25"),
	"acceptsMediaPublication" : false,
	"acceptsNewsletter" : false,
	"acceptsOptionalFee" : false,
	"isSiblingReservation" : false,
	"canGoHomeAllone" : false,
	"canSwim" : false,
	"needsEbK" : true,
	"hasDisability" : false,
	"needsPreCare" : false,
	"isEmailNotified" : true,
	"isPaymentDone" : true,
	"registrationDate" : new Date("2019-06-05T19:27:00.731Z"),
	"cityChild" : "Andere",
	"addressChild" : "schmiedgasse 2",
	"__v" : 0,
	"prevActivityId" : mongoose.Types.ObjectId("5c35fc3d5f41f9b16ce134f8"),
	"receiptNumber" : 2381,
	"isPrioDown" : false,
	"isPrioUp" : false
}];

function calculateReceiptFee(reservation, activity) {
	let fee = activity.eventId.feePerWeek;
	if(reservation.acceptsOptionalFee) {
		fee = fee + activity.eventId.optionalFeePerWeek;
	}
	if(reservation.isSiblingReservation) {
		fee = fee - activity.eventId.siblingDiscount;
	}
	if(reservation.activityId.eventId.deadline) {
		if((moment(activity.eventId.deadline).hour(23).minute(59).second(59)).isBefore(moment(reservation.registrationDate))) fee = fee + activity.eventId.penalty;	
	}
	return fee;
}

const getChildStr = (child) => {
	return child.firstNameChild + ' ' + child.lastNameChild + ' (' +  ("0" + child.birthdayChild.getDate()).slice(-2) + '.' + ("0" + (child.birthdayChild.getMonth() + 1)).slice(-2) + '.' + child.birthdayChild.getFullYear() + ')';
}

getConfirmationPDF = function(reservations) {
	const doc = new pdf();
	let children = reservations.map(function(v,i) { return getChildStr(v) });
	let childrenUnique = [...new Set(children)];
	for(let i = 0; i < childrenUnique.length; i++) {
		const child = childrenUnique[i];
		let registrationsPerChild = reservations.filter(reg => getChildStr(reg) === child);
		//console.log(registrationsPerChild);
		doc.image('../public/assets/jdbl-logo.jpg', {
			fit: [150, 250],
			align: 'right',
			valign: 'top'
		});
		let grad = doc.linearGradient(0, 0, 30, 0);
		grad.stop(0, '#ffa500').stop(1, '#ffd27f');
		doc.rect(0, 0, 30, 950);
		doc.fill(grad);
		doc.fontSize(8).fillAndStroke("grey", "#000");
		doc.moveDown(0.2);
		doc.font('Helvetica').text("Andreas-Hofer-Strasse 36 | 39100 Bozen | Tel.: +39 0471 324753");
		doc.moveDown(0.2);
		doc.text("info@jugenddienst.com | www.jdbl.it | St.Nr.: 94072680211");
		doc.fontSize(26).fillAndStroke("#ffa500", "#000");
		doc.moveDown(1).moveDown(1);
		doc.font('Helvetica-Bold').text("Einzahlungsbestätigung", { align: 'center', width: 430 });
		doc.fontSize(14).fillAndStroke("black", "#000");;
		doc.moveDown(1).moveDown(1);
		doc.font('Helvetica').text("Hiermit wird bestätigt, dass ", { align: 'left', width: 430 });
		doc.moveDown(1);
		doc.font('Helvetica-Bold').text(child, { align: 'center', width: 430 });
		doc.moveDown(1);
		doc.font('Helvetica').text("an folgenden Sommerprogrammen des Jugenddienst Bozen Land " + new Date().getFullYear() + " teilgenommen hat:", { align: 'left', width: 430 });
		doc.moveDown(1);
		let fee = 0;
		for(let reg of registrationsPerChild) {
			doc.font('Helvetica-Bold').text(reg.activityId.eventId.name + ' ' + reg.activityId.eventId.location + ' - ' + reg.activityId.name + ' (' + moment(reg.activityId.startDate).format('DD.MM') + '-' + moment(reg.activityId.endDate).format('DD.MM.YYYY') + ')', { align: 'left', width: 430 });
			doc.moveDown(1);
			fee += calculateReceiptFee(reg, reg.activityId);
		}
		doc.font('Helvetica').text("Spesen: Der Gesamtbetrag von ", { continued: true });
		doc.font('Helvetica-Bold').text(fee, { continued: true }).text(" Euro ", { continued: true });
		doc.font('Helvetica').text("wurde ordnungsgemäß überwiesen und ist auf das Konto des Jugenddienst Bozen-Land eingegangen.");
		doc.moveDown(1);
		doc.image('../public/assets/signature_jdbl.jpg', {
		 	fit: [200, 200],
			 align: 'right',
			 valign: 'top'
		});
		if(i < (childrenUnique.length - 1)) {
			doc.addPage();
		}
	}

	doc.end();
	// DEBUG only
	//doc.pipe(fs.createWriteStream('./bestätigung.pdf'));
	return doc;
}

getConfirmationPDF(regs);
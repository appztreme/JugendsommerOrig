var app = angular.module('js');

/**
 * EventsCtrl corresponds to events.html
 */
app.controller('EventsCtrl', function($scope, $routeParams, $location, EventsSvc, IdentitySvc) {
	const eventsDeutschnofen = [{"_id":"587ce8fa04ca82f0b1b526d3","name":"Kindersommer Eggen","description":"GrundschülerInnen 1. - 5. Klasse","startDate":"2017-07-17T00:00:00.000Z","endDate":"2017-07-28T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 85 Euro. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 75 Euro pro Woche bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Deutschnofen","type":"summer","$$hashKey":"object:566"},{"_id":"587cea4e04ca82f0b1b526d6","name":"Kindersommer Petersberg","description":"GrundschülerInnen 1. - 5. Klasse","startDate":"2017-07-17T00:00:00.000Z","endDate":"2017-07-28T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 85 Euro. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 75 Euro pro Woche bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Deutschnofen","type":"summer","$$hashKey":"object:567"},{"_id":"587cebdd04ca82f0b1b526d9","name":"Kindersommer Deutschnofen","description":"GrundschülerInnen 1. - 4. Klasse","startDate":"2017-07-17T00:00:00.000Z","endDate":"2017-08-11T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 85 Euro. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 75 Euro pro Woche bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Deutschnofen","type":"summer","$$hashKey":"object:568"},{"_id":"587cedb204ca82f0b1b526de","name":"Jugendsommer Deutschnofen","description":"5. Klasse Grundschule - 3. Klasse Mittelschule","startDate":"2017-07-17T00:00:00.000Z","endDate":"2017-08-11T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 85 Euro. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 75 Euro pro Woche bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Deutschnofen","type":"summer","$$hashKey":"object:569"},{"_id":"587cfeade59c3d94cd4c2d52","name":"Jugend Aktiv Deutschnofen","description":"Sommerbeschäftigung für Jugendliche im Alter von 14-15 Jahren aus dem Gemeindegebiet Deutschnofen","startDate":"2017-07-17T00:00:00.000Z","endDate":"2017-08-11T00:00:00.000Z","info":"Der Kostenbeitrag für eine Projektwoche beläuft sich auf 30 Euro pro TeilnehmerIn","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Deutschnofen","type":"summer","$$hashKey":"object:570"}];
 	const eventsHuettenlager = [{"_id":"587cfaede59c3d94cd4c2d4b","name":"Hüttenlagerwochen","description":"Jungscharhaus in San Lugano, Truden","startDate":"2017-06-25T00:00:00.000Z","endDate":"2017-07-08T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 120 Euro. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 110 Euro bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Hüttenlagerwoche","type":"summer","$$hashKey":"object:699"}];
	const eventsJenesien = [{"_id":"587cdfd2338fe817811cb8fb","name":"Kindersommer Afing","description":"GrundschülerInnen 1. - 5. Klasse","startDate":"2017-07-03T00:00:00.000Z","endDate":"2017-07-07T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 70 Euro. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 60 Euro pro Woche bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Jenesien","type":"summer","$$hashKey":"object:453"},{"_id":"587ce22b04ca82f0b1b526c9","name":"Kindersommer Jenesien","description":"GrundschülerInnen 1. -4. Klasse","startDate":"2017-07-10T00:00:00.000Z","endDate":"2017-08-04T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 70 Euro. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 60 Euro pro Woche bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Jenesien","type":"summer","$$hashKey":"object:454"},{"_id":"587ce56f04ca82f0b1b526ce","name":"Jugendsommer Jenesien","description":"5. Klasse Grundschule - 3. Klasse Mittelschule","startDate":"2017-07-10T00:00:00.000Z","endDate":"2017-08-04T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 70 Euro. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 60 Euro pro Woche bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Jenesien","type":"summer","$$hashKey":"object:455"}]
	const eventsKarneid = [{"_id":"587cf697e59c3d94cd4c2d41","name":"Jugendsommer Steinegg","description":"4. Klasse Grundschule - 3. Klasse Mittelschule","startDate":"2017-07-03T00:00:00.000Z","endDate":"2017-07-21T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 70 Euro. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 60 Euro pro Woche bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Karneid","type":"summer","$$hashKey":"object:792"}];
	const eventsMoelten = [{"_id":"587cf45504ca82f0b1b526eb","name":"Kindersommer Mölten","description":"GrundschülerInnen 1. - 4. Klasse","startDate":"2017-07-03T00:00:00.000Z","endDate":"2017-07-14T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 95 Euro. Davon sind 70 Euro fürs Programm + 25 Euro Essenbeitrag, da die Gemeinde Pölten nicht mehr für die gesamte Verpflegung aufkommt. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 85 Euro bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Mölten","type":"summer","$$hashKey":"object:885"},{"_id":"587cf57804ca82f0b1b526ee","name":"Jugendsommer Mölten","description":"5. Klasse Grundschule - 3. Klasse Mittelschule","startDate":"2017-07-03T00:00:00.000Z","endDate":"2017-07-14T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 95 Euro. Davon sind 70 Euro fürs Programm + 25 Euro Essenbeitrag, da die Gemeinde Pölten nicht mehr für die gesamte Verpflegung aufkommt. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 85 Euro bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Mölten","type":"summer","$$hashKey":"object:886"}];
	const eventsRitten = [{"_id":"587cb7e98ab56e817351e889","name":"Kindersommer Unterinn","description":"GrundschülerInnen 1. - 5. Klasse","startDate":"2017-07-03T00:00:00.000Z","endDate":"2017-07-07T00:00:00.000Z","info":"Der Kostenbeitrag für diese Woche beläuft sich auf 95 Euro. Davon sind 70 Euro fürs Programm + 25 Euro Essenbeitrag, da die Gemeinde Ritten nicht für die Verpflegung aufkommt. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 90 Euro bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Ritten","type":"summer","$$hashKey":"object:988"},{"_id":"587cb91c8ab56e817351e88a","name":"Kindersommer Ritten","description":"GrundschülerInnen 1. - 4. Klasse","startDate":"2017-07-10T00:00:00.000Z","endDate":"2017-08-04T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 95 Euro. Davon sind 70 Euro fürs Programm + 25 Euro Essenbeitrag, da die Gemeinde Ritten nicht für die Verpflegung aufkommt. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 90 Euro bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Ritten","type":"summer","$$hashKey":"object:989"},{"_id":"587cdb9d338fe817811cb8f5","name":"Jugendsommer Ritten","description":"5. Klasse Grundschule - 3. Klasse Mittelschule","startDate":"2017-07-10T00:00:00.000Z","endDate":"2017-08-11T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 95 Euro. Davon sind 70 Euro fürs Programm + 25 Euro Essenbeitrag, da die Gemeinde Ritten nicht für die Verpflegung aufkommt. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 90 Euro bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Ritten","type":"summer","$$hashKey":"object:990"},{"_id":"5893343101821c5e8ad0b453","name":"Jugend Aktiv Ritten","description":"Sommerbeschäftigung für Jugendliche im Alter von 14-15 Jahren aus dem Gemeindegebiet Ritten","startDate":"2017-07-10T00:00:00.000Z","endDate":"2017-08-04T00:00:00.000Z","info":"Das Projekt ist kostenlos.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Ritten","type":"summer","$$hashKey":"object:991"}];
	const eventsSarntal = [{"_id":"5893470eafb2dc37a08db39c","name":"Jugend Aktiv Sarntal","description":"Sommerbeschäftigung für alle SarnerInnen im Alter von 14-15 Jahren","startDate":"2017-07-03T00:00:00.000Z","endDate":"2017-08-11T00:00:00.000Z","info":"Der Kostenbeitrag für eine Projektwoche beläuft sich auf 30 Euro pro TeilnehmerIn","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Sarntal","type":"summer","$$hashKey":"object:1111"}];
	const eventsSpaceCamp = [{"_id":"587cfdb1e59c3d94cd4c2d50","name":"Space Camp in Gummer","description":"3. Klasse Grundschule - 1. Klasse Mittelschule, des gesamten Einzugsgebietes des Jugenddienstes Bozen-Land","startDate":"2017-07-30T00:00:00.000Z","endDate":"2017-08-04T00:00:00.000Z","info":"Die Kosten belaufen sich für die Woche auf 120 Euro pro Teilnehmer. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 110 Euro bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"SpaceCamp","type":"summer","$$hashKey":"object:1204"}];
	const eventsTiers = [{"_id":"587cf7bde59c3d94cd4c2d45","name":"Kindersommer Tiers","description":"GrundschülerInnen 1. - 4. Klasse (auch aus Völser Aicha)","startDate":"2017-07-03T00:00:00.000Z","endDate":"2017-07-14T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 70 Euro. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 60 Euro pro Woche bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Tiers","type":"summer","$$hashKey":"object:1297"},{"_id":"587cf805e59c3d94cd4c2d46","name":"Jugendsommer Tiers","description":"5. Klasse Grundschule - 3. Klasse Mittelschule (auch aus Völser Aicha)","startDate":"2017-07-03T00:00:00.000Z","endDate":"2017-07-14T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 70 Euro. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 60 Euro pro Woche bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Tiers","type":"summer","$$hashKey":"object:1298"}];
	const eventsBlaeserwoche = [{"_id":"587cfc7ee59c3d94cd4c2d4e","name":"Tschöggelberger Jungbläserwoche","description":"1. Klasse Mittelschule - 1. Klasse Oberschule, des gesamten Einzugsgebietes des Jugenddienstes Bozen-Land. Die Jungmusikanten vom Tschögglberg haben bei der Anmeldung Vorrang.","startDate":"2017-08-16T00:00:00.000Z","endDate":"2017-08-26T00:00:00.000Z","info":"Der Kostenbeitrag für das gesamte Projekt beläuft sich auf 140 Euro pro TeilnehmerIn. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 130 Euro bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Tschögglberger Jungbläserwoche","type":"music","$$hashKey":"object:1400"}];
	const eventsWelschnofen = [{"_id":"587cef8b04ca82f0b1b526e3","name":"Kindersommer Welschnofen","description":"GrundschülerInnen 1. - 4. Klasse","startDate":"2017-07-24T00:00:00.000Z","endDate":"2017-08-11T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 70 Euro. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 60 Euro pro Woche bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Welschnofen","type":"summer","$$hashKey":"object:1493"},{"_id":"587cf1d804ca82f0b1b526e7","name":"Jugendsommer Welschnofen","description":"5. Klasse Grundschule - 3. Klasse Mittelschule","startDate":"2017-07-24T00:00:00.000Z","endDate":"2017-08-11T00:00:00.000Z","info":"Der Kostenbeitrag für eine Woche beläuft sich auf 70 Euro. Falls zwei Kinder einer Familie an diesem Programm teilnehmen, muss für das zweite Kind nur mehr 60 Euro pro Woche bezahlt werden.","__v":0,"isInternal":false,"budgetFood":0,"budgetBusiness":0,"visibleTo":"2017-07-01T00:00:00.000Z","visibleFrom":"2017-02-03T00:00:00.000Z","location":"Welschnofen","type":"summer","$$hashKey":"object:1494"}];


	//$scope.busyPromise = EventsSvc.find();
	var host = $location.$$host.toLowerCase();

	//onload section
	if(IdentitySvc.isAdmin()) {
		if(['club', 'spiritnight'].indexOf($routeParams.location) !== -1) {
			EventsSvc.findByTypeAsAdmin($routeParams.location).success(function(evs) {
				$scope.events = evs;
			});
		}
		else {
			if($routeParams.location === "Deutschnofen") $scope.events = eventsDeutschnofen;
			else if($routeParams.location === "Hüttenlagerwoche") $scope.events = eventsHuettenlager;
			else if($routeParams.location === "Jenesien") $scope.events = eventsJenesien;
			else if($routeParams.location === "Karneid") $scope.events = eventsKarneid;
			else if($routeParams.location === "Mölten") $scope.events = eventsMoelten;
			else if($routeParams.location === "Ritten") $scope.events = eventsRitten;
			else if($routeParams.location === "Sarntal") $scope.events = eventsSarntal;
			else if($routeParams.location === "SpaceCamp") $scope.events = eventsSpaceCamp;
			else if($routeParams.location === "Tiers") $scope.events = eventsTiers;
			else if($routeParams.location === "Tschögglberger Jungbläserwoche") $scope.events = eventsBlaeserwoche;
			else if($routeParams.location === "Welschnofen") $scope.events = eventsWelschnofen;
			// if(host.indexOf('jugendsommer') !== -1) {
			// 	EventsSvc.findBySummerLocationAsAdmin($routeParams.location).success(function(evs) {
			// 		$scope.events = evs;
			// 	});
			// } else {
			// 	EventsSvc.findByLocationAsAdmin($routeParams.location).success(function(evs) {
			// 		$scope.events = evs;
			// 	});
			// }
		}
	} else {
		if(['club', 'spiritnight'].indexOf($routeParams.location) !== -1) {
			EventsSvc.findByType($routeParams.location).success(function(evs) {
				$scope.events = evs;
			});
		}
		else {
			if(host.indexOf('jugendsommer') !== -1) {
				if($routeParams.location === "Deutschnofen") $scope.events = eventsDeutschnofen;
				else if($routeParams.location === "Hüttenlagerwoche") $scope.events = eventsHuettenlager;
				else if($routeParams.location === "Jenesien") $scope.events = eventsJenesien;
				else if($routeParams.location === "Karneid") $scope.events = eventsKarneid;
				else if($routeParams.location === "Mölten") $scope.events = eventsMoelten;
				else if($routeParams.location === "Ritten") $scope.events = eventsRitten;
				else if($routeParams.location === "Sarntal") $scope.events = eventsSarntal;
				else if($routeParams.location === "SpaceCamp") $scope.events = eventsSpaceCamp;
				else if($routeParams.location === "Tiers") $scope.events = eventsTiers;
				else if($routeParams.location === "Tschögglberger Jungbläserwoche") $scope.events = eventsBlaeserwoche;
				else if($routeParams.location === "Welschnofen") $scope.events = eventsWelschnofen;
				// EventsSvc.findBySummerLocation($routeParams.location).success(function(evs) {
				// 		console.log(evs);
				// 		$scope.events = evs;
				// });
			} else {
				if($routeParams.location === "Deutschnofen") $scope.events = eventsDeutschnofen;
				else if($routeParams.location === "Hüttenlagerwoche") $scope.events = eventsHuettenlager;
				else if($routeParams.location === "Jenesien") $scope.events = eventsJenesien;
				else if($routeParams.location === "Karneid") $scope.events = eventsKarneid;
				else if($routeParams.location === "Mölten") $scope.events = eventsMoelten;
				else if($routeParams.location === "Ritten") $scope.events = eventsRitten;
				else if($routeParams.location === "Sarntal") $scope.events = eventsSarntal;
				else if($routeParams.location === "SpaceCamp") $scope.events = eventsSpaceCamp;
				else if($routeParams.location === "Tiers") $scope.events = eventsTiers;
				else if($routeParams.location === "Tschögglberger Jungbläserwoche") $scope.events = eventsBlaeserwoche;
				else if($routeParams.location === "Welschnofen") $scope.events = eventsWelschnofen;
				// else {
				// 	EventsSvc.findByLocation($routeParams.location).success(function(evs) {
				// 		$scope.events = evs;
				// 	});
				// }
			}

		}
	}
});

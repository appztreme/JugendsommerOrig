var app = angular.module('js');

app.controller('EventsCtrl', function($scope, $routeParams, $location, EventsSvc, IdentitySvc, $rootScope, $translate, PlatformSvc, NotificationSvc) {
	//$scope.busyPromise = EventsSvc.find();
	var host = $location.$$host.toLowerCase();
	$scope.isKiso = host.indexOf('kiso') !== -1
	$scope.platform = PlatformSvc;
	$scope.lang = $translate.proposedLanguage() || $translate.user();

	$scope.isRegistrationWarningVisible = function() {
		var d = new Date('2019-03-14');
		d.setHours(19,0,0);
		var now = Date.now();
		return now < d.getTime();
	}

    $rootScope.$on('$translateChangeSuccess', function() {
        $scope.lang = $translate.proposedLanguage() || $translate.user();
	});

	$scope.filterEvents = function(evs) {
		var result = [];
		for(var i=0; i < evs.length; i++) {
			if($routeParams.event) {
				if(decodeURI($routeParams.event) === evs[i].name) result.push(evs[i]);
			}
			else result.push(evs[i]);
		}
		return result;
	}

	$scope.cannotReserve = function(ev) {
		if(IdentitySvc.isAdmin()) return false;
		else {
			var visible = new Date(ev.visibleFrom);
			visible.setHours(19,0,0);
			var deadline = new Date(ev.visibleTo);
			console.log("visible", visible, deadline, new Date(Date.now()));
			// if((new Date(ev.deadline).getTime()) > Date.now()) return true;
			if(Date.now() > visible.getTime() &&
		       Date.now() < deadline) return false;
			return true;
		}
	}

	$scope.sendReceiptEmail = function(evid) {
		EventsSvc.sendReceiptEmail(evid).success(function(r) {
			if(r.success) NotificationSvc.notify("Erfolgreich verschickt");
			else NotificationSvc.warn("Fehler beim Verschicken");
		});
	}

	$scope.sendReminderEmail = function(evid) {
		EventsSvc.sendReminderEmail(evid).success(function(r) {
			if(r.success) NotificationSvc.notify("Erfolgreich verschickt");
			else NotificationSvc.warn("Fehler beim Verschicken");
		});
	}

	if(IdentitySvc.isAdmin()) {
		if(['club', 'spiritnight'].indexOf($routeParams.location) !== -1) {
			EventsSvc.findByTypeAsAdmin($routeParams.location).success(function(evs) {
				$scope.events = $scope.filterEvents(evs);
			});
		}
		else {
			if(host.indexOf('jugendsommer') !== -1) {
				EventsSvc.findBySummerLocationAsAdmin($routeParams.location).success(function(evs) {
					$scope.events = $scope.filterEvents(evs);
				});
			} else {
				EventsSvc.findByLocationAsAdmin($routeParams.location).success(function(evs) {
					$scope.events = $scope.filterEvents(evs);
				});
			}
		}
	} else {
		if(['club', 'spiritnight'].indexOf($routeParams.location) !== -1) {
			EventsSvc.findByType($routeParams.location).success(function(evs) {
				$scope.events = $scope.filterEvents(evs);
			});
		}
		else {
			if(host.indexOf('jugendsommer') !== -1) {
				EventsSvc.findBySummerLocation($routeParams.location).success(function(evs) {
					$scope.events = $scope.filterEvents(evs);
				});
			} else {
				$scope.events = $scope.filterEvents([
					{$$hashKey: "object:63",budgetBusiness: 0,budgetFood: 0,contactRels: [],contacts: [],description: "Wann: 17. Juni - 02. August 2019; Von Montag bis Freitag von 8.30 bis 15.00 Uhr; Zwischen 7.45 und 8.30 Uhr können die Eltern ihre Kinder bringen; Abholzeit 15.00 – 15.30 Uhr; Wo: Zentrum Maria Heim, Neustifter Weg 5; Kosten: 80 € pro Kind & Woche; Neu: freiwilliger Solidaritätspreis von 90 € pro Woche, um das Projekt zu unterstützen; Für Geschwisterkinder 70 € pro Woche; Im Preis inbegriffen: Kinderbetreuung, Mittagessen, Jause, T-Shirt.",description_it: "Quando: Dal 17 giugno al 2 agosto 2019;↵Da lunedì a venerdì dalle ore 8:30 alle ore 15:00; I genitori possono portare i bambini tra le ore 7:45 e le ore 8:30, e ritirarli tra le ore 15:00 e le ore 15:30; Dove: Centro Maria Heim, via Novacella 5; Costi:↵80€ a settimana per il primo bambino; Novità: prezzo facoltativo di 90€ a settimana, per sostenere il progetto; Per fratelli e sorelle 70€ a settimana; Nel prezzo sono comprese l’attività, il pranzo, una merenda e una maglietta.",endDate: "2019-08-02T00:00:00.000Z",feePerWeek: 80,info: "Für Grundschulkinder aller Muttersprachen. Das Programm wird in deutscher Sprache angeboten, somit werden genügend Grundkenntnisse der deutschen Sprache vorausgesetzt. Der KiSo ist kein Sprachkurs.↵Maximal 42 Kinder pro Woche",info_it: "Per bambini di qualsiasi madrelingua che frequentano le elementari. Le attività vengono svolte in lingua tedesca, perciò è richiesta una sufficiente conoscenza della lingua tedesca. Al massimo 42 bambini a settimana",isInternal: false,location: "Bozen",location_it: "Bolzano",name: "KiSo - Kindersommer 2019",name_it: "KiSo - Kindersommer 2019",optionalFeePerWeek: 10,penalty: 0,siblingDiscount: 10,startDate: "2019-06-17T00:00:00.000Z",type: "summer",visibleFrom: "2019-03-14T00:00:00.000Z",visibleTo: "2019-03-22T00:00:00.000Z",__v: 0,_id: "5c8140ee08ae8d5353f26037"},
					{$$hashKey: "object:64",budgetBusiness: 0,budgetFood: 0,contactRels: [],contacts: [],deadline: "2019-07-10T00:00:00.000Z",description: "Zum ersten Mal bieten wir vier Projektwochen zu verschiedenen Themen: Film, HipHop, Gaming und Music-Video! Alter: 11 bis 15 Jahre (außer Gaming erst ab 12); Uhrzeit: 9.00 - 16.00 Uhr mit Mittagessen; Ort: Lamplhaus in Rentsch, Bozen; Alter: 11-15 Jahre; Kosten: 80,00 bis 90,00 € / Kind; Referenten mit pädagogischer Erfahrung.",description_it: "Per la prima volta vi offriamo quattro settimane di progetto su vari temi: film, hiphop, gaming e music-video! Età: 11-15 anni (salvo Gaming solo dai 12 anni);↵orario: dalle 09.00 alle 16.00 (pranzo incluso); Luogo: Ex-Agnello, Via Rencio, Bolzano; Costi: 80,00 ai 90,00 € / partecipante; Referenti con background pedagogico.",endDate: "2019-08-02T00:00:00.000Z",feePerWeek: 80,info: "Für Mittelschulkinder aller Muttersprachen. Das Programm wird in deutscher Sprache angeboten, somit werden genügend Grundkenntnisse der deutschen Sprache vorausgesetzt. Es handelt sich um keinen Sprachkurs. Maximal 12 Kinder pro Woche",info_it: "Per bambini di qualsiasi madrelingua che frequentano le medie. Le attività vengono svolte in lingua tedesca, perciò è richiesta una sufficiente conoscenza della lingua tedesca. Non si tratta di un corso di lingua.↵Al massimo 12 ragazzi per settimana.",isInternal: false,location: "Bozen",location_it: "Bolzano",name: "Sommerprojektwochen für Kids von 11 - 15 Jahren",name_it: "Settimane estive di progetto per ragazz* dagli 11 ai 15 anni",optionalFeePerWeek: 10,penalty: 0,siblingDiscount: 10,startDate: "2019-07-08T00:00:00.000Z",type: "summer",visibleFrom: "2019-03-15T00:00:00.000Z",visibleTo: "2019-04-15T00:00:00.000Z",__v: 0,_id: "5c814d3708ae8d5353f26042"}
				]);
				// EventsSvc.findByLocation($routeParams.location).success(function(evs) {
				// 	console.log(evs);
				// 	$scope.events = $scope.filterEvents(evs);
				// });
			}

		}
	}
});

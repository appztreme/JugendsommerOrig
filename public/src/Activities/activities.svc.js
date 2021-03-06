var app = angular.module('js');

app.service('ActivitiesSvc', function($http) {
	this.findByEventId = function(eventId) {
		return $http.get('/api/activities', { params: { eventId: eventId }});
	};

	this.findAllSiblingsByActivityId = function(activityId) {
		return $http.get('/api/activities', { params: { activityId: activityId }});
	};

	this.findById = function(activityId) {
		return $http.get('/api/activities/' + activityId);
	};

	this.create = function(activity) {
		return $http.post('/api/activities', activity);	
	};

	this.update = function(activity) {
		return $http.put('/api/activities', activity);
	};

	this.getContacts = function(activityId) {
		return $http.get('/api/activities/contacts/' + activityId);
	}

	this.getAllContacts = function() {
		return $http.get('/api/contact');
	}

	this.addContact = function(activityId, contactId, role) {
		return $http.patch('/api/activities/contacts/add', { activityId: activityId, contactId: contactId, role: role });
	};

	this.removeContact = function(activityId, contactId, role) {
		return $http.patch('/api/activities/contacts/remove', { activityId: activityId, contactId: contactId, role: role });
	}

	this.createContact = function(c) {
		return $http.post('/api/contact/', c);
	}

	this.updateContact = function(cid, phone, email) {
		return $http.put('/api/contact/', {
			id: cid,
			phoneNumber: phone,
			email: email
		});
	}
});

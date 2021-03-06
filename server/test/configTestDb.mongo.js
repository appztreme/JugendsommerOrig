conn = new Mongo();
db = connect('jugendsommer_test');

var curYear = new Date().getFullYear();

db.events.remove({});
db.activities.remove({});
db.registrations.remove({});
db.users.remove({});
db.commitments.remove({});
db.lendings.remove({});

db.events.insert({
    _id: ObjectId('111111111111111111111111'),
    name: 'event1',
    name_it: 'evento1',
    description: 'description event1',
    description_it: 'descriptivo evento1',
    type: 'summer',
    location: 'Jenesien',
    location_it: 'San Genesio',
    startDate: new Date(curYear,11,1),
    endDate: new Date(curYear,12,1),
    visibleFrom: new Date(curYear,4,1),
    visibleTo: new Date(curYear,10,1),
    budgetBusiness: 3500,
    budgetFood: 200,
    info: 'info for event1',
    info_it: 'informationi de evento1',
    isInternal: false,
    contacts: ['111111111111111100000001', '111111111111111100000002'],
    contactRels: [{contact: ObjectId('111111111111111100000001'), role: 'Teamleiter'}, {contact: ObjectId('111111111111111100000002'), role: 'Betreuer'}]
});
db.events.insert({
    _id: ObjectId('111111111111111111111112'),
    name: 'event2',
    name_it: 'evento2',
    type: 'music',
    location: 'Mölten',
    location_it: 'Molto',
    description: 'description event2',
    description_it: 'descriptivo evento2',
    startDate: new Date(curYear,1,1),
    endDate: new Date(curYear,3,1),
    visibleFrom: new Date(curYear,1,1),
    visibleTo: new Date(curYear,10,1),
    budgetBusiness: 2045,
    budgetFood: 20,
    info: 'info for event2',
    info_it: 'informationi de evento2',
    isInternal: false,
});
db.events.insert({
    _id: ObjectId('111111111111111111111113'),
    name: 'event3',
    name_it: 'evento3',
    type: 'music',
    location: 'Tiers',
    location_it: 'Tierso',
    description: 'description event3',
    description_it: 'descriptioni evento3',
    startDate: new Date(curYear,4,1),
    endDate: new Date(curYear,6,1),
    visibleFrom: new Date(curYear,1,1),
    visibleTo: new Date(curYear,11,1),
    budgetBusiness: 999,
    budgetFood: 143,
    info: 'info for event3',
    info_it: 'informationi de evento3',
    isInternal: true,
});
db.events.insert({
    _id: ObjectId('111111111111111111111119'),
    name: 'event9',
    name_it: 'evento9',
    type: 'summer',
    'location': 'Karneid',
    location_it: 'Karneido',
    description: 'description event9',
    description_it: 'descriptioni evento9',
    startDate: new Date(curYear-1,1,1),
    endDate: new Date(curYear-1,3,1),
    visibleFrom: new Date(curYear-1,1,1),
    visibleTo: new Date(curYear-1,10,1),
    budgetBusiness: 1000,
    budgetFood: 2,
    info: 'info for event9',
    info_it: 'informationi de evento9',
    isInternal: false,
});

var eventsCnt = db.events.find().count();
print("Events inserted: " + eventsCnt);

db.activities.insert({
    _id: ObjectId('111111111111111111111101'),
    name: 'activity1',
    name_it: 'activity1 it',
    description: 'description activity1',
    description_it: 'descriptioni de activity1',
    startDate: new Date(curYear,11,1),
    endDate: new Date(curYear,11,3),
    eventId: ObjectId('111111111111111111111111'),
    maxParticipants: 5,
    queueSize: 3,
    curParticipants: 0
});

db.activities.insert({
    _id: ObjectId('111111111111111111111102'),
    name: 'activity2',
    name_it: 'activity2 it',
    description: 'description activity2',
    description_it: 'descriptioni de activity2',
    startDate: new Date(curYear,11,4),
    endDate: new Date(curYear,11,7),
    eventId: ObjectId('111111111111111111111111'),
    maxParticipants: 3,
    queueSize: 1,
    curParticipants: 2
});

db.activities.insert({
    _id: ObjectId('111111111111111111111107'),
    name: 'activity3',
    name_it: 'activity3 it',
    description: 'description activity3',
    description_it: 'descriptioni de activity3',
    startDate: new Date(curYear,1,2),
    endDate: new Date(curYear,1,6),
    eventId: ObjectId('111111111111111111111112'),
    maxParticipants: 3,
    queueSize: 1,
    curParticipants: 1
});

db.activities.insert({
    _id: ObjectId('111111111111111111111108'),
    name: 'activity4',
    name_it: 'activity4 it',
    description: 'description activity4',
    description_it: 'descriptioni de activity4',
    startDate: new Date(curYear,1,8),
    endDate: new Date(curYear,1,12),
    eventId: ObjectId('111111111111111111111112'),
    maxParticipants: 3,
    queueSize: 1,
    curParticipants: 0
});

db.activities.insert({
    _id: ObjectId('111111111111111111111109'),
    name: 'activity5',
    name_it: 'activity5 it',
    description: 'description activity5',
    description_it: 'descriptioni de activity5',
    startDate: new Date(curYear-1,11,20),
    endDate: new Date(curYear-1,11,22),
    eventId: ObjectId('111111111111111111111112'),
    maxParticipants: 3,
    queueSize: 1,
    curParticipants: 0
});

var activitiesCnt = db.activities.find().count();
print("Activities inserted: " + activitiesCnt);

db.registrations.insert({
    _id: ObjectId('111111111111111111111001'),
    firstNameChild: 'firstName',
    lastNameChild: 'lastName',
    firstNameParent: 'firstNameParent',
    lastNameParent: 'lastNameParent',
    emailParent: 'adfghi',
    phoneNumberParent: '1234 / 5678',
    schoolChild: '1. Klasse',
    birthdayChild: new Date(2010,11,9),
    activityId: ObjectId('111111111111111111111102'),
    healthChild: 'alles gut',
    registrationDate: new Date(curYear, 5,5),
    gender: 'female',
    userId: ObjectId('111111111111111111110001')
});

db.registrations.insert({
    _id: ObjectId('111111111111111111111002'),
    firstNameChild: 'firstName2',
    lastNameChild: 'lastName2',
    firstNameParent: 'firstNameParent2',
    lastNameParent: 'lastNameParent2',
    emailParent: 'abcdefg',
    phoneNumberParent: '9876 / 54321',
    schoolChild: '2. Klasse',
    birthdayChild: new Date(2008,9,1),
    activityId: ObjectId('111111111111111111111102'),
    healthChild: '-',
    registrationDate: new Date(curYear, 7,12),
    gender: 'male',
    userId: ObjectId('111111111111111111110001')
});

db.registrations.insert({
    _id: ObjectId('111111111111111111111003'),
    firstNameChild: 'firstName3',
    lastNameChild: 'lastName3',
    firstNameParent: 'firstNameParent3',
    lastNameParent: 'lastNameParent3',
    emailParent: 'abcgmx.at',
    phoneNumberParent: '9876 / 54321',
    schoolChild: '-',
    birthdayChild: new Date(2009,7,8),
    activityId: ObjectId('111111111111111111111107'),
    healthChild: '-',
    bandName: 'music band',
    instrument: 'french horn',
    instrumentYears: '4 Jahre',
    registrationDate: new Date(curYear, 6,19),
    gender: 'male',
    userId: ObjectId('111111111111111111110001')
});

db.registrations.insert({
    _id: ObjectId('111111111111111111111004'),
    firstNameChild: 'firstName4',
    lastNameChild: 'lastName4',
    firstNameParent: 'firstNameParent4',
    lastNameParent: 'lastNameParent4',
    emailParent: 'abcgmx.at',
    phoneNumberParent: '9876 / 54321',
    schoolChild: '-',
    birthdayChild: new Date(2009,7,8),
    activityId: ObjectId('111111111111111111111102'),
    healthChild: '-',
    bandName: 'music band',
    instrument: 'french horn',
    instrumentYears: '4 Jahre',
    registrationDate: new Date(2016, 6,19),
    gender: "female",
    userId: ObjectId('111111111111111111110001')
});

var registrationsCnt = db.registrations.find().count();
print("Registrations inserted: " + registrationsCnt);

db.contacts.insert({
    _id: ObjectId('111111111111111100000001'),
    firstName: 'contact1FirstName',
    lastName: 'contact2FirstName',
    phoneNumber: '123 / 456 789',
    email: 'contact1@gmx.at',
    type: 'Betreuer' 
});

db.contacts.insert({
    _id: ObjectId('111111111111111100000002'),
    firstName: 'contact2FirstName',
    lastName: 'contact2LastName',
    phoneNumber: '234 / 567 890',
    email: 'contact2@gmx.at',
    type: 'Kontakt'
});

db.contacts.insert({
    _id: ObjectId('111111111111111100000003'),
    firstName: 'contact3FirtName',
    lastName: 'contact3LastName',
    phoneNumber: '345 / 678 901',
    email: 'contact3@gmx.at',
    type: 'Kontakt'
})

var contactsCnt = db.contacts.find().count();
print("Contacts inserted: " + contactsCnt);

db.commitments.insert({
    _id: ObjectId('111111111111111111100001'),
    name: 'commitment 1',
    index: 1,
    description: 'description commitment 1',
    date: new Date(curYear,3,21),
    type: 'business',
    amount: 88.90,
    eventId: ObjectId('111111111111111111111111'),
    userId: ObjectId('111111111111111111110003'),
    isPaymentDone: true,
    isPaymentJDDone: false,
    isInvoice: false
});

db.commitments.insert({
    _id: ObjectId('111111111111111111100002'),
    name: 'commitment 2',
    index: 2,
    description: 'description commitment 2',
    date: new Date(curYear,11,1),
    type: 'food',
    amount: 12.4,
    eventId: ObjectId('111111111111111111111111'),
    userId: ObjectId('111111111111111111110003'),
    isPaymentDone: false,
    isPaymentJDDone: true,
    isInvoice: false
});

db.commitments.insert({
    _id: ObjectId('111111111111111111100003'),
    name: 'commitment 3',
    index: 3,
    description: 'description commitment 3',
    date: new Date(curYear,6,7),
    type: 'business',
    amount: 119.10,
    eventId: ObjectId('111111111111111111111112'),
    userId: ObjectId('111111111111111111110003'),
    isPaymentDone: false,
    isPaymentJDDone: false,
    isInvoice: true
});

db.commitments.insert({
    _id: ObjectId('111111111111111111100004'),
    name: 'commitment 4',
    index: 4,
    description: 'description commitment 4',
    date: new Date(curYear,5,14),
    type: 'food',
    amount: 66.89,
    eventId: ObjectId('111111111111111111111112'),
    userId: ObjectId('111111111111111111110003'),
    isPaymentDone: true,
    isPaymentJDDone: false,
    isInvoice: false
});

var commitmentsCnt = db.commitments.find().count();
print("Commitments insertet: " + commitmentsCnt);

db.resources.insert({
  _id: ObjectId('111111111111111111000001'),
  name: 'resource 1',
  description: 'description of resource 1',
  type: 'xxx'
});

db.resources.insert({
  _id: ObjectId('111111111111111111000002'),
  name: 'resource 2',
  description: 'description of resource 2',
  type: 'xxx'
});

db.resources.insert({
  _id: ObjectId('111111111111111111000003'),
  name: 'resource 3',
  description: 'description of resource 3',
  type: 'xyz'
});

var resourcesCnt = db.resources.find().count();
print("Resources inserted: " + resourcesCnt);

db.lendings.insert({
  _id: ObjectId('111111111111111110000001'),
  eventId: ObjectId('111111111111111111111111'),
  userId: ObjectId('111111111111111111110003'),
  resourceId: ObjectId('111111111111111111000001'),
  date: new Date('2016-06-16')
});

db.lendings.insert({
  _id: ObjectId('111111111111111110000002'),
  eventId: ObjectId('111111111111111111111111'),
  userId: ObjectId('111111111111111111110003'),
  resourceId: ObjectId('111111111111111111000003'),
  date: new Date('2016-06-17')
});

var lendingsCnt = db.lendings.find().count();
print("Lendings inserted: " + lendingsCnt);

db.users.insert({
    _id: ObjectId('111111111111111111110001'),
    firstName: 'userFirst',
    lastName: 'userLast',
    userTel: '1234/56789',
    userEmail: 'useruser',
    userName: 'user',
    hashedPassword: '7422a98bd783f63a9e242adde9d20fff5d20ad7d', // user
    salt: 'hUSxAgsgRwEpfWfS2m5SKsyjOJYWrg21qWnebUeqIhbndfVljWbvWLj68HgmL2uRO0i0c5/CYFYM8trIKPygcGEkLmNR6qxS3pINUW0iI05JkUkqbodB/WSSmsw+8HmEu67Vc+Hho6fpDwXsCId4N7i8cD+PvhJmRzyk5WvTw1k=',
    roles: []
});

db.users.insert({
    _id: ObjectId('111111111111111111110002'),
    firstName: 'adminFirst',
    lastName: 'adminLast',
    userTel: '+98 7654 321',
    userEmail: 'adminadmin',
    userName: 'admin',
    hashedPassword: 'ca6a0cca16b21299724f71ef2fb23321ea5f1d6f', // admin
    salt: 'Kn6OJvtD2fDxN8LSqr2C/QGVvuvhfTOBJQY7osU94AHCQu/6Ux0s1DrFThYDq8d+wsscYglbW/2ggbsEX0nWE3AFSeIp/wkENBzcsR7jx1o5FS9GlEaaDL6TEuo+3Q1YKyTnBSUxgHqe4MORX5nRD9W9imQkwnO62gzZpFMLIOo=',
    roles: ['admin','fadmin']
});

db.users.insert({
    _id: ObjectId('111111111111111111110003'),
    firstName: 'fadminFirst',
    lastName: 'fadminLast',
    userEmail: 'fadminfadmin',
    userTel: '111 222 3',
    userName: 'fadmin',
    hashedPassword: '4a2d5a39e8354192ad3563c2518be5b2c1c23976', // fadmin
    salt: 'rVYhanL+gUoZjI3cR4mEfTUvzFoj7OFYFHtKonqQProuolDIPzzmFqgoo6xCkTvPj55bcTf9cJNM4oRcSG2+OpQ1lPl9Kuv0Ljfs5rIJ3ak/u2jL7lShF8QZYAYjEd5ewh7Dgb7JE1ax00pd5ol7vMqkTzsEbPjl9pCwiUd/LxQ=',
    roles: ['fadmin'],
    eventId: ObjectId('111111111111111111111112'),
});

db.users.insert({
    _id: ObjectId('111111111111111111110004'),
    firstName: 'testFirst',
    lastName: 'testLast',
    userTel: '1234/56789',
    userEmail: 'florian.edelmaier@gmail.com',
    userName: 'test',
    hashedPassword: '3fb9421d0d206d6726a1bf476183b6d2281781f7', // user
    salt: 'j3D+6LLnpmfebjVSCLWVF3G2dCgNvVO/ieVu6VjOiGj1/zGhiHa4Sc8NO7ojrl59oZ5qdVPoLNXHd0xqJ/kSGKQTsiVs5JbKHMxIff+JIfioByLfz2pbL37br3HKiQWCDNF//Orf2oa9vt7XElkhS7ZfVksmsSoAvkQji5Wce6c=',
    roles: []
});

var userCnt = db.users.find().count();
print("Users inserted: " + userCnt);

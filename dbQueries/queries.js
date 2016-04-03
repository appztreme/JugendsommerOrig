// count of this years registrations
db.registrations.find({registrationDate: {$gte: new Date(2016,1,1)}}).count();

// find userName doubles via map / reduce
var map = function() {
  if(this.userName) {
      emit(this.userName, 1);
  }
}

var reduce = function(key, values) {
  return Array.sum(values);
}

var res = db.users.mapReduce(map, reduce, { out: { inline : 1 }});
db[res.result].find({ value: {$gt: 1}}).sort({ value: -1 });

{ "_id" : "02.02.2006", "value" : 2 }
{ "_id" : "Alber", "value" : 2 }
{ "_id" : "Ale11", "value" : 2 }
{ "_id" : "Alexandra", "value" : 6 }
{ "_id" : "Andrea", "value" : 4 }
{ "_id" : "Andreas", "value" : 10 }
{ "_id" : "Anita", "value" : 6 }
{ "_id" : "Anna", "value" : 3 }
{ "_id" : "Anna Maria", "value" : 2 }
{ "_id" : "Anna Maria Dalvai", "value" : 2 }
{ "_id" : "Barbara", "value" : 7 }
{ "_id" : "Biene76", "value" : 2 }
{ "_id" : "BirgitGamper", "value" : 12 }
{ "_id" : "Brigitte", "value" : 9 }
{ "_id" : "Brigitte.zelger@pfoesl.it", "value" : 2 }
{ "_id" : "Brunnerrenate", "value" : 2 }
{ "_id" : "Carmen", "value" : 3 }
{ "_id" : "Christa Lanznaster", "value" : 2 }
{ "_id" : "Claudia", "value" : 9 }
{ "_id" : "David", "value" : 2 }
{ "_id" : "EG1502GE", "value" : 2 }
{ "_id" : "Egger", "value" : 2 }
{ "_id" : "Elisabeth", "value" : 2 }
{ "_id" : "ElisabethResch1976", "value" : 2 }
{ "_id" : "ElisabethResch76", "value" : 5 }
{ "_id" : "Emma Öhler", "value" : 2 }
{ "_id" : "Eva", "value" : 2 }
{ "_id" : "Fabian", "value" : 2 }
{ "_id" : "Ferien", "value" : 3 }
{ "_id" : "Frederik", "value" : 2 }
{ "_id" : "Frettchien", "value" : 2 }
{ "_id" : "Gartler", "value" : 2 }
{ "_id" : "Gertrud Zippl", "value" : 7 }
{ "_id" : "Gigga", "value" : 2 }
{ "_id" : "Ginger", "value" : 3 }
{ "_id" : "H", "value" : 5 }
{ "_id" : "HOLLAMAR", "value" : 2 }
{ "_id" : "Hannelore", "value" : 2 }
{ "_id" : "Heidi", "value" : 3 }
{ "_id" : "Helene.Domanegg", "value" : 2 }
{ "_id" : "Helga", "value" : 7 }
{ "_id" : "Hermann Oberkofler", "value" : 2 }
{ "_id" : "Hoeller Marvin", "value" : 4 }
{ "_id" : "Innerfohrerhof", "value" : 2 }
{ "_id" : "Jana", "value" : 9 }
{ "_id" : "Johann", "value" : 4 }
{ "_id" : "Jonas", "value" : 2 }
{ "_id" : "Judith", "value" : 4 }
{ "_id" : "Jugendsommer", "value" : 4 }
{ "_id" : "Julia", "value" : 10 }
{ "_id" : "Julian", "value" : 3 }
{ "_id" : "Juliana", "value" : 3 }
{ "_id" : "Karin", "value" : 2 }
{ "_id" : "Karin reichhalter", "value" : 2 }
{ "_id" : "Karina", "value" : 2 }
{ "_id" : "KatjaO", "value" : 2 }
{ "_id" : "Kornelia", "value" : 5 }
{ "_id" : "Losso Marvin", "value" : 2 }
{ "_id" : "Lossogreti", "value" : 2 }
{ "_id" : "Luis", "value" : 2 }
{ "_id" : "Lydia", "value" : 8 }
{ "_id" : "Maddalena Braccesi", "value" : 2 }
{ "_id" : "Maria", "value" : 3 }
{ "_id" : "Maria Zelger", "value" : 3 }
{ "_id" : "Markus", "value" : 3 }
{ "_id" : "Martha", "value" : 8 }
{ "_id" : "Martina", "value" : 5 }
{ "_id" : "Max Rassler", "value" : 2 }
{ "_id" : "Maxzelger", "value" : 2 }
{ "_id" : "Mops", "value" : 4 }
{ "_id" : "Nora", "value" : 3 }
{ "_id" : "Ossi", "value" : 2 }
{ "_id" : "PVerena", "value" : 2 }
{ "_id" : "Patrick", "value" : 2 }
{ "_id" : "Patti", "value" : 5 }
{ "_id" : "PaulThurner", "value" : 2 }
{ "_id" : "Peter", "value" : 5 }
{ "_id" : "Petra", "value" : 18 }
{ "_id" : "Petra1313", "value" : 2 }
{ "_id" : "Piet 1970", "value" : 2 }
{ "_id" : "RenateUnterhauser", "value" : 2 }
{ "_id" : "Roland65", "value" : 2 }
{ "_id" : "Rosmarie.2001", "value" : 2 }
{ "_id" : "SARAFRANZOSO", "value" : 2 }
{ "_id" : "Sabine", "value" : 2 }
{ "_id" : "Sabine Matzneller", "value" : 2 }
{ "_id" : "Sabrina", "value" : 4 }
{ "_id" : "Salon Helene", "value" : 2 }
{ "_id" : "Sara", "value" : 2 }
{ "_id" : "Sibylle", "value" : 4 }
{ "_id" : "Sieglinde", "value" : 6 }
{ "_id" : "Sigrid", "value" : 9 }
{ "_id" : "Sigrid Wieser", "value" : 4 }
{ "_id" : "Sommer", "value" : 8 }
{ "_id" : "Striller", "value" : 3 }
{ "_id" : "Super", "value" : 2 }
{ "_id" : "Tanja", "value" : 11 }
{ "_id" : "Theresia Hofer", "value" : 2 }
{ "_id" : "Tina", "value" : 2 }
{ "_id" : "Tratter.Markus", "value" : 2 }
{ "_id" : "Ullipechlaner", "value" : 3 }
{ "_id" : "Unterkofler", "value" : 4 }
{ "_id" : "Verena", "value" : 4 }
{ "_id" : "VerenaP", "value" : 4 }
{ "_id" : "Veronika", "value" : 8 }
{ "_id" : "Wally", "value" : 3 }
{ "_id" : "Wilma", "value" : 2 }
{ "_id" : "Zelger Emma", "value" : 2 }
{ "_id" : "a", "value" : 2 }
{ "_id" : "ale10", "value" : 3 }
{ "_id" : "amort.h", "value" : 2 }
{ "_id" : "angelika", "value" : 5 }
{ "_id" : "bauernhof", "value" : 2 }
{ "_id" : "bsp.sophia", "value" : 3 }
{ "_id" : "chrissy", "value" : 2 }
{ "_id" : "christine", "value" : 2 }
{ "_id" : "davidraphaeljana", "value" : 3 }
{ "_id" : "dieter", "value" : 3 }
{ "_id" : "dietmar", "value" : 3 }
{ "_id" : "dorfmann.tilly@brennercom.net", "value" : 4 }

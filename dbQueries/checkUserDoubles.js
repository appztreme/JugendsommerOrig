conn = new Mongo();
db = connect('jugendsommer');

var uName = 'Andreas';

var uCursor = db.users.find({userName: uName});
while(uCursor.hasNext()) {
  var u = uCursor.next();
  printjson(u);
}

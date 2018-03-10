'use strict';
const mail = require('./server/controller/mail');

const recipient = "thaler.ulrich@yahoo.de,josef.ainhauser@rolmail.net,claudia.pilser21@gmail.com,isapia1303@gmail.com,hienar.h@gmail.com,doris.felderer@rolmail.net,rainer.moser@rolmail.net,michizelger@yahoo.com,helga.gostner@gmail.com,trojer.na@gmail.com,anvodova@yahoo.it,margarethkofler3@gmail.com,gertraud.lantschner@gmail.com,efeld69@gmail.com,rollmops@alice.it,helgastiglmair@gmail.com,wallypsaier@yahoo.de,margareth.obkircher@yahoo.de,ritatrojer77@gmail.com,chrimatz@gmail.com,murmar1709@gmail.com,verena.nussbaumer@rolmail.net,Josef.thaler@bfree.it,metallbau.messner@dnet.it,r.trojer@hotmail.de,trojerchristine@gmail.com,biggi06082004@gmail.com,anniaichner77@gmail.com,martineschgfeller@gmail.com,johann.heiss@alice.it,Ruth.Thaler@hotmail.de,mittelbergerkatja@gmail.com,florian.edelmaier@gmail.com";
//const recipient = "florian.edelmaier@gmail.com";

mail.sendSorryMail(recipient);
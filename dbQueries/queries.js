db.registrations.find({registrationDate: {$gte: new Date(2016,1,1)}}).count();

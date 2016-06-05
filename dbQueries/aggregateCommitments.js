
db.commitments.aggregate([
    { $group:
      { _id:
        {
          eventId: "$eventId",
          type: "$type",
        },
        sum: { $sum: "$amount" }
      }
    },
    { $group:
      { _id: "$_id.eventId",
        sumFood:     { $max: {$cond: [ { $eq: ['$_id.type', 'food'    ] }, '$sum', 0]} },
        sumBusiness: { $max: {$cond: [ { $eq: ['$_id.type', 'business'] }, '$sum', 0]} },
        sumTravel:   { $max: {$cond: [ { $eq: ['$_id.type', 'travel'  ] }, '$sum', 0]} },
      }
    }
  ], function(err, ag) { console.log("RES:", err, ag); });

  db.commitments.aggregate([
      { $group:
        { _id:
          {
            eventId: "$eventId",
            type: "$type",
          },
          sum: { $sum: "$amount" }
        }
      }
    ], function(err, ag) { console.log("RES:", err, ag); });

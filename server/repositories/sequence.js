'use strict';
const Sequence = require('./../models/sequence');

exports.nextReceipt = () => {
    return Sequence.findOneAndUpdate(
        { _id: 'receipt' },
        { $inc: { seq: 1} },
        { upsert: true }
    );
}
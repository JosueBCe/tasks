var Sequence = require('../models/sequence');
const mongoose = require('mongoose');
var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

/* function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
    });
} */
function SequenceGenerator() {
  Sequence.findOne({_id: '649b9ca60e53fdfcab0ce936'})
    .exec(function(err, sequence) {
      if (err) {
        console.error(err);
        return;
      }

      if (!sequence) {
        // If sequence is null, create a new sequence object and save it to the database
        sequence = new Sequence({
          _id: mongoose.Types.ObjectId('649b9ca60e53fdfcab0ce936'),
          maxDocumentId: 100,
          maxMessageId: 100,
          maxContactId: 101
        });
        sequence.save(function(err, seq) {
          if (err) {
            console.error(err);
            return;
          }
          console.log('New sequence created: ', seq);
        });
      }

      sequenceId = sequence._id.toString();
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = {maxDocumentId: maxDocumentId};
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = {maxMessageId: maxMessageId};
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = {maxContactId: maxContactId};
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();

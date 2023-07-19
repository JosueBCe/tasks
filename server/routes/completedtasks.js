const express = require('express');
const router = express.Router();
const completedTasks = require('../models/completedtasks');


router.get('/', (req, res, next) => {
    completedTasks.find()
        .then(completedtasks => {
            res.status(200).json({
                // message: 'Contacts fetched successfully!',
                completedtasks: completedtasks
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  completedTasks.findOne({ id: id })
    .then((completedTask) => {
      if (completedTask) {
        res.status(200).json(completedTask);
      } else {
        res.status(404).json({ message: 'Completed task not found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving completed task' });
    });
});


router.put('/:id', (req, res) => {
  const id = req.params.id;
  const completedTasks = req.body.completedTasks;

  CompletedTask.findOneAndUpdate({ id: id },
    { completedTasks: completedTasks },
    { new: true })
    .then((updatedTask) => {
      res.status(200).json({
        completedtasks: updatedTask
    })
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Error updating task' });
    });
});



module.exports = router;

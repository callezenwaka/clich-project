'use strict';
const express = require('express');
const app = express();
const router = express.Router();

// Require Item model in our routes module
const Clich = require('../models/clich');

// Defined store route
router.post('/', (req, res) => {
  const clich = new Clich(req.body);
      clich.save()
    .then(clich => {
    res.status(200).json({'Clich': 'Item added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
router.get('/', (req, res) => {
  Clich.find({}, function (err, cliches){
    if(err){
      console.log(err);
    }
    else {
      console.log('cliches: '${cliches.length});
      res.json(cliches);
    }
  });
});

// Defined show route
router.get('/:id', (req, res) => {
  Clich.findById(req.params.id, function (err, clich){
    if(err){
      console.log(err);
    }
    else {
      res.json(clich);
    }
  });
});

// Defined edit route
// router.route('/edit/:id').get(function (req, res) {
//   const id = req.params.id;
//   Item.findById(id, function (err, item){
//       res.json(item);
//   });
// });

//  Defined update route
// router.route('/update/:id').post(function (req, res) {
//   Item.findById(req.params.id, function(err, item) {
//     if (!item)
//       return next(new Error('Could not load Document'));
//     else {
//       item.name = req.body.name;
//       item.price = req.body.price;

//       item.save().then(item => {
//           res.json('Update complete');
//       })
//       .catch(err => {
//             res.status(400).send("unable to update the database");
//       });
//     }
//   });
// });

// Defined delete | remove | destroy route
// router.route('/delete/:id').get(function (req, res) {
//   Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
// 		if(err) res.json(err);
// 		else res.json('Successfully removed');
// 	});
// });

module.exports = router;
const SauceCrtl = require('../models/sauce');

// exports.createSauce = (req, res, next) => {
//     delete req.body._id;
//     const sauce = new Sauce({
//         ...req.body
//     });
//     sauce.save()
//     .then(()=> res.status(201).json({message: 'Sauce ajoutée'}))
//     .catch (error => res.satus(400).json({ error }));
 
// }

// exports.getOneSauce = (req, res, next) => {
//     sauce.findOne({
//         _id: req.params.id
//     })
//     .then((thing) => {res.status(200).json(thing)})
//     .catch((error) =>{
//         res.status(404).json({ error: error});
//     });
    
// };

// exports.modifySauce = (req, res, next) => {
//     const sauce = new Sauce({
//       _id: req.params.id,
//       title: req.body.title,
//       description: req.body.description,
//       imageUrl: req.body.imageUrl,
//       price: req.body.price,
//       userId: req.body.userId
//     });
//     Thing.updateOne({_id: req.params.id}, Thing).then(
//       () => {
//         res.status(201).json({
//           message: 'Commentaire modifié!'
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   };
  
//   exports.deleteSauce = (req, res, next) => {
//     Sauce.deleteOne({_id: req.params.id}).then(
//       () => {
//         res.status(200).json({
//           message: 'Supprimé'
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   };
  
//   exports.getAllSauce = (req, res, next) => {
//     Sauce.find().then(
//       (sauces) => {
//         res.status(200).json(Sauces);
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   };
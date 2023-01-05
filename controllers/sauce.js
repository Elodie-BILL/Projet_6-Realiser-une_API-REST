const Sauce = require('../models/sauce');
const fs = require('fs');
const sauce = require('../models/sauce');

exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  console.log(sauceObject);

  delete sauceObject._id;
  delete sauceObject._userId;

  // récupération du token
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  sauce.save()
  .then(() => (res.status(201).json({message: 'Sauce enregistrée'})))
  .catch(error => { res.status(400).json({error})});
 
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    })
    .then(Sauce => {
      res.status(200).json(Sauce)
    })
    .catch((error) =>{
      res.status(404).json({ error: error});
    });
    
};

exports.modifySauce = (req, res) => {
  // Vérification existance champs 'file'
  const sauceObject = req.file ? {
    ... JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    

  }: {...req.body};  

  delete sauceObject.imageUtl;
  delete sauceObject._userId;
  Sauce.findOne({_id: req.params.id}) //Récupértion sauce en base de donnée
    .then((Sauce) => {
      if (Sauce.userId != req.auth.userId){
        return res.status(401).json({ message: 'Action non autorisé'});
      } 
      
      Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
      .then(()=> Sauce.save())
      .then(()  =>
        res.status(200).json( { message: 'Sauce modifié'} )
      )
      .catch(error => res.status(401).json({error}));
      

    })    
    .catch((error) =>{
      res.status(400).json({error})
    });  
    
};    
 
  
exports.deleteSauce = (req, res) => {
  Sauce.findOne({_id: req.auth.id})
    .then(sauce => {
      if (sauce.userId != req.auth.userId){
        return res.status(401).json({ message: 'Action non autorisé'});
      } 

      const filename = Sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id})
          .then(()=> 
            res.status(200).json({message: 'sauce supprimé'})
          )
          .catch(error => 
            res.status(401).json({ error})
          );
      });
      
    })
    .catch( error => {
      res.status(500).json({error});
    });    
   
};
  
exports.getAllSauce = (req, res) => {
  Sauce.find()
    .then((Sauce) => {
      res.status(200).json(Sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

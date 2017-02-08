module.exports.createNewJammer = function(req){
  var newJammer = Jammer(req.body)
  console.log("Jammer1: " + newJammer)
  if (req.files['image']) { newJammer.imagePath = req.files['image'][0]['location']}
  if (req.files['audio']) { newJammer.audioPath = req.files['audio'][0]['location']}
  newJammer.addedBy = req.user
  newJammer.save(function(err) {
    if (err) throw err;
    console.log("Jammer2: " + newJammer)
  })
  console.log("Output: " + newJammer)
}

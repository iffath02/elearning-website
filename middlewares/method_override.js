const methodOverride = require('method-override')


//methodoverride is a function returns another function
const method_Override = methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  })



module.exports = method_Override
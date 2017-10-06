// Includes
var mysql = require('../mysql'); // Includamo mysql.js da mozemo slati querije
//------------------------------------------------------------------------------

// Function to load childs data
var loadChilds = function(id, req, res) {

  // Sending query to preview data
  mysql.sendQuery("SELECT * FROM child_scrap WHERE id_scrap=" + id + ";",
    function(err, rows, fields) {

      // If any error occurs
      if(err) {
        res.render('index',{
          content: 'tools/childs.ejs',
          error: 'Error occured while returnig from database !',
          user: req.user});
        return;
      }

      // If any error occurs
      if(rows == '') {
        res.render('index',{
          content: 'tools/childs.ejs',
          error: 'Requested ID can not be found in database !',
          user: req.user});
        return;
      }

      // If there is no error we send data
      res.render('index',{
        content: 'tools/childs.ejs',
        childs: rows,
        user: req.user});

    });
}
//------------------------------------------------------------------------------

// Exports
module.exports = {
  loadChilds: loadChilds
};
//------------------------------------------------------------------------------

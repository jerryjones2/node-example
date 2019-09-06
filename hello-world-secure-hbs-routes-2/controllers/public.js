'use strict';

function index (req, res) {
    res.render('home.hbs',
        {
            pageTitle: 'Home Page',
            message: 'Welcome to my Node.js Web Site!'
        }
    )
}

function about(req,res) {
    let value = req.sessionID;
    res.render('about.hbs',
      {
          pageTitle: 'About Page',
          message: `Session ID ${value}`
      }
  )
}

module.exports = {
    index: index,
    about: about
};
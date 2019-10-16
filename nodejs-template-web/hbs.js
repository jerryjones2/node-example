const hbs = require('hbs');

function create() {
    // =================================================
    // Initialize HBS
    // =================================================
    hbs.registerPartials(__dirname + '/views/partials');

    // =================================================
    // HBS Helpers
    // =================================================
    hbs.registerHelper('getCurrentYear',
        () => {
            return new Date().getFullYear()
        }
    )
    hbs.registerHelper('screamIt', 
        (text) => {
            return text.toUpperCase()
        }
    )

    return hbs;
}


module.exports = {
    create: create
}
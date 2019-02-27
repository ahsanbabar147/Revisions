module.exports =function(models){	
const Revision = require('../libs/CreateRevision')(models);
    const updateEsSearch = require("../libs/elasticSearchAPI").updateEsSearch;
		  models.Password.Password.watch({fullDocument: 'updateLookup'}).on('change', data => {
            console.log("I am password watcher");
            console.log(data);
            Revision.saveRevision(data, "Password", "PasswordHist", "ITBPasswordId");
        });
}
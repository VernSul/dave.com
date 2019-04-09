//sighting table data model.
const bearModel = require('./bearModel');

const bearController = {

    record: async (req, res) => {
        let resp;
        try {
            resp = await bearModel.create(req.body);
        } catch(err) {
            resp = err;
            console.log(err);
        }
        res.send(resp);

    },

    search: async(req, res) => {
        let resp;

        try{
            if(req.query.sort){
                delete req.query.sort;
                resp = await bearModel.findAll({ where: req.query, order: [['num_bears', 'ASC']]});
            }
            
            else resp = await bearModel.findAll({ where: req.query, order: [['createdat', 'ASC']]});
        } catch(err) {
            console.log(err);
            resp = err;
        }
        res.send(resp);
    },

    searchId: async (req, res) => {
        try {
            resp = await bearModel.findAll({where: req.params})
        } catch(err) {
            console.log(err);
            resp = err;
        }

        res.send(resp);

    },

}

module.exports = bearController;

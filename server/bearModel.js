const connectionString = 'postgres://aikvqeqd:Rsj5vf4VFPHxCid2OsJK76neJalxzOza@isilo.db.elephantsql.com:5432/aikvqeqd';
const Sequelize = require('sequelize');

sequelize = new Sequelize(connectionString);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const bearModel = sequelize.define('sightings', {
    start_date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    end_date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    num_bears: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
    notes: { type: Sequelize.STRING },
    bear_type: { type: Sequelize.STRING },
    zip_code: { type: Sequelize.INTEGER }
}, {
  timestamps  : false
});

 

module.exports = bearModel;
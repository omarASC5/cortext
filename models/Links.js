const Sequelize = require('sequelize');
const db = require('../config/database');

const Link = db.define('link', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: 'true'
	},
	url: {
		type: Sequelize.STRING,
		allowNull: false
	},
}, {
	timestamps: false
});

module.exports = Link;
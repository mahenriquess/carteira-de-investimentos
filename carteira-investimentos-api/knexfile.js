// Update with your config settings.

module.exports = {
	client: 'postgresql',
	connection: {
		host: 'motty.db.elephantsql.com',
		database: 'linhcgcx',
		user:     'linhcgcx',
		password: 'uSv992b_ZMcOziAeAHOAo0cGRyoLEnKP'
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};

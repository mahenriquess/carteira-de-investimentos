// Update with your config settings.

module.exports = {
	client: 'postgresql',
	connection: {
		host: 'ec2-174-129-27-158.compute-1.amazonaws.com',
		database: 'dfdc1je7rtmr09',
		user:     'etmgypuqyrzubk',
		password: '7237c3c25d3493e5f8849a0ce2136049ca36ff62494feb0ac66d9291debc2865',
		ssl: true
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};

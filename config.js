var config = {
	port: process.env.PORT || 3000,
	db: process.env.DATABASE || "mongodb://localhost/justjam_dev",
	test_port: 3001,
	test_db: "mongodb://localhost/justjam_test"
}
module.exports = config;

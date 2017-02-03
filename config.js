var config = {
	port: process.env.PORT || 3000,
	db: "mongodb://jammerz:MAkers321@ds135069.mlab.com:35069/justjam" || "mongodb://localhost/justjam_dev",
	test_port: 3001,
	test_db: "mongodb://localhost/justjam_test"
}
module.exports = config;

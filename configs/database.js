import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

const databaseConnection = (callback) => {
	db.connect((err) => {
		if (err) {
			console.error("Error connecting to MySQL:", err);
		} else {
			console.log("Connected to MySQL");
			callback();
		}
	});
};

export { db, databaseConnection };

import { db } from "../configs/database.js";

class User {
	addUser(email, password, type, active) {
		try {
			const result = db.query("CALL addUser(?, ?, ?)", [
				email,
				password,
				type,
				active,
			]);

			return result.insertId;
		} catch (err) {
			console.error(err);
		}
	}
}

export default new User();

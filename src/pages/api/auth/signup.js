import axios from "axios";

const authHandler = async (req, res) => {
	if (req.method !== "POST") {
		return;
	}

	const newUser = req.body;
	const { firstName, lastName, email, password } = newUser;
	if (
		!email ||
		email.trim() === "" ||
		!email.includes("@") ||
		!firstName ||
		firstName.trim() === "" ||
		!lastName ||
		lastName.trim() === "" ||
		!password ||
		password.trim() === "" ||
		password.length < 6
	) {
		res.status(422).json({ message: "Invalid input data" });
		return;
	}

	try {
		const { data } = await axios.post(
			"http://localhost:5000/api/users/signup",
			newUser
		);

		res.status(201).json({ newUser: data });
	} catch (err) {
		const { data, status } = err?.response;

		res.status(status).json({ message: data.message });
	}
};

export default authHandler;

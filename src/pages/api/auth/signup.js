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
		const response = await axios.post(
			process.env.NEXT_PUBLIC_BACK_END_URL + "/api/users/signup",
			newUser
		);

		res.status(201).json({ newUser: response.data });
	} catch (err) {
		console.log(err);
		const data = err?.response?.data;
		// const status = err?.response?.status;

		res.status(422).json({ message: data?.message });
	}
};

export default authHandler;

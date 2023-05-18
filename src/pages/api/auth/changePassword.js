import axios from "axios";
const updateHandler = async (req, res) => {
	if (req.method !== "PATCH") {
		return;
	}
	// console.log(req.body);
	const inputData = req.body;
	const { user_id, email, password, newPassword } = inputData.userInfo;
	// const {token} = inputData.token
	if (
		!user_id ||
		user_id.trim() === "" ||
		!email ||
		email.trim() === "" ||
		!email.includes("@") ||
		!password ||
		password.trim() === "" ||
		password.length < 6 ||
		!newPassword ||
		newPassword.trim() === "" ||
		newPassword.length < 6
	) {
		res.status(422).json({ message: "Invalid input data" });
		return;
	}

	try {
		const { data } = await axios.patch(
			"http://localhost:5000/api/users/update-password",
			inputData.userInfo,
			{
				headers: {
					Authorization: "Bearer " + inputData.token,
				},
			}
		);
		// console.log(data);
		res.status(201).json({ message: data.message });
	} catch (err) {
		// console.log("here");
		// console.log(err.response.data);
		res.status(403).json(err.response.data);
	}
};

export default updateHandler;

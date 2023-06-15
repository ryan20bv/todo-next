import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	session: {
		jwt: true,
	},
	providers: [
		CredentialsProvider({
			id: "username-login",
			name: "Login",
			async authorize(credentials) {
				const { email, password } = credentials;

				const res = await fetch(
					process.env.NEXT_PUBLIC_BACK_END_URL + "/api/users/login",
					{
						method: "POST",
						body: JSON.stringify({
							email,
							password,
						}),
						headers: { "Content-Type": "application/json" },
					}
				);
				let user = await res.json();
				// console.log("user", user);
				if (res.ok && user) {
					return {
						name: user,
					};
				}
				// Return null if user data could not be retrieved
				return null;

				// console.log(data.userData.fName);
			},
		}),
	],
	secret: process.env.NEXT_PUBLIC_SECRET,
};

export default NextAuth(authOptions);

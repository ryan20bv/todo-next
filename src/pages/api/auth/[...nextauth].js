import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	session: {
		jwt: false,
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				// console.log(credentials);
				const res = await fetch("http://localhost:5000/api/users/login", {
					method: "POST",
					body: JSON.stringify(credentials),
					headers: { "Content-Type": "application/json" },
				});
				let user = await res.json();
				// console.log(data);
				// console.log(data.userData.fName);

				if (res.ok && user) {
					return {
						name: user,
					};
					// return { user };
					// email: user.userData.email,
					// firstName: user.userData.fName,
					// lastName: user.userData.lName,
					// apiToken: user.token,
				}
				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
	secret: process.env.NEXT_PUBLIC_SECRET,

	// callbacks: {
	// 	async session({ session, token, user }) {
	// 		// Send properties to the client, like an access_token and user id from a provider.
	// 		// session.accessToken = token.accessToken;
	// 		// session.user.id = token.id;
	// 		console.log("session", session);
	// 		console.log("session user", user);
	// 		console.log("session token", token);
	// 		session.user.apiToken = token.accessToken;

	// 		return session;
	// 	},
	// },
};

export default NextAuth(authOptions);

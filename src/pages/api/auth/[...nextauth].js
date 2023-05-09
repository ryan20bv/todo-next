import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	// session: {
	// 	jwt: true,
	// },
	providers: [
		CredentialsProvider({
			async authorize(credentials, req) {
				console.log(credentials);
				const res = await fetch("http://localhost:5000/api/users/login", {
					method: "POST",
					body: JSON.stringify(credentials),
					headers: { "Content-Type": "application/json" },
				});
				const user = await res.json();
				console.log(user);
				console.log("here");
				// If no error and we have user data, return it
				if (res.ok && user) {
					return user;
				}
				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
};

export default NextAuth(authOptions);

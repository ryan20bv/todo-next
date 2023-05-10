import React, { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";

const Profile = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const checkForSession = async () => {
			const session = await getSession();

			if (!session) {
				window.location.href = "/";
			} else {
				setIsLoading(false);
			}
		};
		checkForSession();
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return <div>Profile </div>;
};

export default Profile;

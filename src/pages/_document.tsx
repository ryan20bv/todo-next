import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang='en'>
			<Head />
			<body>
				<div id='overlays' />
				<Main />
				<div id='notificationPortal' />
				<NextScript />
			</body>
		</Html>
	);
}

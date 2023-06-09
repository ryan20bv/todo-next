import { Session } from "next-auth";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { Provider as ReduxProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";

import { indexStore, persistor } from "@/reduxToolkit/indexStore/indexStore";
import { PersistGate } from "redux-persist/integration/react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({
	Component,
	pageProps,
}: AppProps<{
	session: Session;
}>) {
	return (
		<SessionProvider session={pageProps.session}>
			<ReduxProvider store={indexStore}>
				<PersistGate
					loading={null}
					persistor={persistor}
				>
					<Layout>
						<Head>
							<title>TODO NEXT</title>
							<meta
								name='viewport'
								content='width=device-width, initial-scale=1.0'
							/>
							<meta
								http-equiv='Content-Type'
								content='text/html;charset=UTF-8'
							/>
							<meta
								name='description'
								content='Todo app with crud using nextJS FrontEnd and node js express backend'
							/>
						</Head>

						<Component {...pageProps} />
					</Layout>
				</PersistGate>
			</ReduxProvider>
		</SessionProvider>
	);
}

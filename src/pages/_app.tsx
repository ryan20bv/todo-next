import { Fragment } from "react";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import { Provider as ReduxProvider } from "react-redux";
import AuthenticationProvider from "../loginContext/authentication-provider";
import indexStore from "@/reduxToolkit/indexStore/indexStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthenticationProvider>
			<ReduxProvider store={indexStore}>
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
			</ReduxProvider>
		</AuthenticationProvider>
	);
}

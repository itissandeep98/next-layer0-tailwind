import LayoutWrapper from "../layouts/LayoutWrapper";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<LayoutWrapper {...pageProps}>
			<Component {...pageProps} />
		</LayoutWrapper>
	);
}

export default MyApp;

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import WalletState from 'context/wallet/WalletState';


function MyApp({ Component, pageProps }: AppProps) {
  return (
		<WalletState>
			<Component {...pageProps} />
		</WalletState>
	);
}

export default MyApp

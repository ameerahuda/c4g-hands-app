import '@/styles/globals.css'
import Head from 'next/head'
import NavBar from '@/components/NavBar'
import Provider, { useStateContext } from '@/context/context'

export default function App({ Component, pageProps }) {
	return (
		<Provider>
			<Head>
				<title>HandS</title>
				<meta name="description" content="HandS Dashboard" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600&display=swap" rel="stylesheet" />
			</Head>
			<NavBar />
			<Component {...pageProps} />
		</Provider>
	)
}

import { ThemeContextProvider } from './context/ThemeContext';
import Home from './pages/Home';

export default function App() {
	return (
		<ThemeContextProvider>
			<Home />
		</ThemeContextProvider>
	);
}
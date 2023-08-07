import React, { createContext, useState } from 'react';
import { useColorScheme } from 'react-native';

export type Theme = {
	name: string,

	primary: string,
	secondary: string,
	text: {
		primary: string,
	},
	background: {
		primary: string,
		secondary: string,
	},
	disabled: {
		primary: string,
		secondary: string,
		tertiary: string,
	}

	// TODO: Add font files and uncomment this
	/* fonts: {
		primary:string,
		secondary: string,
		tertiary: string 
	} */
};

type ThemeContextData = {
	theme: Theme,
	toggleTheme: () => void,
	changeTheme: (theme: Theme) => void,
};

export const dark = {
	name: 'dark',

	primary: '#6303C3',
	secondary: '#AD00FF',
	text: {
		primary: '#FFFFFF',
	},
	background: {
		primary: '#020304',
		secondary: '#0D0D0E',
	},
	disabled: {
		primary: '#000000',
		secondary: '#232323',
		tertiary: '#808080',
	}

	// TODO: Add font files and uncomment this
	/* fonts: {
		primary: 'Poppins',
		secondary: 'Varela Round',
		tertiary: 'Inter' 
	} */
};

export const light = {
	name: 'light',

	primary: '#6303C3',
	secondary: '#AD00FF',
	text: {
		primary: '#000000',
	},
	background: {
		primary: '#ffffff',
		secondary: '#E1D5EF',
	},
	disabled: {
		primary: '#323232',
		secondary: '#232323',
		tertiary: '#808080',
	}
};

export const ThemeContext = createContext<ThemeContextData>({
	theme: light,
	toggleTheme: () => { },
	changeTheme: () => { },
});

export function ThemeContextProvider({ children }: React.PropsWithChildren) {
	const scheme = useColorScheme() ?? 'light';
	const [theme, setTheme] = useState(scheme === 'light' ? light : dark);

	function toggleTheme() {
		if (theme.name == 'dark') {
			setTheme(light);
		} else if (theme.name == 'light') {
			setTheme(dark);
		}
	}

	function changeTheme(theme: Theme) {
		setTheme(theme);
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, changeTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

import { useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName, useColorScheme } from 'react-native';
import { dark, light, ThemeContext } from '../context/ThemeContext';

export default function useTheme() {
	const context = useContext(ThemeContext);
	const { changeTheme } = context;

	useEffect(() => {
		const subscription = Appearance.addChangeListener((preferences: Appearance.AppearancePreferences) => {
			const { colorScheme } = preferences;
			if (colorScheme === 'dark') {
				changeTheme(dark);
			} else {
				changeTheme(light);
			}
		});

		return () => subscription?.remove()
	}, [changeTheme]);

	return context;
}
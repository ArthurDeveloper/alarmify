import { StyleSheet } from 'react-native';
import { Theme } from '../context/ThemeContext';
import useTheme from './useTheme';

export default function useThemedStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
	cb: (theme: Theme) => T | StyleSheet.NamedStyles<T>
) {
	const { theme } = useTheme();

	return cb(theme);
}
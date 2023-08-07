import { View, Pressable, StyleSheet, Text } from 'react-native';
import { Theme } from '../context/ThemeContext';
import useThemedStyles from '../hooks/useThemedStyles';

export default function AddAlarmButton(): JSX.Element {
	const styles = useThemedStyles(themedStyles);

	return (
		<View style={styles.buttonContainer}>
			<Pressable style={styles.button}>
				<Text style={styles.buttonText}>+</Text>
			</Pressable>
		</View>
	);
}

const themedStyles = (theme: Theme) => StyleSheet.create({
	buttonContainer: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	button: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 65,
		height: 65,
		backgroundColor: theme.primary,
		marginRight: 11,
		marginBottom: 22,
		borderRadius: 100,
	},
	buttonText: {
		fontSize: 48,
		lineHeight: 56,
		// TODO: Add Inter font
		fontFamily: 'sans-serif',
		color: '#ffffff',
	}
});
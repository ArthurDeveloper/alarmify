import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '../context/ThemeContext';
import useThemedStyles from '../hooks/useThemedStyles';
import { ToggleSwitch } from './ToggleSwitch';

type Props = {
	name: string,
	time: string,
	type: 'Single-use' | 'Daily',
	enabled: boolean
}

export default function AlarmCard({ name, time, /* TODO: Put it in UI later */ type, enabled: propEnabled }: Props): JSX.Element {
	const styles = useThemedStyles(themedStyles);

	const [enabled, setEnabled] = useState(propEnabled);

	function toggleSwitch() {
		setEnabled(!enabled);
	}

	return (
		<View style={styles.alarmContainer}>
			<View style={enabled ? styles.alarm : { ...styles.alarm, ...styles.alarmDisabled }}>
				<View style={styles.alarmInfoContainer}>
					<Text style={enabled ? styles.alarmName : { ...styles.alarmName, ...styles.disabledText }}>
						{name}
					</Text>
					<Text style={enabled ? styles.alarmTime : { ...styles.alarmTime, ...styles.disabledText }}>
						{time}
					</Text>
				</View>

				<View style={styles.switchContainer}>
					<ToggleSwitch enabled={enabled} toggle={toggleSwitch} />
				</View>
			</View>
		</View >
	);
}

const themedStyles = (theme: Theme) => StyleSheet.create({
	alarmContainer: {
		width: '100%',
		paddingHorizontal: 11,
		marginTop: 20,
	},
	alarm: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: theme.background.secondary,
		borderRadius: 11,
		paddingTop: 16,
		paddingBottom: 9,
		paddingLeft: 18,
		paddingRight: 16,
	},
	alarmDisabled: {
		backgroundColor: theme.name === 'light' ? '#575757' : theme.background.secondary,
	},
	alarmInfoContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	alarmName: {
		// TODO: Download Varela Round font and put it here
		color: theme.primary,
		marginLeft: 4,
		fontSize: 12,
	},
	alarmTime: {
		marginTop: 3,
		fontSize: 48,
		color: theme.text.primary,
	},
	switchContainer: {
		alignSelf: 'center',
		marginLeft: 'auto',
	},
	disabledText: {
		color: theme.disabled.secondary,
	},
});
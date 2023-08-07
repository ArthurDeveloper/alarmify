import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View
} from 'react-native';
import AddAlarmButton from '../components/AddAlarmButton';
import AlarmCard from '../components/AlarmCard';
import { Theme, ThemeContextProvider } from '../context/ThemeContext';
import useAllAlarms from '../hooks/useAllAlarms';
import useThemedStyles from '../hooks/useThemedStyles';

export default function App(): JSX.Element {
	const styles = useThemedStyles(themedStyles);

	const alarms = useAllAlarms();

	return (
		<SafeAreaView>
			<ScrollView style={styles.background}>
				<Text style={styles.heading}>Coming up next</Text>

				<Text style={styles.heading}>Others</Text>

				<Text style={styles.subheading}>Daily</Text>
				<View style={styles.alarms}>
					{alarms.filter((alarm) => alarm.type === 'Daily').map((alarm, index) => (
						<AlarmCard
							key={index}
							name={alarm.name}
							time={alarm.time}
							type={alarm.type}
							enabled={alarm.enabled}
						/>
					))}
				</View>

				<Text style={styles.subheading}>Single-use</Text>
				<View style={styles.alarms}>
					{alarms.filter((alarm) => alarm.type === 'Single-use').map((alarm, index) => (
						<AlarmCard
							key={index}
							name={alarm.name}
							time={alarm.time}
							type={alarm.type}
							enabled={alarm.enabled}
						/>
					))}
				</View>
			</ScrollView>

			<AddAlarmButton />
		</SafeAreaView>
	)
}

const themedStyles = (theme: Theme) => StyleSheet.create({
	background: {
		backgroundColor: theme.background.primary,
		height: '100%',
	},
	heading: {
		textAlign: 'center',
		color: '#AD00FF',
		fontSize: 48,
		marginTop: 20,
		fontFamily: 'Poppins',
	},
	subheading: {
		marginTop: 10,
		marginLeft: 21,
		color: theme.secondary,
	},
	alarms: {
		marginTop: 20,
		marginBottom: 43
	}
});

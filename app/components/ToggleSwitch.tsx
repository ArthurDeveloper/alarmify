import { useEffect, useRef, useState } from "react";
import { Animated, Easing, LayoutRectangle, Pressable, StyleSheet, View } from "react-native";
import { Theme } from '../context/ThemeContext';
import useThemedStyles from '../hooks/useThemedStyles';

type Props = {
	enabled: boolean,
	toggle: () => void,
};

export function ToggleSwitch({ enabled, toggle }: Props): JSX.Element {
	const styles = useThemedStyles(themedStyles);

	const [backgroundLayout, setBackgroundLayout] = useState<LayoutRectangle>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});

	const [switchLayout, setSwitchLayout] = useState<LayoutRectangle>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});

	const disableAnimation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const duration = 300;
		const easing = Easing.bezier(.4, 1.57, .99, 1.03);

		if (enabled) {
			Animated.timing(disableAnimation, {
				toValue: 1,
				duration,
				easing,
				useNativeDriver: false,
			}).start();
		} else {
			Animated.timing(disableAnimation, {
				toValue: 0,
				duration,
				easing,
				useNativeDriver: false,
			}).start();
		}
	}, [enabled]);

	return (
		<Pressable
			onPress={toggle}
			onLayout={event => setBackgroundLayout(event.nativeEvent.layout)}
			style={enabled ? styles.background : { ...styles.background, ...styles.backgroundDisabled }}
		>
			<Animated.View
				onLayout={event => setSwitchLayout(event.nativeEvent.layout)}
				style={{
					...(enabled ? styles.switch : { ...styles.switch, ...styles.switchDisabled }),
					transform: [
						{
							translateX: disableAnimation.interpolate({
								inputRange: [0, 1],
								outputRange: [0, backgroundLayout.width - switchLayout.width],
								extrapolate: 'extend',
							}),
						}
					]
				}}
			/>
		</Pressable>
	);
}

const themedStyles = (theme: Theme) => StyleSheet.create({
	background: {
		position: 'relative',
		backgroundColor: theme.primary,
		width: 76,
		height: 38,
		borderRadius: 100,
	},
	backgroundDisabled: {
		backgroundColor: theme.disabled.secondary,
	},
	switch: {
		position: 'absolute',
		backgroundColor: '#ffffff',
		width: 38,
		height: '100%',
		borderRadius: 100,
	},
	switchDisabled: {
		backgroundColor: theme.disabled.tertiary,
		alignSelf: 'flex-start'
	},
});
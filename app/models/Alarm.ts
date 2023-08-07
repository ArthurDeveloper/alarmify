type Alarm = {
	name: string,
	time: string,
	enabled: boolean,
	type: 'Single-use' | 'Daily',
}

export default Alarm;
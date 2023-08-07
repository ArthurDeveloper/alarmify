import { useEffect, useState } from 'react';
import Alarm from '../models/Alarm';
import useDatabase from './useDatabase';

export default function useAllAlarms() {
	const [fetchedAlarms, setFetchedAlarms] = useState<Alarm[]>([]);
	const connection = useDatabase();

	useEffect(() => {
		if (connection) {
			connection.executeSql(`SELECT * FROM alarms`).then((results) => {
				for (const result of results) {
					setFetchedAlarms(result.rows.raw());
				}
			}).catch((error) => {
				setFetchedAlarms([]);
				throw new Error('Couldn\'t retrieve alarms');
			});
		}
	}, [connection]);

	return fetchedAlarms;
}
import { useEffect, useRef, useState } from 'react';
import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

async function getDatabaseConnection() {
	try {
		const connection = await openDatabase({ name: 'alarmify.db', location: 'default' });
		return connection;
	} catch (error) {
		throw new Error('Couldn\'t open connection');
	}
}

async function setup(db: SQLiteDatabase) {
	const query = `CREATE TABLE IF NOT EXISTS alarms(
		id INTEGER PRIMARY KEY,
		name TEXT NOT NULL,
		time TEXT NOT NULL,
		enabled INTEGER NOT NULL DEFAULT 1 CHECK (enabled IN (0, 1)),
		type TEXT NOT NULL CHECK (type IN ('Single-use', 'Daily'))
	);`;

	await db.executeSql(query);
}

export default function useDatabase() {
	const hasBeenSetup = useRef(false);
	const [connection, setConnection] = useState<SQLiteDatabase>();

	useEffect(() => {
		(async () => {
			setConnection(await getDatabaseConnection());
		})();
	}, []);

	useEffect(() => {
		if (connection && !hasBeenSetup.current) {
			setup(connection);
			hasBeenSetup.current = true;
		}
	}, [connection]);

	return connection;
}

export async function fetchMatchInfo(
	eventCode: string,
	matchNumber: number,
	position: string,
) {
	const response = await fetch(
		`https://www.thebluealliance.com/api/v3/match/${eventCode}_qm${matchNumber}`,
		{
			headers: {
				"X-TBA-Auth-Key": import.meta.env.VITE_TBA_API_KEY,
			},
		},
	);

	if (!response.ok) {
		throw new Error(`TBA request failed with status ${response.status}`);
	}

	const match = await response.json();
	const alliance = position.toLowerCase().startsWith("r") ? "red" : "blue";
	const positionIndex = Number(position.slice(1)) - 1;

	return [
		match.alliances[alliance].team_keys[positionIndex] ?? null,
		match.predicted_time,
	];
}

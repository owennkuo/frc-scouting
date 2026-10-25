const API_KEY =
	"";
const controller = new AbortController();

export async function fetchMatchInfo(
	eventCode: string,
	matchNumber: number,
	position: string,
) {
	try {
		const response = await fetch(
			`https://thebluealliance.com/api/v3/match/${eventCode}_qm${matchNumber}`,
		);
		const match = await response.json();
		const alliance = position.startsWith("R") ? "red" : "blue";
		return match["alliances"][alliance]["team_keys"][position.charAt(1)];
	} catch {
		return null;
	}
}

const API_KEY =
	"1pASptoMl6xXHptBnpRfEG3KFU6ghqdU9pzDNs3WWaD9hXsL6LDW22imF99SZlFA";
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

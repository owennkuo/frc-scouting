import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting")({component: ScoutingForm})

export function ScoutingForm() {
    return(
    <div className="p-8">
        <h1></h1>
    </div>
    )
}
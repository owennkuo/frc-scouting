import { createFileRoute } from "@tanstack/react-router";
import { ScoutingForm } from "../features/ScoutingForm";

export const Route = createFileRoute("/scouting")({component: ScoutingPage})

export function ScoutingPage() {
    return(
    <div className="p-8">
        <ScoutingForm />
    </div>
    )
}
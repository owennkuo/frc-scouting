import { Minus, Plus } from "lucide-react";
import * as React from "react";
import { QRCode } from "react-qr-code";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Separator } from "#/components/ui/separator";
import { Textarea } from "#/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckboxList } from "./ScoutingComponents";
import * as scoutingValues from "./ScoutingValues";

export function ScoutingForm() {
	const [activeTab, setActiveTab] = React.useState("pre");
	const [autoFuel, setAutoFuel] = React.useState<number>(0);
	const [autoLocation, setAutoLocation] = React.useState<string[]>([]);
	const [teleopFuel, setTeleopFuel] = React.useState<number>(0);
	const [selectedClimbValue, setClimbValue] = React.useState<string[]>([]);

	const [nameValue, setNameValue] = React.useState("");
	const [eventValue, setEventValue] = React.useState("");
	const [matchValue, setMatchValue] = React.useState("");
	const [positionValue, setPositionValue] = React.useState("");

	const [commentValue, setCommentValue] = React.useState("");
	const [selectedPlayStyle, setPlayStyle] = React.useState<string[]>([]);
	const [selectedCross, setCross] = React.useState<string[]>([]);
	const [shooterRating, setShooterRating] = React.useState("");
	const [defenseRating, setDefenseRating] = React.useState("");
	const isPreMatchComplete =
		nameValue.trim() !== "" &&
		eventValue !== "" &&
		positionValue !== "" &&
		matchValue !== "";

	React.useEffect(() => {
		document.title = "5507 Scouting";
	}, []);

	return (
		<div className="flex max-w-sm flex-col gap-4 text-sm">
			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList className="w-full justify-center">
					<TabsTrigger value="pre">Pre-Match</TabsTrigger>
					<TabsTrigger value="auto" disabled={!isPreMatchComplete}>
						Auto
					</TabsTrigger>
					<TabsTrigger value="tele" disabled={!isPreMatchComplete}>
						Teleop
					</TabsTrigger>
					<TabsTrigger value="post" disabled={!isPreMatchComplete}>
						Post-Match
					</TabsTrigger>
				</TabsList>
				<TabsContent value="pre" keepMounted>
					{PreMatchCard()}
				</TabsContent>
				<TabsContent value="auto" keepMounted>
					{AutoCard()}
				</TabsContent>
				<TabsContent value="tele" keepMounted>
					{TeleopCard()}
				</TabsContent>
				<TabsContent value="post" keepMounted>
					{PostMatchCard()}
				</TabsContent>
			</Tabs>
			<div className={activeTab === "pre" ? "hidden" : undefined}>
				{GeneralCard()}
			</div>
		</div>
	);

	function AutoCard() {
		const min = 0;
		const max = 100;

		const handleIncrement = () => {
			setAutoFuel((prev) => Math.min(prev + 5, max));
		};
		const handleDecrement = () => {
			setAutoFuel((prev) => Math.max(prev - 5, min));
		};
		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = parseInt(e.target.value, 10);
			if (!Number.isNaN(newValue)) {
				setAutoFuel(Math.min(Math.max(newValue, min), max));
			} else if (e.target.value === "") {
				setAutoFuel(0);
			}
		};

		return (
			<Card className="">
				<CardContent>
					<div className="flex max-w-sm flex-col gap-2 text-sm">
						<p>Auto Fuel</p>
						<div>
							<Input
								className="w-1/2"
								type="numeric"
								pattern="[0-9]*"
								value={autoFuel}
								onChange={handleInputChange}
							/>
							<Button size="icon" onClick={handleDecrement}>
								<Minus className="h-4 w-4" />
							</Button>
							<Button size="icon" onClick={handleIncrement}>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
						<Separator />
						<p>Auto Locations</p>
						<div className="flex max-w-sm flex-col gap-1">
							<CheckboxList
								items={scoutingValues.autoLocations}
								selected={autoLocation}
								onChange={(id, checked) => {
									setAutoLocation((previous) =>
										checked
											? [...previous, id]
											: previous.filter((item) => item !== id),
									);
								}}
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	function TeleopCard() {
		const min = 0;
		const max = 500;

		const handleIncrement = () => {
			setTeleopFuel((prev) => Math.min(prev + 5, max));
		};
		const handleDecrement = () => {
			setTeleopFuel((prev) => Math.max(prev - 5, min));
		};
		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = parseInt(e.target.value, 10);
			if (!Number.isNaN(newValue)) {
				setTeleopFuel(Math.min(Math.max(newValue, min), max));
			} else if (e.target.value === "") {
				setTeleopFuel(0);
			}
		};

		return (
			<Card>
				<CardContent>
					<div className="flex max-w-sm flex-col gap-2 text-sm">
						<p>Teleop Fuel</p>
						<div>
							<Input
								className="w-1/2"
								type="numeric"
								pattern="[0-9]*"
								value={teleopFuel}
								onChange={handleInputChange}
							/>
							<Button size="icon" onClick={handleDecrement}>
								<Minus className="h-4 w-4" />
							</Button>
							<Button size="icon" onClick={handleIncrement}>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
						<Separator />
						<p>Climb</p>
						<div className="flex max-w-sm flex-col gap-1">
							<CheckboxList
								items={scoutingValues.climbValues}
								selected={selectedClimbValue}
								onChange={(id, checked) => {
									setClimbValue((previous) =>
										checked
											? [...previous, id]
											: previous.filter((item) => item !== id),
									);
								}}
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	function PreMatchCard() {
		return (
			<Card>
				<CardContent>
					<div className="flex max-w-sm flex-col gap-2 text-sm">
						<Field>
							<FieldLabel htmlFor="name-input">Scouter Initials</FieldLabel>
							<Input
								id="name-input"
								placeholder="Enter your initials"
								value={nameValue}
								onChange={(event) => {
									setNameValue(event.target.value);
								}}
							/>
						</Field>
						<Label htmlFor="event-select">Event</Label>
						<Select
							items={scoutingValues.events}
							value={eventValue}
							onValueChange={(value) => setEventValue(value ?? "")}
						>
							<SelectTrigger className="w-full" id="event-select">
								<SelectValue placeholder="Select an Event" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{scoutingValues.events.map((item) => (
										<SelectItem key={item.value} value={item.value}>
											{item.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
						<Field>
							<FieldLabel htmlFor="match-input">Match Number</FieldLabel>
							<Input
								id="match-input"
								type="numeric"
								pattern="[0-9]*"
								placeholder=""
								value={matchValue}
								onChange={(event) => setMatchValue(event.target.value)}
							/>
						</Field>
						<Label htmlFor="position-select">Robot Position</Label>
						<Select
							items={scoutingValues.positions}
							value={positionValue}
							onValueChange={(value) => setPositionValue(value ?? "")}
						>
							<SelectTrigger className="w-full" id="position-select">
								<SelectValue placeholder="Select a Position" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{scoutingValues.positions.map((item) => (
										<SelectItem key={item.value} value={item.value}>
											{item.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
				<CardFooter>
					<Button
						disabled={!isPreMatchComplete}
						className="w-full"
						onClick={() => setActiveTab("auto")}
					>
						Continue
					</Button>
				</CardFooter>
			</Card>
		);
	}
	function PostMatchCard() {
		return (
			<Card>
				<CardContent>
					<div className="flex max-w-sm flex-col gap-4 text-sm">
						<Label htmlFor="shooter-radio">Shooter Accuracy</Label>
						<div
							className="flex max-w-sm flex-col gap-0 text-sm"
							id="shooter-radio"
						>
							<RadioGroup
								value={shooterRating}
								onValueChange={setShooterRating}
							>
								{scoutingValues.accuracies.map((item) => (
									<div key={item.id} className="flex items-center space-x-3">
										<RadioGroupItem value={item.label} id={item.id} />
										<label htmlFor={item.id}>{item.label}</label>
									</div>
								))}
							</RadioGroup>
						</div>
						<Label htmlFor="defense-radio">Defense</Label>
						<div
							className="flex max-w-sm flex-col gap-0 text-sm"
							id="defense-radio"
						>
							<RadioGroup
								value={defenseRating}
								onValueChange={setDefenseRating}
							>
								{scoutingValues.defense.map((item) => (
									<div key={item.id} className="flex items-center space-x-3">
										<RadioGroupItem value={item.label} id={item.id} />
										<label htmlFor={item.id}>{item.label}</label>
									</div>
								))}
							</RadioGroup>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}
	function GeneralCard() {
		return (
			<Card>
				<CardContent>
					<div className="flex max-w-sm flex-col gap-4 text-sm">
						<Label htmlFor="playstyle-checkboxes">Playstyle</Label>
						<div
							className="flex max-w-sm flex-col gap-1"
							id="playstyle-checkboxes"
						>
							<CheckboxList
								items={scoutingValues.playStyles}
								selected={selectedPlayStyle}
								onChange={(id, checked) => {
									setPlayStyle((previous) =>
										checked
											? [...previous, id]
											: previous.filter((item) => item !== id),
									);
								}}
							/>
						</div>
						<Label htmlFor="cross-checkboxes">Crosses With</Label>
						<div className="flex max-w-sm flex-col gap-1" id="cross-checkboxes">
							<CheckboxList
								items={scoutingValues.crossTypes}
								selected={selectedCross}
								onChange={(id, checked) => {
									setCross((previous) =>
										checked
											? [...previous, id]
											: previous.filter((item) => item !== id),
									);
								}}
							/>
						</div>
						<p>Comments</p>
						<Textarea
							placeholder="Enter any additional comments here..."
							value={commentValue}
							onChange={(e) => setCommentValue(e.target.value ?? "")}
						/>
					</div>
				</CardContent>
				<CardFooter>
					<div className="w-full">
						<div className={activeTab === "post" ? "hidden" : undefined}>
							<Button
								className="w-full"
								onClick={() =>
									setActiveTab(activeTab === "auto" ? "tele" : "post")
								}
							>
								Continue
							</Button>
						</div>
						<div className={activeTab === "post" ? undefined : "hidden"}>
							<QRDialog />
						</div>
					</div>
				</CardFooter>
			</Card>
		);
	}

	function QRDialog() {
		return (
			<Dialog>
				<form>
					<DialogTrigger
						render={<Button className={"w-full"}>Submit Form</Button>}
					/>
					<DialogContent className="sm:max-w-sm">
						<DialogHeader>
							<DialogTitle>
								Match {matchValue} -{" "}
								{
									scoutingValues.positions.find(
										(position) => position.value === positionValue,
									)?.label
								}
							</DialogTitle>
							<DialogDescription>
								Once you get the QR Code scanned, press Close.
							</DialogDescription>
						</DialogHeader>
						<div className="flex flex-col items-center justify-center text-center">
							<QRCode value={generateFormData()} />
						</div>
						<DialogFooter>
							<DialogClose render={<Button variant="outline">Cancel</Button>} />
							<Button type="submit" onClick={clearFormData}>
								Save + Close
							</Button>
						</DialogFooter>
					</DialogContent>
				</form>
			</Dialog>
		);
	}
	function generateFormData() {
		//turn all the state values into a JSON string
		return JSON.stringify([
			[nameValue.trim().toUpperCase(), eventValue, matchValue, positionValue],
			[autoFuel, autoLocation],
			[teleopFuel, selectedClimbValue],
			[selectedCross, selectedPlayStyle, commentValue.trim()],
			[shooterRating, defenseRating],
		]);
	}
	function clearFormData() {
		//reset values for new match
		setAutoFuel(0);
		setTeleopFuel(0);
		setAutoLocation([]);
		setClimbValue([]);
		setPlayStyle([]);
		setCross([]);
		setCommentValue("");
		setShooterRating("");
		setDefenseRating("");

		//increment match and switch back to the first tab
		setMatchValue((currentMatch) => String(Number(currentMatch) + 1));
		setActiveTab("pre");
	}
}

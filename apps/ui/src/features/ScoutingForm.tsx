import { Minus, Plus } from "lucide-react";
import * as React from "react";
import { QRCode } from "react-qr-code";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Separator } from "#/components/ui/separator";
import { Textarea } from "#/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import * as scoutingValues from "./ScoutingValues";

const events = [
	{ value: "2026casnf", label: "2026 San Francisco" },
	{ value: "2026cacac", label: "2026 Contra Costa" },
	{ value: "2026cancmp", label: "2026 NorCal DCMP" },
	{ value: "2026sunshow", label: "2026 Sunset Showdown" },
];

export function ScoutingForm() {
	const [activeTab, setActiveTab] = React.useState("pre");
	const [autoFuel, autoFuelValue] = React.useState<number>(0);
	const [autoLocation, setAutoLocation] = React.useState<string[]>([]);
	const [teleopFuel, teleopFuelValue] = React.useState<number>(0);
	const [selectedClimbValue, setClimbValue] = React.useState<string[]>([]);

	const [nameValue, setNameValue] = React.useState("");
	const [eventValue, setEventValue] = React.useState("");
	const [matchValue, setMatchValue] = React.useState<number>(0);
	const [positionValue, setPositionValue] = React.useState("");

  const [commentValue, setCommentValue] = React.useState("");
	const [selectedPlayStyle, setPlayStyle] = React.useState<string[]>([]);
	const [shooterRating, setShooterRating] = React.useState("");
	const [defenseRating, setDefenseRating] = React.useState("");

	return (
		<div className="flex max-w-sm flex-col gap-4 text-sm">
			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="w-full max-w-sm"
			>
				<TabsList>
					<TabsTrigger value="pre">Pre-Match</TabsTrigger>
					<TabsTrigger value="auto">Auto</TabsTrigger>
					<TabsTrigger value="tele">Teleop</TabsTrigger>
					<TabsTrigger value="post">Post-Match</TabsTrigger>
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
			autoFuelValue((prev) => Math.min(prev + 5, max));
		};
		const handleDecrement = () => {
			autoFuelValue((prev) => Math.max(prev - 5, min));
		};
		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = parseInt(e.target.value, 10);
			if (!isNaN(newValue)) {
				autoFuelValue(Math.min(Math.max(newValue, min), max));
			} else if (e.target.value === "") {
				autoFuelValue(0);
			}
		};
		const handleChecklistChange = (id: string, checked: boolean) => {
			setAutoLocation((prev) =>
				checked ? [...prev, id] : prev.filter((item) => item !== id),
			);
		};

		return (
			<Card className="">
				<CardContent>
					<div className="flex max-w-sm flex-col gap-2 text-sm">
						<p>Auto Fuel</p>
						<div>
							<Input
								className="w-1/2"
								type="number"
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
							{scoutingValues.autoLocations.map((item) => (
								<div key={item.id} className="flex items-center space-x-3">
									<Checkbox
										id={item.id}
										checked={autoLocation.includes(item.id)}
										onCheckedChange={(checked) =>
											handleChecklistChange(item.id, !!checked)
										}
									/>
									<label htmlFor={item.id}> {item.label} </label>
								</div>
							))}
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
			teleopFuelValue((prev) => Math.min(prev + 5, max));
		};
		const handleDecrement = () => {
			teleopFuelValue((prev) => Math.max(prev - 5, min));
		};
		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = parseInt(e.target.value, 10);
			if (!isNaN(newValue)) {
				teleopFuelValue(Math.min(Math.max(newValue, min), max));
			} else if (e.target.value === "") {
				teleopFuelValue(0);
			}
		};
		const handleChecklistChange = (id: string, checked: boolean) => {
			setClimbValue((prev) =>
				checked ? [...prev, id] : prev.filter((item) => item !== id),
			);
		};

		return (
			<Card>
				<CardContent>
					<div className="flex max-w-sm flex-col gap-2 text-sm">
						<p>Teleop Fuel</p>
						<div>
							<Input
								className="w-1/2"
								type="number"
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
							{scoutingValues.climbValues.map((item) => (
								<div key={item.id} className="flex items-center space-x-3">
									<Checkbox
										id={item.id}
										checked={selectedClimbValue.includes(item.id)}
										onCheckedChange={(checked) =>
											handleChecklistChange(item.id, !!checked)
										}
									/>
									<label htmlFor={item.id}> {item.label} </label>
								</div>
							))}
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
							<FieldLabel htmlFor="name-input">Scouter Name</FieldLabel>
							<Input
								id="name-input"
								value={nameValue}
								onChange={(event) => {
									setNameValue(event.target.value);
								}}
							/>
						</Field>
						<Label htmlFor="event-select">Event</Label>
						<Select
							items={events}
							value={eventValue}
							onValueChange={(value) => setEventValue(value ?? "")}
						>
							<SelectTrigger className="w-full" id="event-select">
								<SelectValue placeholder="Select an Event" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{events.map((item) => (
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
								placeholder=""
								value={matchValue}
								onChange={(event) => setMatchValue(Number(event.target.value))}
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
					<Button className="w-full" onClick={() => setActiveTab("auto")}>
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
		const handleChecklistChange = (id: string, checked: boolean) => {
			setPlayStyle((prev) =>
				checked ? [...prev, id] : prev.filter((item) => item !== id),
			);
		};
		return (
			<Card>
				<CardContent>
					<div className="flex max-w-sm flex-col gap-4 text-sm">
						<Label htmlFor="playstyle-checkboxes">Playstyle</Label>
						<div
							className="flex max-w-sm flex-col gap-1"
							id="playstyle-checkboxes"
						>
							{scoutingValues.playStyles.map((item) => (
								<div key={item.id} className="flex items-center space-x-3">
									<Checkbox
										id={item.id}
										checked={selectedPlayStyle.includes(item.id)}
										onCheckedChange={(checked) =>
											handleChecklistChange(item.id, !!checked)
										}
									/>
									<label htmlFor={item.id}> {item.label} </label>
								</div>
							))}
						</div>
						<Label htmlFor="cross-checkboxes">Crosses With</Label>
						<div className="flex max-w-sm flex-col gap-1" id="cross-checkboxes">
							<div className="flex items-center space-x-3">
								<Checkbox id="check-bump" />
								<label htmlFor="check-bump">Bump</label>
							</div>
							<div className="flex items-center space-x-3">
								<Checkbox id="check-trench" />
								<label htmlFor="check-trench">Trench</label>
							</div>
						</div>
						<p>Comments</p>
						<Textarea placeholder="Enter any additional comments here..." value={commentValue} onChange={(e) => setCommentValue(e.target.value ?? "")}/>
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
				</CardContent>
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
							<QRCode value={formData()} />
						</div>
						<DialogFooter>
							<DialogClose render={<Button variant="outline">Cancel</Button>} />
							<Button type="submit">Save + Close</Button>
						</DialogFooter>
					</DialogContent>
				</form>
			</Dialog>
		);
	}
	function formData() {
		return JSON.stringify([
			[nameValue, eventValue, matchValue, positionValue],
			[autoFuel, autoLocation],
			[teleopFuel, selectedClimbValue],
      [selectedPlayStyle, commentValue],
      [shooterRating, defenseRating]
		]);
	}
}

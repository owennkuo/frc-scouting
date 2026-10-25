import { Minus, Plus } from "lucide-react";
import * as React from "react";
import { QRCode } from "react-qr-code";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Separator } from "#/components/ui/separator";
import { Textarea } from "#/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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

const events = [
	{ value: "2026casnf", label: "2026 San Francisco" },
	{ value: "2026cacac", label: "2026 Contra Costa" },
	{ value: "2026cancmp", label: "2026 NorCal DCMP" },
	{ value: "2026sunshow", label: "2026 Sunset Showdown" },
];

type MainTab = "pre" | "auto" | "tele" | "post";

export function ScoutingForm() {
	const [activeTab, setActiveTab] = React.useState<MainTab>("auto");
	function setTab(targetTab: MainTab) {
		setActiveTab(targetTab);
	}

	return (
		<div className="flex max-w-sm flex-col gap-4 text-sm">
			<Tabs
				value={activeTab}
				onValueChange={setTab}
				className="w-full max-w-sm"
			>
				<TabsList>
					<TabsTrigger value="pre">Pre-Match</TabsTrigger>
					<TabsTrigger value="auto">Auto</TabsTrigger>
					<TabsTrigger value="tele">Teleop</TabsTrigger>
					<TabsTrigger value="post">Post-Match</TabsTrigger>
				</TabsList>
				<TabsContent value="pre" keepMounted>
					<PreMatchCard onTabChange={setTab} />
				</TabsContent>
				<TabsContent value="auto" keepMounted>
					<AutoCard />
				</TabsContent>
				<TabsContent value="tele" keepMounted>
					<TeleopCard />
				</TabsContent>
				<TabsContent value="post" keepMounted>
					<PostMatchCard />
				</TabsContent>
			</Tabs>
			<div className={activeTab === "pre" ? "hidden" : undefined}>
				<GeneralCard />
				<QRDialog />
			</div>
		</div>
	);
}

function AutoCard() {
	const autoLocations = [
		{ id: "none", label: "None" },
		{ id: "depot", label: "Depot" },
		{ id: "outpost", label: "Outpost" },
		{ id: "neutralzone", label: "Neutral Zone" },
		{ id: "alliancezone", label: "Alliance Zone" },
	];
	const [autoFuel, setValue] = React.useState<number>(0);
	const min = 0;
	const max = 100;

	const handleIncrement = () => {
		setValue((prev) => Math.min(prev + 5, max));
	};
	const handleDecrement = () => {
		setValue((prev) => Math.max(prev - 5, min));
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(e.target.value, 10);
		if (!isNaN(newValue)) {
			setValue(Math.min(Math.max(newValue, min), max));
		} else if (e.target.value === "") {
			setValue(0);
		}
	};

	const [selectedAutoLocation, setAutoLocation] = React.useState<string[]>([]);
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
						{autoLocations.map((item) => (
							<div key={item.id} className="flex items-center space-x-3">
								<Checkbox
									id={item.id}
									checked={selectedAutoLocation.includes(item.id)}
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
	const climbValues = [
		{ id: "l1", label: "L1" },
		{ id: "l2", label: "L2" },
		{ id: "l3", label: "L3" },
		{ id: "fail", label: "Fail" },
	];
	const [teleopFuel, setValue] = React.useState<number>(0);
	const min = 0;
	const max = 500;

	const handleIncrement = () => {
		setValue((prev) => Math.min(prev + 5, max));
	};
	const handleDecrement = () => {
		setValue((prev) => Math.max(prev - 5, min));
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(e.target.value, 10);
		if (!isNaN(newValue)) {
			setValue(Math.min(Math.max(newValue, min), max));
		} else if (e.target.value === "") {
			setValue(0);
		}
	};
	const [selectedClimbValue, setClimbValue] = React.useState<string[]>([]);
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
					<p>Climb</p>
					<div className="flex max-w-sm flex-col gap-1">
						{climbValues.map((item) => (
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

function PreMatchCard({ onTabChange }: { onTabChange: (tab: MainTab) => void }) {
	const positions = [
		{ value: "r1", label: "R1" },
		{ value: "r2", label: "R2" },
		{ value: "r3", label: "R3" },
		{ value: "b1", label: "B1" },
		{ value: "b2", label: "B2" },
		{ value: "b3", label: "B3" },
	];
	return (
		<Card>
			<CardContent>
				<div className="flex max-w-sm flex-col gap-2 text-sm">
					<Field>
						<FieldLabel htmlFor="name-input">Scouter Name</FieldLabel>
						<Input id="name-input" />
					</Field>
					<Label htmlFor="event-select">Event</Label>
					<Select items={events}>
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
						<Input id="match-input" placeholder="" />
					</Field>
					<Label>Robot Position</Label>
					<Select items={positions}>
						<SelectTrigger className="w-full" id="position-select">
							<SelectValue placeholder="Select a Position" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{positions.map((item) => (
									<SelectItem key={item.value} value={item.value}>
										{item.label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					<Button className="w-full" onClick={() => onTabChange("auto")}>
						Continue
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
function PostMatchCard() {
	return (
		<Card>
			<CardContent>
				<div>
					<p>Shooter Accuracy</p>
					<RadioGroup>
						<div className="flex items-center space-x-3">
							<RadioGroupItem value=">85%" id="accuracy-85" />
							<label htmlFor="accuracy-85">over 85%</label>
						</div>
						<div className="flex items-center space-x-3">
							<RadioGroupItem value="70-85%" id="accuracy-70-85" />
							<label htmlFor="accuracy-70-85">70-85%</label>
						</div>
						<div className="flex items-center space-x-3">
							<RadioGroupItem value="55-70%" id="accuracy-55-70" />
							<label htmlFor="accuracy-55-70">55-70%</label>
						</div>
						<div className="flex items-center space-x-3">
							<RadioGroupItem value="40-55%" id="accuracy-40-55" />
							<label htmlFor="accuracy-40-55">40-55%</label>
						</div>
						<div className="flex items-center space-x-3">
							<RadioGroupItem value="<40%" id="accuracy-40" />
							<label htmlFor="accuracy-40">under 40%</label>
						</div>
					</RadioGroup>
				</div>
			</CardContent>
		</Card>
	);
}
function GeneralCard() {
	const playStyles = [
		{ id: "cycle", label: "Cycler" },
		{ id: "pass", label: "Passer" },
		{ id: "defense", label: "Defense" },
		{ id: "thief", label: "Thief" },
		{ id: "clean", label: "Clean Up" },
	];
	const [selectedPlayStyle, setPlayStyle] = React.useState<string[]>([]);
	const handleChecklistChange = (id: string, checked: boolean) => {
		setPlayStyle((prev) =>
			checked ? [...prev, id] : prev.filter((item) => item !== id),
		);
	};
	return (
		<Card>
			<CardContent>
				<div className="flex max-w-sm flex-col gap-4 text-sm">
					<p>Playstyles</p>
					<div className="flex max-w-sm flex-col gap-1">
						{playStyles.map((item) => (
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
					<p>Crosses With</p>
					<div className="flex max-w-sm flex-col gap-1">
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
					<Textarea placeholder="Enter any additional comments here..." />
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
						<DialogTitle>QR Code</DialogTitle>
						<DialogDescription>
							Once you get the QR Code scanned, press Close.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col items-center justify-center text-center">
						<QRCode value="placeholder QR code testing data" />
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

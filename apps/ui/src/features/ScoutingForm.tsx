import { Minus, Plus } from "lucide-react";
import * as React from "react";
import ReactDOM from "react-dom";
import { QRCode } from "react-qr-code";
import { Input } from "#/components/ui/input";
import { Separator } from "#/components/ui/separator";
import { Textarea } from "#/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ScoutingForm() {
	return (
		<div className="flex max-w-sm flex-col gap-4 text-sm">
			<Tabs defaultValue="auto" className="w-full max-w-sm">
				<TabsList>
					<TabsTrigger value="auto">Auto</TabsTrigger>
					<TabsTrigger value="tele">Teleop</TabsTrigger>
					<TabsTrigger value="post">Post-Match</TabsTrigger>
				</TabsList>
				<TabsContent value="auto">
					<AutoCard />
				</TabsContent>
				<TabsContent value="tele">
					<TeleopCard />
				</TabsContent>
				<TabsContent value="post">
					<PostMatchCard />
				</TabsContent>
			</Tabs>
			<Card>
				<CardContent>
					<GeneralCard />
				</CardContent>
			</Card>
      <QRDialog/>
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
	);
}

function QRDialog() {
  return (
<Dialog>
      <form>
        <DialogTrigger render={<Button className={"w-full"}>Submit Form</Button>} />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
            <DialogDescription>
              Once you get the QR Code scanned, press Close.
            </DialogDescription>
          </DialogHeader>
          <QRCode
          value="Hello"/>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Close & Clear Form</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

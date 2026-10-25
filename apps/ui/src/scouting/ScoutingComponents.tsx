import * as React from "react";
import { Checkbox } from "#/components/ui/checkbox";

type CheckboxListProps = {
	items: readonly { id: string; label: string }[];
	selected: string[];
	onChange: (id: string, checked: boolean) => void;
};
export const CheckboxList = React.memo(function CheckboxList({
	items,
	selected,
	onChange,
}: CheckboxListProps) {
	return (
		<div className="flex max-w-sm flex-col gap-1">
			{items.map((item) => (
				<div key={item.id} className="flex items-center space-x-3">
					<Checkbox
						id={item.id}
						checked={selected.includes(item.id)}
						onCheckedChange={(checked) => onChange(item.id, checked === true)}
					/>
					<label htmlFor={item.id}>{item.label}</label>
				</div>
			))}
		</div>
	);
});

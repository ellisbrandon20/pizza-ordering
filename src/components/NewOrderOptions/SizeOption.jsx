import { Div, Label, Radiobox, Text } from "atomize";

export const SizeOption = ({ size, index, changeSelection }) => {
	return (
		<>
			<Text tag="p" textSize="subheader">Pick your Size:</Text>
			<Div m={{ l: 'auto', r: 'auto', t: '0.5rem' }} w="18rem">
				<Label align="center" textWeight="600" m={{ b: "0.5rem", r: "2rem" }}>
					<Radiobox
						onChange={(e) => changeSelection(e, 'Size', index, 'S')}
						checked={size === 'S'}
						name="size"
						inactiveColor="danger500"
						activeColor="danger700"
					/>
					Small (12")
				</Label>
				<Label align="center" textWeight="600" m={{ b: "0.5rem", r: "2rem" }}>
					<Radiobox
						onChange={(e) => changeSelection(e, 'Size', index, 'M')}
						checked={size === 'M'}
						name="size"
						inactiveColor="danger500"
						activeColor="danger700"
					/>
					Medium (16")
				</Label>
				<Label align="center" textWeight="600" m={{ b: "0.5rem", r: "2rem" }}>
					<Radiobox
						onChange={(e) => changeSelection(e, 'Size', index, 'L')}
						checked={size === 'L'}
						name="size"
						inactiveColor="danger500"
						activeColor="danger700"
					/>
					Large (18")
				</Label>
			</Div>
		</>
	);
}
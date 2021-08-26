import { Div, Label, Radiobox, Text } from "atomize";

export const CrustOption = ({ crust, index, changeSelection }) => {
	return (
		<>
			<Text tag="p" textSize="subheader">Pick your Crust:</Text>
			<Div m={{ l: 'auto', r: 'auto', t: '0.5rem' }} w="18rem">
				<Label align="center" textWeight="600" m={{ b: "0.5rem", r: "2rem" }}>
					<Radiobox
						onChange={(e) => changeSelection(e, 'Crust', index, 'Original')}
						checked={crust === 'Original'}
						name="crust"
						inactiveColor="danger500"
						activeColor="danger700"
					/>
					Original
				</Label>
				<Label align="center" textWeight="600" m={{ b: "0.5rem", r: "2rem" }}>
					<Radiobox
						onChange={(e) => changeSelection(e, 'Crust', index, 'Thin')}
						checked={crust === 'Thin'}
						name="crust"
						inactiveColor="danger500"
						activeColor="danger700"
					/>
					Thin
				</Label>
				<Label align="center" textWeight="600" m={{ b: "0.5rem", r: "2rem" }}>
					<Radiobox
						onChange={(e) => changeSelection(e, 'Crust', index, 'Stuffed')}
						checked={crust === 'Stuffed'}
						name="crust"
						inactiveColor="danger500"
						activeColor="danger700"
					/>
					Stuffed
				</Label>
				<Label align="center" textWeight="600" m={{ b: "0.5rem", r: "2rem" }}>
					<Radiobox
						onChange={(e) => changeSelection(e, 'Crust', index, 'Deepdish')}
						checked={crust === 'Deepdish'}
						name="crust"
						inactiveColor="danger500"
						activeColor="danger700"
					/>
					Deepdish
				</Label>
			</Div>
		</>
	);
}
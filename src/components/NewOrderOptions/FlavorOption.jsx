import { Div, Label, Radiobox, Text } from "atomize";


export const FlavorOption = ({ flavor, index, changeSelection }) => {
	return (
		<>
			<Text tag="p" textSize="subheader">Pick your Flavor:</Text>
			<Div m={{ l: 'auto', r: 'auto', t: '0.5rem' }} w="18rem">
				<Label align="center" textWeight="600" m={{ b: "0.5rem", r: "2rem" }}>
					<Radiobox
						onChange={(e) => changeSelection(e, 'Flavor', index, 'Cheese')}
						checked={flavor === 'Cheese'}
						name="flavor"
						inactiveColor="danger500"
						activeColor="danger700"
					/>
					Cheese
				</Label>
				<Label align="center" textWeight="600" m={{ b: "0.5rem", r: "2rem" }}>
					<Radiobox
						onChange={(e) => changeSelection(e, 'Flavor', index, 'Pepperoni')}
						checked={flavor === 'Pepperoni'}
						name="flavor"
						inactiveColor="danger500"
						activeColor="danger700"
					/>
					Pepperoni
				</Label>
				<Label align="center" textWeight="600" m={{ b: "0.5rem", r: "2rem" }}>
					<Radiobox
						onChange={(e) => changeSelection(e, 'Flavor', index, 'Sausage')}
						checked={flavor === 'Sausage'}
						name="flavor"
						inactiveColor="danger500"
						activeColor="danger700"
					/>
					Sausage
				</Label>
				<Label align="center" textWeight="600" m={{ b: "0.5rem", r: "2rem" }}>
					<Radiobox
						onChange={(e) => changeSelection(e, 'Flavor', index, 'Supreme')}
						checked={flavor === 'Supreme'}
						name="flavor"
						inactiveColor="danger500"
						activeColor="danger700"
					/>
					Supreme
				</Label>
			</Div>
		</>
	);
}
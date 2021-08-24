import { Div, Input, Text } from "atomize";


export const TabelNoOption = ({ tableNo, index, changeSelection }) => {
	return (
		<>
			<Text tag="p" textSize="subheader">Table Number:</Text>
			<Div m={{ l: 'auto', r: 'auto', t: '0.5rem' }} w="18rem">
				<Input
					placeholder="Table #"
					name='tableNo'
					type='number'
					onChange={(e) => changeSelection(e, 'Table_No', index)}
					w='5.75rem'
					borderColor="danger500"
					focusBorderColor="danger700"
				/>
			</Div>
		</>
	);
}
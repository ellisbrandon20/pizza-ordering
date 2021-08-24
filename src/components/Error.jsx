import { Div, Icon, Text } from "atomize";

export const ErrorScreen = () => {

	return (
		<>
			<Div
				transform='translateY(10rem)'
				w="50rem"
				h="auto"
				m={{ l: 'auto', r: 'auto' }}
				p={{ t: '2rem', b: '2rem' }}
				rounded="lg"
				className="transparent-container"
			>
				<Text tag="h2" textSize="display1">Error: Please Try Again Later</Text>

				<Icon name="AlertSolid" size="5rem" color="danger800" m={{ t: '1rem' }} />
			</Div>
		</>
	);
};
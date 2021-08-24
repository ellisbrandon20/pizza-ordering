import { Button, Div, Icon, Text } from "atomize";

export const SuccessfulOrder = ({ goToScreen }) => {

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
				<Text tag="h2" textSize="display1">Successfully Submitted Order</Text>

				<Icon name="Checked" size="5rem" color="black" />
				<Button
					onClick={() => goToScreen('Dashboard')}
					prefix={
						<Icon
							name="LongLeft"
							size="16px"
							color="white"
							m={{ r: "0.5rem" }}
						/>
					}
					bg="danger700"
					hoverBg="danger600"
					rounded="circle"
					p={{ r: "1.5rem", l: "1rem" }}
					m={{ l: 'auto', r: 'auto', t: '1.25rem' }}
					shadow="2"
					hoverShadow="4"
				>
					Back To Dashboard
				</Button>
			</Div>
		</>
	);
};
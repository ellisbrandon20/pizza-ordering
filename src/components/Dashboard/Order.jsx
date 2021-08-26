import { Component } from "react";
import { Row, Col, Text, Image, Container, Icon, Button } from "atomize";
import pizza from "../../images/pizza.png";
import { deleteOrder } from "../../apis";

export class Order extends Component {

	deletePizzaOrder = (id) => {
		deleteOrder(id)
			.then(responseData => {
				this.props.changeUpdateOrders(true);
			}).catch(_ => {
				this.props.goToScreen('Error');
			});
	}

	render() {
		const { order } = this.props;

		return (
			<Container
				w="50rem"
				h="8rem"
				m={{ l: 'auto', r: 'auto', t: '1.25rem' }}
				rounded="lg"
				className="transparent-container"
				transform='translateY(5rem)'
			>
				<Row top='50%'>
					<Col size='5'>
						<Row>
							<Col size="12">
								<Text>{`Order ${order.Order_ID}`}</Text>
							</Col>
						</Row>
						<Row>
							<Col size="12">
								<Image src={pizza}
									maxH="5rem"
									maxW="5rem"
								/>
							</Col>
						</Row>
					</Col>

					<Col size="5">
						<Row>
							<Col size="12">
								<Row>
									<Col size="12">
										<Text>
											{`Table ${order.Table_No}`}
										</Text>
									</Col>
								</Row>
								<Row>
									<Col size="12">
										<Text>
											{`Crust: ${order.Crust}`}

										</Text>
									</Col>
								</Row>
								<Row>
									<Col size="12">
										<Text>
											{`Flavor: ${order.Flavor}`}
										</Text>
									</Col>
								</Row>
								<Row>
									<Col size="12">
										<Text>
											{`Size: ${order.Size}`}
										</Text>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
					<Col size="2">
						<Button
							h="2.5rem"
							w="2.5rem"
							bg="danger700"
							hoverBg="danger600"
							rounded="circle"
							m={{ r: "1rem" }}
							transform='translateY(100%)'
							onClick={() => this.deletePizzaOrder(order.Order_ID)}
						>
							<Icon name="DeleteSolid" size="20px" color="white" />
						</Button>
					</Col>
				</Row>
			</Container>
		);
	}
}
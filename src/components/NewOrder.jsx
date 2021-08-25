import { Button, Col, Container, Div, Icon, Row, Text } from "atomize";
import { Component } from "react";
import { createOrder } from "../apis";
import { CrustOption } from "./NewOrderOptions/CrustOption";
import { FlavorOption } from "./NewOrderOptions/FlavorOption";
import { SizeOption } from "./NewOrderOptions/SizeOption";
import { TabelNoOption } from "./NewOrderOptions/TableNoOption";

export class NewOrder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			'newOrders': [{
				'Crust': '',
				'Flavor': '',
				'Size': '',
				'Table_No': undefined,
			}]
		};
	}

	changeSelection = (e, option, index, value) => {
		if (option === 'Table_No') value = parseInt(e.target.value);

		let pizzaOrders = this.state.newOrders;

		pizzaOrders[index][option] = value;

		this.setNewOrders(pizzaOrders);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { newOrders } = this.state;

		let successOrder = false;
		newOrders.forEach(order => {
			successOrder = this.createPizzaOrder(order);
		});

		if (successOrder) this.props.goToScreen("SuccessfulOrder");
	}

	createPizzaOrder = (order) => {
		return createOrder(order)
			.then(_ => {
				return true;
			}).catch(_ => {
				this.props.goToScreen('Error');
				return false;
			});
	}

	addPizzaOrder = (e) => {
		e.preventDefault();

		let pizzaOrders = this.state.newOrders;
		pizzaOrders.push({
			'Crust': '',
			'Flavor': '',
			'Size': '',
			'Table_No': undefined,
		});

		this.setNewOrders(pizzaOrders);
	}

	deleteNewOrder = (e, index) => {
		e.preventDefault();

		let pizzaOrders = this.state.newOrders;
		pizzaOrders.splice(index, 1);

		this.setNewOrders(pizzaOrders);
	}

	setNewOrders = (pizzaOrders) => {
		this.setState({
			'newOrders': pizzaOrders
		});
	}

	render() {
		const { newOrders } = this.state;
		return (
			<Div transform='translateY(5rem)'>
				<Text tag="h2" textSize="display1">New Pizza Order</Text>

				<form id='newOrder' onSubmit={this.handleSubmit}>
					{newOrders.map((order, i) => {
						return (
							<Container
								key={i}
								w="50rem"
								h="28rem"
								m={{ l: 'auto', r: 'auto', t: '1.25rem' }}
								rounded="lg"
								className="transparent-container"
							>
								<Text key={`OrderNo-${i}`} tag="h3" textSize="heading">Pizza #{i + 1}</Text>

								<Row>
									<Col size='6'>
										<CrustOption
											key={`crust-${i}`}
											crust={order.Crust}
											index={i}
											changeSelection={this.changeSelection}
										/>
									</Col>
									<Col size='6'>
										<FlavorOption
											key={`flavor-${i}`}
											flavor={order.Flavor}
											index={i}
											changeSelection={this.changeSelection}
										/>
									</Col>
								</Row>
								<Row>
									<Col size='6'>
										<SizeOption
											key={`size-${i}`}
											size={order.Size}
											index={i}
											changeSelection={this.changeSelection}
										/>

									</Col>
									<Col size='6'>
										<TabelNoOption
											key={`tableNo-${i}`}
											tableNo={order.Table_No}
											index={i}
											changeSelection={this.changeSelection}
										/>

									</Col>
								</Row>
								<Row>
									<Col size='12'>
										<Div d="flex">
											<Button
												onClick={(e) => this.addPizzaOrder(e)}
												h="2.5rem"
												w="2.5rem"
												bg="danger700"
												hoverBg="danger600"
												rounded="circle"
												m={{ l: 'auto', r: 'auto', t: '1.25rem' }}
												shadow="2"
												hoverShadow="4"
											>
												<Icon name="Add" size="20px" color="white" />
											</Button>
											<Button
												onClick={(e) => this.deleteNewOrder(e, i)}
												h="2.5rem"
												w="2.5rem"
												bg="danger700"
												hoverBg="danger600"
												rounded="circle"
												m={{ l: 'auto', r: 'auto', t: '1.25rem' }}
												shadow="2"
												hoverShadow="4"
											>
												<Icon name="DeleteSolid" size="20px" color="white" />
											</Button>
										</Div>
									</Col>
								</Row>
							</Container>
						);
					})}

					<Button
						type='submit'
						h="2.5rem"
						w="8rem"
						bg="success800"
						hoverBg="success700"
						rounded="circle"
						m={{ l: 'auto', r: 'auto', t: '1.25rem' }}
						shadow="2"
						hoverShadow="4"
					>
						Place Order
					</Button>
				</form>
			</Div>
		);
	}
}
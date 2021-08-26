import { Button, Div, Icon, Notification, Text } from "atomize";
import { Component } from "react";
import { getPizza } from "../../apis";
import { AllOrders } from "./AllOrders";
import { Filter } from "./Filter";

export class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			'orders': [],
			'filCrust': undefined,
			'filFlavor': undefined,
			'filSize': undefined,
			'filTableNo': undefined,
			'updateOrders': false,
			'successNotif': false
		}
	}

	componentDidMount() {
		this.getPizzaOrders();
	}

	componentDidUpdate(_, prevState) {
		// call API to get up to date orders when an order is deleted
		if (this.state.updateOrders === true) {
			this.getPizzaOrders();
			this.changeUpdateOrders(false);
		}

		// update list of orders based on filters if filter changed
		this.updateFilteredOrders(prevState);
	}

	updateFilteredOrders = (prevState) => {
		if (this.didFilterChange(prevState, this.state)) {
			let filteredOrders = this.state.orders;
			let filters = {
				'Crust': this.state.filCrust,
				'Flavor': this.state.filFlavor,
				'Size': this.state.filSize,
				'Table_No': this.state.filTableNo ? parseInt(this.state.filTableNo) : undefined
			};

			filteredOrders = filteredOrders.map(order => {
				if ((filters.Crust !== undefined && order.Crust !== filters.Crust)
					|| (filters.Flavor !== undefined && order.Flavor !== filters.Flavor)
					|| (filters.Size !== undefined && order.Size !== filters.Size)
					|| (filters.Table_No !== undefined && order.Table_No !== filters.Table_No)
				) {
					return { ...order, 'filtered': false };
				}
				return { ...order, 'filtered': true };
			});

			// must have if statement otherwise this called forever onload/onupdate
			this.setState({ 'orders': filteredOrders });
		}
	}

	didFilterChange = (prevState, state) => {
		if (prevState === undefined) return false;
		// TODO - find better solution
		return (prevState.filCrust !== state.filCrust)
			|| (prevState.filFlavor !== state.filFlavor)
			|| (prevState.filSize !== state.filSize)
			|| (
				(state.filTableNo !== undefined)
				&& (!(isNaN(prevState.filTableNo) && isNaN(state.filTableNo)))
				&& (parseInt(prevState.filTableNo) !== parseInt(state.filTableNo))
			);

	};

	getPizzaOrders = () => {
		// 'filtered' attribute adds ability to show all orders or just the filtered orders without losing the data
		getPizza()
			.then(responseData => {
				const filteredOrders = responseData.map(order => {
					return { ...order, 'filtered': true };
				});

				this.setState({ 'orders': filteredOrders });
			}).catch(_ => {
				this.props.goToScreen('Error');
			});

	}

	changeFilter = (filterCategory, filterValue) => {
		this.setState({
			[filterCategory]: filterValue
		});
	}

	changeUpdateOrders = (msg) => {
		this.setState({
			'updateOrders': msg,
			'successNotif': true
		});
	}

	updateFilter = (filter, value) => {
		this.setState({
			[filter]: value
		});
	}

	render() {
		const filteredOrders = this.state.orders.filter(order => order.filtered === true)

		return (
			<>
				<Notification
					bg="success700"
					isOpen={this.state.successNotif}
					onClose={() => this.setState({ successNotif: false })}
					prefix={
						<Icon
							name="Success"
							color="white"
							m={{ r: "0.5rem" }}
						/>
					}
				>
					Successfully Deleted Pizza
				</Notification>

				<Div m={{ b: '5rem' }} transform='translateY(5rem)'>
					<Div
						w="50rem"
						h="auto"
						m={{ l: 'auto', r: 'auto' }}
						p={{ t: '0.5rem', b: '2rem' }}
						rounded="lg"
						className="transparent-container dashboard-main"
					>
						<Button
							rounded="lg"
							m={{ l: 'auto', r: 'auto', t: '0.5rem', b: '3rem' }}
							bg="danger700"
							hoverBg="danger600"
							onClick={() => this.props.goToScreen('NewOrder')}
						>
							Start New Order
						</Button>

						{/* Current Orders View */}
						<Text tag="h2" textSize="display1" m={{ b: '2rem' }}>
							Current Orders
						</Text>

						<Filter
							filCrust={this.state.filCrust}
							filFlavor={this.state.filFlavor}
							filSize={this.state.filSize}
							filTableNo={this.state.filTableNo}
							updateFilter={this.updateFilter}
						/>
					</Div>

					<AllOrders
						orders={filteredOrders}
						changeUpdateOrders={this.changeUpdateOrders}
					/>
				</Div>
			</>
		);
	}
}
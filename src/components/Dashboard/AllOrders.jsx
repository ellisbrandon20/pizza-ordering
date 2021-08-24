import { Component } from "react";
import { Order } from "./Order";

// TODO - Handle 0 Orders

export class AllOrders extends Component {
	render() {
		const { orders } = this.props;

		return (
			<>
				{orders.map(order => {
					return (
						<Order key={order.Order_ID} order={order} changeUpdateOrders={this.props.changeUpdateOrders} />
					);
				})}
			</>
		);
	}
}
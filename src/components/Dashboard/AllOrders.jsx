import { Order } from "./Order";

export const AllOrders = ({ orders, changeUpdateOrders }) => {
	return (
		<>
			{orders.map(order => {
				return (
					<Order key={order.Order_ID} order={order} changeUpdateOrders={changeUpdateOrders} />
				);
			})}
		</>
	);
}
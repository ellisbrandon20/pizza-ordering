import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { AllOrders } from '../components/Dashboard/AllOrders';
import { Order } from '../components/Dashboard/Order';
Enzyme.configure({ adapter: new Adapter() });


// ? is last test causing issues with snapshot ?
// test('AllOrders Snapshot', () => {
// 	const wrapper = renderer.create(<AllOrders orders={[{}]} changeUpdateOrders={jest.fn()} />).toJSON();
// 	expect(wrapper).toMatchSnapshot();
// });

test('should render 0 order component', () => {
	const component = shallow(<AllOrders orders={[]} />);
	const orderComponent = component.find(Order);
	expect(orderComponent).toHaveLength(0);
});

test('should render 1 order component', () => {
	const component = shallow(<AllOrders orders={[{}]} />);
	const orderComponent = component.find(Order);
	expect(orderComponent).toHaveLength(1);
});

test('should render 2 order component', () => {
	const component = shallow(<AllOrders orders={[{}, {}]} />);
	const orderComponent = component.find(Order);
	expect(orderComponent).toHaveLength(2);
});

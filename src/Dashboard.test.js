import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Button, Input, Text } from 'atomize';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AllOrders } from './components/Dashboard/AllOrders';
Enzyme.configure({ adapter: new Adapter() });


test('Dashbaord Snapshot', () => {
	const wrapper = renderer.create(<Dashboard />).toJSON();
	expect(wrapper).toMatchSnapshot();
});

test('should render Start New Order Button', () => {
	const component = shallow(<Dashboard />);
	const newOrderBtn = component.find(Button);
	expect(newOrderBtn).toHaveLength(1);
	expect(newOrderBtn.text()).toEqual('Start New Order');
});

test('should render Current Orders Text', () => {
	const component = shallow(<Dashboard />);
	const title = component.find(Text);
	expect(title).toHaveLength(1);
	expect(title.text()).toEqual('Current Orders');
});

test('should render AllOrders component', () => {
	const component = shallow(<Dashboard />);
	component.setState({
		'orders': [{ 'order': 1 }]
	});
	const allOrders = component.find(AllOrders);
	expect(allOrders).toHaveLength(1);
});

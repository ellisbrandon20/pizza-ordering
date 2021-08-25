import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Container, Text } from 'atomize';
import { NewOrder } from './components/NewOrder';
import { CrustOption } from './components/NewOrderOptions/CrustOption';
import { FlavorOption } from './components/NewOrderOptions/FlavorOption';
import { SizeOption } from './components/NewOrderOptions/SizeOption';
import { TabelNoOption } from './components/NewOrderOptions/TableNoOption';
Enzyme.configure({ adapter: new Adapter() });

test('NewOrder Snapshot', () => {
	const wrapper = renderer.create(<NewOrder />).toJSON();
	expect(wrapper).toMatchSnapshot();
});

test('should render form', () => {
	const component = shallow(<NewOrder />);
	const form = component.find('#newOrder');
	expect(form).toHaveLength(1);
});

test('should render single new Pizza Order Container and Fields', () => {
	const component = shallow(<NewOrder />);

	const container = component.find(Container);
	expect(container).toHaveLength(1);

	const newOrderHeader = component.find(Text);
	expect(newOrderHeader).toHaveLength(2);
	expect(newOrderHeader.at(1).text()).toEqual('Pizza #1');

	const crustField = component.find(CrustOption);
	expect(crustField).toHaveLength(1);

	const flavorOption = component.find(FlavorOption);
	expect(flavorOption).toHaveLength(1);

	const sizeOption = component.find(SizeOption);
	expect(sizeOption).toHaveLength(1);

	const tableNoOption = component.find(TabelNoOption);
	expect(tableNoOption).toHaveLength(1);
});

test('should render multiple new Pizza Order Container and Fields', () => {
	const component = shallow(<NewOrder />);
	component.setState({
		'newOrders': [
			{
				'Crust': '',
				'Flavor': '',
				'Size': '',
				'Table_No': undefined,
			},
			{
				'Crust': '',
				'Flavor': '',
				'Size': '',
				'Table_No': undefined,
			}
		]
	});

	const container = component.find(Container);
	expect(container).toHaveLength(2);

	const newOrderHeader = component.find(Text);
	expect(newOrderHeader).toHaveLength(3);
	expect(newOrderHeader.at(1).text()).toEqual('Pizza #1');
	expect(newOrderHeader.at(2).text()).toEqual('Pizza #2');

	const crustField = component.find(CrustOption);
	expect(crustField).toHaveLength(2);

	const flavorOption = component.find(FlavorOption);
	expect(flavorOption).toHaveLength(2);

	const sizeOption = component.find(SizeOption);
	expect(sizeOption).toHaveLength(2);

	const tableNoOption = component.find(TabelNoOption);
	expect(tableNoOption).toHaveLength(2);
});
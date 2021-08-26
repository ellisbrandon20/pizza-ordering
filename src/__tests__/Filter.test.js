import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Filter } from '../components/Dashboard/Filter';
import { Button, Dropdown, Input } from 'atomize';
Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
	filCrust: 'crust',
	filFlavor: 'flavor',
	filSize: 'size',
	filTableNo: 1,
	updateFilter: jest.fn()
};

test('AllOrders Snapshot', () => {
	const wrapper = renderer.create(
		<Filter {...defaultProps} />
	).toJSON();
	expect(wrapper).toMatchSnapshot();
});

test('render all Dropdown filters', () => {
	const component = shallow(<Filter {...defaultProps} />);
	const dropdowns = component.find(Dropdown);
	expect(dropdowns).toHaveLength(3);
});

test('render Table No filter', () => {
	const component = shallow(<Filter {...defaultProps} />);
	const input = component.find(Input);
	expect(input).toHaveLength(1);
});

test('render Clear All filters Button', () => {
	const component = shallow(<Filter {...defaultProps} />);
	const clearBtn = component.find(Button);
	expect(clearBtn).toHaveLength(1);
});

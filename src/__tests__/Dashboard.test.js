import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Button, Text } from 'atomize';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { AllOrders } from '../components/Dashboard/AllOrders';
import { Filter } from '../components/Dashboard/Filter';;
Enzyme.configure({ adapter: new Adapter() });

const order = {
	"Crust": "NORMAL",
	"Flavor": "BEEF-NORMAL",
	"Order_ID": 1,
	"Size": "M",
	"Table_No": 1
};

test('Dashbaord Snapshot', () => {
	const wrapper = renderer.create(<Dashboard />).toJSON();
	expect(wrapper).toMatchSnapshot(); ``
});

test('should render Start New Order Button', () => {
	const component = shallow(<Dashboard />);
	const newOrderBtn = component.find(Button);
	expect(newOrderBtn).toHaveLength(1);
	expect(newOrderBtn.text()).toEqual('Start New Order');
});

test('should call goToScreen when clicking Start New Order Button', () => {
	const goToScreenFn = jest.fn();
	const component = shallow(<Dashboard goToScreen={goToScreenFn} />);
	const newOrderBtn = component.find(Button);

	newOrderBtn.simulate('click');
	expect(goToScreenFn).toBeCalled();
});

test('should render Filter Component', () => {
	const component = shallow(<Dashboard />);

	component.setState({
		'filCrust': 'crust',
		'filFlavor': 'flavor',
		'filSize': 'size',
		'filTableNo': 'tableNo',
	});

	const filterComp = component.find(Filter);
	expect(filterComp).toHaveLength(1);
	expect(filterComp.prop('filCrust')).toEqual('crust');
	expect(filterComp.prop('filFlavor')).toEqual('flavor');
	expect(filterComp.prop('filSize')).toEqual('size');
	expect(filterComp.prop('filTableNo')).toEqual('tableNo');
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

test('ComponentDidMount', () => {
	const componentDidMountSpy = jest.spyOn(Dashboard.prototype, 'componentDidMount');
	const component = mount(<Dashboard />);
	expect(componentDidMountSpy).toHaveBeenCalled();
	componentDidMountSpy.mockReset();
	componentDidMountSpy.mockRestore();
});

test('ComponentDidMount getPizzaOrders', () => {
	const component = shallow(<Dashboard />);
	const instance = component.instance();
	jest.spyOn(instance, 'getPizzaOrders');
	instance.componentDidMount();
	expect(instance.getPizzaOrders).toHaveBeenCalled();
});

test('ComponentDidUpdate', () => {
	const component = shallow(<Dashboard />);
	const instance = component.instance();
	jest.spyOn(instance, 'getPizzaOrders');
	jest.spyOn(instance, 'changeUpdateOrders');
	jest.spyOn(instance, 'updateFilteredOrders').mockImplementation(() => 'return updateFilteredOrders')
	component.setState({ updateOrders: true });
	instance.componentDidUpdate();
	expect(instance.getPizzaOrders).toHaveBeenCalled();
	expect(instance.changeUpdateOrders).toHaveBeenCalled();
	expect(instance.updateFilteredOrders).toHaveBeenCalled();
});

test('updateFilteredOrders - no filters', () => {
	const component = shallow(<Dashboard />);
	const instance = component.instance();
	jest.spyOn(instance, 'getPizzaOrders');
	jest.spyOn(instance, 'changeUpdateOrders');
	component.setState({
		orders: [order],
		'filCrust': undefined,
		'filFlavor': undefined,
		'filSize': undefined,
		'filTableNo': undefined,
	});

	expect(component.state('orders')).toEqual([order]);
});

test('updateFilteredOrders - filCrust filter results in 0 matches', () => {
	const component = shallow(<Dashboard />);
	const instance = component.instance();
	jest.spyOn(instance, 'getPizzaOrders');
	jest.spyOn(instance, 'changeUpdateOrders');
	component.setState({
		orders: [order],
		'filCrust': 'thin crust',
		'filFlavor': undefined,
		'filSize': undefined,
		'filTableNo': undefined,
	});

	expect(component.state('orders')).toEqual([{ ...order, 'filtered': false }]);
});

test('updateFilteredOrders - filCrust filter results in 1 matches', () => {
	const component = shallow(<Dashboard />);
	const instance = component.instance();
	jest.spyOn(instance, 'getPizzaOrders');
	jest.spyOn(instance, 'changeUpdateOrders');

	component.setState({
		orders: [order, { ...order, 'Crust': 'Thin' }],
		'filCrust': 'Thin',
		'filFlavor': undefined,
		'filSize': undefined,
		'filTableNo': undefined,
	});

	expect(component.state('orders')).toEqual([
		{ ...order, 'filtered': false },
		{ ...order, 'Crust': 'Thin', 'filtered': true }
	]);
});

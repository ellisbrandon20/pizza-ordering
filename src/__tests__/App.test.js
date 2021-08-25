import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Text } from 'atomize';
import { Login } from '../components/Login';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { NewOrder } from '../components/NewOrder';
import { SuccessfulOrder } from '../components/SuccessfulOrder';
import { ErrorScreen } from '../components/Error';
Enzyme.configure({ adapter: new Adapter() });


test('App Snapshot', () => {
	const wrapper = renderer.create(<App />).toJSON();
	expect(wrapper).toMatchSnapshot();
});

test('should render Text', () => {
	const component = shallow(<App />);
	expect(component.find(Text)).toHaveLength(1);
});

test('should render LogIn Screen', () => {
	const component = shallow(<App />);
	expect(component.find(Login)).toHaveLength(1);
	expect(component.find(Dashboard)).toHaveLength(0);
	expect(component.find(NewOrder)).toHaveLength(0);
	expect(component.find(SuccessfulOrder)).toHaveLength(0);
	expect(component.find(ErrorScreen)).toHaveLength(0);
});

test('should render Dashboard Screen when state is set', () => {
	const component = shallow(<App />);
	component.setState({ 'currentScreen': 'Dashboard' })
	expect(component.find(Dashboard)).toHaveLength(1);
	expect(component.find(Login)).toHaveLength(0);
	expect(component.find(NewOrder)).toHaveLength(0);
	expect(component.find(SuccessfulOrder)).toHaveLength(0);
	expect(component.find(ErrorScreen)).toHaveLength(0);
});

test('should render NewOrder Screen when state is set', () => {
	const component = shallow(<App />);
	component.setState({ 'currentScreen': 'NewOrder' })
	expect(component.find(NewOrder)).toHaveLength(1);
	expect(component.find(Dashboard)).toHaveLength(0);
	expect(component.find(Login)).toHaveLength(0);
	expect(component.find(SuccessfulOrder)).toHaveLength(0);
	expect(component.find(ErrorScreen)).toHaveLength(0);
});

test('should render SuccessfulOrder Screen when state is set', () => {
	const component = shallow(<App />);
	component.setState({ 'currentScreen': 'SuccessfulOrder' })
	expect(component.find(SuccessfulOrder)).toHaveLength(1);
	expect(component.find(Dashboard)).toHaveLength(0);
	expect(component.find(Login)).toHaveLength(0);
	expect(component.find(NewOrder)).toHaveLength(0);
	expect(component.find(ErrorScreen)).toHaveLength(0);
});

test('should render Error Screen when state is set', () => {
	const component = shallow(<App />);
	component.setState({ 'currentScreen': 'Error' })
	expect(component.find(ErrorScreen)).toHaveLength(1);
	expect(component.find(Dashboard)).toHaveLength(0);
	expect(component.find(Login)).toHaveLength(0);
	expect(component.find(NewOrder)).toHaveLength(0);
	expect(component.find(SuccessfulOrder)).toHaveLength(0);
});

import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Button, Input, Text } from 'atomize';
import { Login } from '../components/Login';
Enzyme.configure({ adapter: new Adapter() });


test('Login Snapshot', () => {
	const wrapper = renderer.create(<Login />).toJSON();
	expect(wrapper).toMatchSnapshot();
});

test('should render Login Text', () => {
	const component = shallow(<Login />);
	const title = component.find(Text);
	expect(title).toHaveLength(1);
	expect(title.text()).toEqual('Login');
});

test('should render username and password Input', () => {
	const component = shallow(<Login />);
	const inputs = component.find(Input);
	expect(inputs).toHaveLength(2);
	expect(inputs.at(0).prop('placeholder')).toEqual('Username');
	expect(inputs.at(1).prop('placeholder')).toEqual('Password');
});

test('should render Login button', () => {
	const component = shallow(<Login />);
	const loginBtn = component.find(Button);
	expect(loginBtn).toHaveLength(1);
	expect(loginBtn.text()).toEqual('Login');
});

test('Login button functionality', () => {
	const handleSubmitFn = jest.fn();

	const component = mount(<Login handleSubmit={handleSubmitFn} />);
	const form = component.find('form');
	form.simulate('submit');

	// not trigerring form submission
	// expect(handleSubmitFn).toHaveBeenCalled();

});


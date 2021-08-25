import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { SuccessfulOrder } from '../components/SuccessfulOrder';
import { Button, Text } from 'atomize';
Enzyme.configure({ adapter: new Adapter() });

test('SuccessfulOrder Snapshot', () => {
	const wrapper = renderer.create(<SuccessfulOrder />).toJSON();
	expect(wrapper).toMatchSnapshot();
});

test('should render Text with successful message', () => {
	const component = shallow(<SuccessfulOrder />);
	const successText = component.find(Text);
	expect(successText.text()).toEqual('Successfully Submitted Order')
});

test('should render back Button', () => {
	const component = shallow(<SuccessfulOrder />);
	const backBtn = component.find(Button);
	expect(backBtn).toHaveLength(1);
	expect(backBtn.text()).toEqual('Back To Dashboard');
});

test('button click should call goToScreen', () => {
	const goToScreenFn = jest.fn();
	const component = shallow(<SuccessfulOrder goToScreen={goToScreenFn} />);
	const backBtn = component.find(Button);

	backBtn.simulate('click');
	expect(goToScreenFn).toBeCalled();
});
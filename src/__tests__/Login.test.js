import React from 'react';
import Login from './components/Login/Login';
import {mount, configure} from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';

/**
 * Login page snap shot test
**/
it('render Login page correctly', () => {
  const TextInputComponent = renderer.create(<Login />).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});

/**
 * Check user credentials validity
**/
describe('User signin', () => {
  /**
   * Check wrong credentials scenario - login page
  **/
  it('should fail if no credentials/wrong credentials are provided', () => {
    configure({adapter: new Adapter()});
    const loginComponent = mount(<Login />);
    loginComponent.find('[name="email"]').simulate('change', {
      target: { value: 'hello' }
    })
    loginComponent.find('[name="password"]').simulate('change', {
      target: { value: 'jhj$' }
    })
    console.log(loginComponent.debug());
    expect(loginComponent.find('.submit').length).toBe(1);      
    expect(loginComponent.state('formIsValid')).toEqual(true);
    loginComponent.find('.submit').simulate('submit');
  });
  /**
   * Check correct credentials scenario - login page
  **/
  it('should pass if credentials are provided', () => {
    configure({adapter: new Adapter()});      
    const loginComponent = mount(<Login />);
    loginComponent.find('[name="email"]').simulate('change', {
      target: { value: 'mkannan@gmail.com' }
    })
    loginComponent.find('[name="password"]').simulate('change', {
      target: { value: 'Asdf123$' }
    })
    console.log(loginComponent.debug());
    expect(loginComponent.find('.submit').length).toBe(1);
    expect(loginComponent.state('formIsValid')).toEqual(true);
    loginComponent.find('.submit').simulate('submit');
  });
});
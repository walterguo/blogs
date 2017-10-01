import { Meteor } from 'meteor/meteor';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { mount,shallow } from 'enzyme';

import {Login} from './Login';

if (Meteor.isClient) {
  describe('Login', function () {

    it('should show error messages', function () {
      const error = 'This is not working';
      const wrapper = shallow(<Login loginWithPassword={() => {}}/>);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({error:''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data',function() {
      const email = 'andrew@test.com';
      const password = 'password123';
      const spy = expect.createSpy();

      const wrapper = mount(
          <MemoryRouter initialEntries={['/']} initialIndex={0}>
              <Login loginWithPassword={spy} />
          </MemoryRouter>
       );

       // And then use the wrapper this way:
       wrapper.find(Login).node.refs['email'].value = email;
       wrapper.find(Login).node.refs['password'].value = password;

       wrapper.find('form.boxed-view__form').simulate('submit');

       expect(spy).toHaveBeenCalled();
       expect(spy.calls[0].arguments[0]).toEqual({ email });
       expect(spy.calls[0].arguments[1]).toBe(password);


      });


      // wrapper.find('input[name="email"]').node.value = email;
      // wrapper.find('input[name="password"]').node.value = password;
      // wrapper.find('form').simulate('submit');
      //
      // expect(spy.calls[0].arguments[0]).toEqual({email});

      it('should set loginWithPassword callback errors', function () {
            const error="this not work";
            const spy = expect.createSpy();
            const wrapper = mount(
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Login loginWithPassword={spy} />
                </MemoryRouter>
             );

            const login=wrapper.find(Login).node;

            expect(login.state['error'].length).toBe(0);

             login.setState({ error });
             const errorElement = wrapper.find('p'); // First, get the element.
             expect(errorElement.text()).toBe(error); // Then get its text.

             login.setState({ error: '' });
            expect(wrapper.find('p').length).toBe(0);

          });


  });
}

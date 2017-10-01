import { Meteor } from 'meteor/meteor';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { mount,shallow } from 'enzyme';

import {Signup} from './Signup';

if (Meteor.isClient) {
  describe('Signup', function () {

    it('should show error messages', function () {
      const error = 'This is not working';
      const wrapper = shallow(<Signup createUser={() => {}}/>);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({error:''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with the form data',function() {
      const email = 'andrew@test.com';
      const password = 'password123';
      const spy = expect.createSpy();

      const wrapper = mount(
          <MemoryRouter initialEntries={['/links']} initialIndex={0}>
              <Signup createUser={spy} />
          </MemoryRouter>
       );

       // And then use the wrapper this way:
       wrapper.find(Signup).node.refs['email'].value = email;
       wrapper.find(Signup).node.refs['password'].value = password;

       wrapper.find('form.boxed-view__form').simulate('submit');

       expect(spy).toHaveBeenCalled();
       expect(spy.calls[0].arguments[0]).toEqual({ email,password });


      });

      it('should set error if short password',function() {
        const email = 'andrew@test.com';
        const password = '123                 ';
        const spy = expect.createSpy();

        const wrapper = mount(
            <MemoryRouter initialEntries={['/links']} initialIndex={0}>
                <Signup createUser={spy} />
            </MemoryRouter>
         );

         // And then use the wrapper this way:
         wrapper.find(Signup).node.refs['email'].value = email;
         wrapper.find(Signup).node.refs['password'].value = password;

         wrapper.find('form.boxed-view__form').simulate('submit');

         const signup=wrapper.find(Signup).node;

         expect(signup.state['error'].length).toBeGreaterThan(0);

        });


      it('should set createUser callback errors', function () {
            const password='password123';
            const reason = 'this is why it failed'
            const spy=expect.createSpy();
            const wrapper = mount(
                <MemoryRouter initialEntries={['/links']} initialIndex={0}>
                    <Signup createUser={spy} />
                </MemoryRouter>
             );

            wrapper.find(Signup).node.refs['password'].value = password;
            wrapper.find('form.boxed-view__form').simulate('submit');

            const signup=wrapper.find(Signup).node;

            spy.calls[0].arguments[1]({reason});
             expect(signup.state['error']).toBe(reason);

             spy.calls[0].arguments[1]();
              expect(signup.state['error'].length).toBe(0);


})


  });
}

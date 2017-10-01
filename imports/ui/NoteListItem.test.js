import React from 'react';
import expect from 'expect';
import {Meteor} from 'meteor/meteor';
import {mount} from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function() {
       it('shoud render title and timestamp', function() {
         const title = 'My title here';
         const updatedAt = 1506830430770;
         const wrapper = mount(<NoteListItem note={{title,updatedAt}}/>);

         expect(wrapper.find('h5').text()).toBe(title);
         expect(wrapper.find('p').text()).toBe('9/30/17');
       })

       it('shoud set default title if not title set', function() {
         const title = '';
         const updatedAt = 1506830430770;
         const wrapper = mount(<NoteListItem note={{title,updatedAt}}/>);

         expect(wrapper.find('h5').text()).toBe('Untitled note');

       })
  })
}

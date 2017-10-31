import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {expect} from 'chai';

import Messages from '../../components/Messages.js';

Enzyme.configure({adapter: new Adapter()});

describe('<Messages>', () => {
  const wrapper = shallow(<Messages />);
  it('renders one #author-input', () => {
    expect(wrapper.find('#author-input')).to.have.length(1);
  });
});

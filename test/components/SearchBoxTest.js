import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from 'components/SearchBox.js';

describe('<SearchBox />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<SearchBox />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "searchbox-component"', function () {
      expect(component.hasClass('searchbox-component')).to.equal(true);
    });
  });
});

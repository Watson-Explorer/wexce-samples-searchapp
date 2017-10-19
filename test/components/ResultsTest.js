import React from 'react';
import { shallow } from 'enzyme';
import Results from 'components/Results.js';

describe('<Results />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<Results />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "results-component"', function () {
      expect(component.hasClass('results-component')).to.equal(true);
    });
  });
});

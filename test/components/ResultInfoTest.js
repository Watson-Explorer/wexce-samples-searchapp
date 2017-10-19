import React from 'react';
import { shallow } from 'enzyme';
import ResultInfo from 'components/ResultInfo.js';

describe('<ResultInfo />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<ResultInfo />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "resultinfo-component"', function () {
      expect(component.hasClass('resultinfo-component')).to.equal(true);
    });
  });
});

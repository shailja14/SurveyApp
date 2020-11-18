import React from 'react';
import { shallow } from 'enzyme';
import SurveyCreate from '../src/components/survey/SurveyCreate';

const authProps = {
    setAuthState: jest.fn(() => {}),
    isLoggedIn: true,
    token: 'adsfssdfs',
};
const props = {
  history: {
    push: jest.fn(() => {})
  }
}

it('Should render the create survey page elements', () => {
    const wrapper = shallow(<SurveyCreate {...props} authProps={authProps} />);
    const findElement = wrapper.find('.create-survey');
    expect(findElement.length).toBe(1);
});

test('Create survey snapshot', () => {
    const wrapper = shallow(<SurveyCreate {...props} authProps={authProps} />);
    expect(wrapper).toMatchSnapshot();
});

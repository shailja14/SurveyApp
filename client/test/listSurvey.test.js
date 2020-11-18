import React from 'react';
import { shallow } from 'enzyme';
import SurveyList from '../src/components/survey/SurveyList';

const authProps = {
    setAuthState: jest.fn(() => {}),
    isLoggedIn: true,
    token: 'adsfssdfs',
};

const props = {
    history: {
        push: jest.fn(() => {}),
    },
};

it('Should render the List survey page elements', () => {
    const wrapper = shallow(<SurveyList {...props} authProps={authProps} />);
    const findElement = wrapper.find('.row.justify-content-center');
    expect(findElement.length).toBe(1);
});

test('List survey snapshot', () => {
    const wrapper = shallow(<SurveyList {...props} authProps={authProps} />);
    expect(wrapper).toMatchSnapshot();
});

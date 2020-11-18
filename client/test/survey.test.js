import React from 'react';
import renderer from 'react-test-renderer';
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

let wrapper;
beforeEach(() => {
    wrapper = shallow(<SurveyList {...props} authProps={authProps} />, { disableLifecycleMethods: true });
    console.log('wrapper', wrapper)
});
afterEach(() => {
    wrapper && wrapper.unmount();
});

test('SurveyList changes', () => {
    const component = renderer.create(
        <SurveyList {...props} authProps={authProps} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

// it('must show the p.user and hide the loading span after api call success',
//     (done) => {
//         const didMount = wrapper.instance().componentDidMount();
//         console.log('ds', wrapper, wrapper.instance())
//         didMount.then(() => {
//         // updating the wrapper
//             wrapper.update();
//             expect(wrapper.find('tbody').children().length).toBeGreaterThan(0);
//             done();
//         });
//     });

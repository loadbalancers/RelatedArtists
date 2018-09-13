import React from 'react';
import App from './app.test.jsx'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });


describe('test App ', () => {
  it('renders correctly', () => {
    const app = shallow(<App/>);
    expect(app).toMatchSnapshot();
  });

  it('should handle state changes', () => {
    const output = shallow(<App/>); 
    expect(output.state().clicked).toEqual(false);
    output.simulate('click');
    expect(output.state().clicked).toEqual(true);
  });

  it('should handle the click event', () => {
    handleClick = jest.fn();
    const output = shallow( <App/>);
    output.simulate('click');
    expect(handleClick).toHaveBeenCalledWith('clicked');
  });

});
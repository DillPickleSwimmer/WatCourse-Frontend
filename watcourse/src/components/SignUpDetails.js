import React from 'react';
import { signupDetails } from '../actions/authActions';
import { WatButton, WatButtonType } from './WatButton';
import '../styles/Signup.css';

class SignUpDetails extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const { program, startTrimester, startYear } = event.target.elements;
        this.props.dispatch(signupDetails(program.value, startYear.value,
            startTrimester.value));
    }

    render() {
        const { programs } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <select name='program' required className='signup-input'>
                    <option value=''>
                            Select a program
                    </option>
                    {
                        programs.map(program => (
                            <option key={program.id} value={program.id}>
                                {program.name}
                            </option>
                        ))
                    }
                </select>
                <select name='startTrimester' required className='signup-input'>
                    <option value=''>
                            Which term did you start in?
                    </option>
                    <option value='3'>
                            Fall
                    </option>
                    <option value='1'>
                            Winter
                    </option>
                    <option value='2'>
                            Summer
                    </option>
                </select>
                <input
                    className='signup-input'
                    name='startYear'
                    type="number"
                    min='2013'
                    max='2099'
                    step="1"
                    placeholder='Which year did you start in?' />
                <WatButton type='submit' variant={WatButtonType.PRIMARY} text='Continue' />
            </form>
        );
    }
}

export default SignUpDetails;
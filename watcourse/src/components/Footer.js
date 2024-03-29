import  React from 'react';
import { connect } from 'react-redux';

import '../styles/Footer.css';

import { reportBug, submitFeedback } from '../actions/feedbackActions';

import { ReactComponent as Emotion0 } from '../images/icon_emotion_0.svg';
import { ReactComponent as Emotion1 } from '../images/icon_emotion_1.svg';
import { ReactComponent as Emotion2 } from '../images/icon_emotion_2.svg';
import { ReactComponent as Emotion3 } from '../images/icon_emotion_3.svg';
import { ReactComponent as Emotion4 } from '../images/icon_emotion_4.svg';
//import { ReactComponent as FeedbackIcon } from '../images/icon_feedback.svg';
import { ReactComponent as BugIcon } from '../images/icon_bug.svg';
import { ReactComponent as CloseIcon } from '../images/icon_close.svg';
import { toggleSidebarSearch } from '../actions/sidebarActions';

class Footer extends React.Component {
    defaultState = {
        openForm: null,
        emotion: -1,
        bugMsg: '',
        screenshot: [], 
        bestFeature: [],
        bestFeatureMsg: '', 
        challenges: '',
        futureFeature: '',
    };

    constructor(props) {
        super(props); 

        this.openBugForm = this.openBugForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.submitForm = this.submitForm.bind(this);

        this.screenshots = React.createRef();

        this.state = this.defaultState;
    }

    emotionSelect(id) {
        document.getElementById('forms').style.maxHeight = '700px';
        this.setState({
            openForm: 'FEEDBACK',
            emotion: id,
        })
    }

    openBugForm() {
        document.getElementById('forms').style.maxHeight = '700px';
        this.setState({openForm: 'BUG'});
    }

    closeForm() {
        // if emotion selected, submit it 
        if(this.state.emotion >= 0) {
            // TODO: submit feedback
        }

        document.getElementById('forms').style.maxHeight = '0px';
        this.setState(this.defaultState);
    }

    updateField(field, event) {
        var newState = {};
        if( field === 'bestFeature' ) {
            var options = event.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            newState[field] = value;
        } else {
            newState[field] = event.target.value;
        }
        this.setState(newState);
    }

    submitForm(event) {
        event.preventDefault();
        switch(this.state.openForm) {
            case 'FEEDBACK':
                this.props.dispatch(submitFeedback(
                    this.state.emotion, 
                    `${this.state.bestFeature} - ${this.state.bestFeatureMsg}`,
                    this.state.challenges,
                    this.state.features,
                ))
                break;
            case 'BUG':
                //screenshots
                let files = this.screenshots.current.files || [];
                this.props.dispatch(reportBug(this.state.bugMsg, files));
                break;
            default: return null;
        }
        this.closeForm();
    }

    render() {
        const feedbackForm = (
            <div className='form'>
                <div className='title'>Provide Feedback</div>
                <div>What features do you find most helpful? (hold ctrl to multi-select)<br/>
                    <select multiple value={this.state.bestFeature} onChange={this.updateField.bind(this, 'bestFeature')}>
                        <option value='term-planning'>Term Planning</option>
                        <option value='req-validation'>Requirement Validation</option>
                        <option value='prereq-tree'>Pre-requisite Tree</option>
                        <option value='transcript'>Transcript Parsing</option>
                        <option value='auto-plan'>Auto-planning (in-progress)</option>
                    </select>
                </div>
                <div>What do you like about the app so far? <br/>
                    <textarea value={this.state.bestFeatureMsg} onChange={this.updateField.bind(this, 'bestFeatureMsg')}/>
                </div>
                <div>What challenges do you find using the app? <br/>
                    <textarea value={this.state.challenges} onChange={this.updateField.bind(this, 'challenges')}/>
                </div>
                <div>What features would you like to see? <br/> 
                    <textarea value={this.state.futureFeature} onChange={this.updateField.bind(this, 'futureFeature')}/>
                </div>
                <button type="submit" onClick={this.submitForm}>Submit</button>
            </div>
        );

        const bugForm = (
            <div className='form'>
                <div className='title'>Report a Bug</div>
                <div>Description: <textarea value={this.state.bugMsg} onChange={this.updateField.bind(this, 'bugMsg')}/></div>
                <div>Screenshot (optional): 
                    <input 
                        type='file' 
                        value={this.state.screenshot} 
                        onChange={this.updateField.bind(this, 'screenshot')}
                        ref={this.screenshots}
                        multiple
                        required
                    />
                </div>
                <button onClick={this.submitForm}>Submit</button>
            </div>
        );

        return (
            <div className='Footer'>
                <div className='forms' id='forms'>
                    {
                        function(openForm) {
                            switch(openForm) {
                                case 'FEEDBACK':
                                    return feedbackForm;
                                case 'BUG':
                                    return bugForm;
                                default: 
                                    return null;
                            }
                        }(this.state.openForm)
                    }
                    <CloseIcon className='small-icon' onClick={this.closeForm} /> 
                </div>
                <div className='inner-footer'>
                    <div></div>
                    <div className='links'>
                        <a href='https://github.com/DillPickleSwimmer/WatCourse-Frontend'>Frontend Github</a>
                        <a href='https://github.com/SiddharthVaknalli/WatCourse-backend'>Backend Github</a>
                    </div>
                    <div className='feedback'>
                        <div className='feedback-emotions'>
                            <Emotion0 className={`icon ${this.state.emotion === 0 ? 'selected-emotion' : null}`} 
                                onClick={this.emotionSelect.bind(this, 0)} />
                            <Emotion1 className={`icon ${this.state.emotion === 1 ? 'selected-emotion' : null}`} 
                                onClick={this.emotionSelect.bind(this, 1)} />
                            <Emotion2 className={`icon ${this.state.emotion === 2 ? 'selected-emotion' : null}`} 
                                onClick={this.emotionSelect.bind(this, 2)} />
                            <Emotion3 className={`icon ${this.state.emotion === 3 ? 'selected-emotion' : null}`} 
                                onClick={this.emotionSelect.bind(this, 3)} />
                            <Emotion4 className={`icon ${this.state.emotion === 4 ? 'selected-emotion' : null}`} 
                                onClick={this.emotionSelect.bind(this, 4)} />
                        </div>
                        <BugIcon className='icon' onClick={this.openBugForm} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state=>({}))(Footer);

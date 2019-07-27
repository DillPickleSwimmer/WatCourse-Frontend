import React from 'react';
import { PropTypes } from 'prop-types';
import '../styles/TranscriptImport.css';
import { postTranscript } from '../actions/transcriptActions';
import parseTranscript from '../utilities/transcriptParser';

class TranscriptImport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleTranscriptChange = this.handleTranscriptChange.bind(this);
    }

    handleTranscriptChange(event) {
        const transcriptText = event.target.value;
        try {
            const parsedTranscript = parseTranscript(transcriptText);
            if (parsedTranscript === null || parsedTranscript.length === 0){
                throw 'Transcript was unparsable';
            }
            this.props.dispatch(postTranscript(parsedTranscript));
        } catch (e) {
            this.setState({error : 'We\'re unable to parse your transcript, please try again'});
        }
    }

    render() {
        return (
            <div className={'TranscriptImport'}>
                <h2>
                    Please take a moment to upload your transcript. 
                    <br/>
                    This will allow you to see your exact course on the home screen.
                </h2>
                <h3> 1. Get your transcript </h3>
                <p>
                    Log in to Quest and follow <a href='https://uwaterloo.ca/quest/help/students/how-do-i/unofficial-transcript'> these instructions</a> to download 
                    your transcript as a PDF.
                </p>
                <h3> 2. Copy your transcript </h3>
                <p>
                        Once you have your transcript downloaded as a PDF, 
                        open the file in Google Chrome. Press Ctrl+P to open the 
                        print preview window and select the entire preview (Ctrl+A), then copy it (Ctrl+C).
                </p>
                <h3> 3. Paste your transcript </h3>
                <p>
                        Simply paste the transcript into the textbox below (Ctrl+V).
                </p>
                <textarea 
                    onChange={this.handleTranscriptChange} 
                    placeholder='Gimme da transcript!'/>
                <p>{this.state.error}</p>
                <p> WatCourse only stores the courses you've taken. We ignore your grades, name and student ID</p>
            </div>
        );
    }
}

TranscriptImport.propTypes = {
    rules: PropTypes.object,
};

export default TranscriptImport;


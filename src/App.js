import React, { Component } from 'react';
import _ from 'lodash';
import speech from 'speech-synth';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      voiceURI: 'Google US English',
    };

    this.bindings(
      'optionChange',
      'inputChange',
      'submit',
    );
  }

  bindings(...args) {
    args.forEach(func => {
      this[func] = this[func].bind(this);
    });
  }

  optionChange(e) {
    e.preventDefault();
    this.setState({ voiceURI: e.target.value });
  }

  inputChange(e) {
    e.preventDefault();
    this.setState({ input: e.target.value });
  }

  submit(e) {
    e.preventDefault();
    speech.say(this.state.input, this.state.voiceURI)
  }

  render() {
    const appStyle = {
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      alignItems: 'center',
      marginTop: '50px'
    };

    return (
      <div

      >
        <form
          onSubmit={this.submit}
          style={appStyle}
        >
          <select
            value={this.state.voiceURI}
            onChange={this.optionChange}
          >
            {
              speech.getVoiceNames().map(voice => (
                <option
                  value={voice}
                  key={_.uniqueId()}
                >
                  {voice}
                </option>
              ))
            }
          </select>
          <textarea
            rows="5"
            cols="50"
            onChange={this.inputChange}
          >
          </textarea>
          <button
            type="submit"
          >Say it!</button>
        </form>
      </div>
    );
  }
}

export default App;

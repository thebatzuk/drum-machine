//import logo from './logo.svg';
import './App.css';
import React from 'react';

const drumpadList = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    label: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    label: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    label: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    label: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    label: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    label: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    label: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    label: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    label: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];


// CSS classes and styles
const buttonClass = 'drum-pad';
const buttonStyle = {};
const buttonStylePressed = {
  boxShadow: "0 0 #212529",
  top: "5px",
};


const Display = (props) => {
  return (
    <div id="display">
      <p>{props.label}</p>
    </div>
  );
}

class Drumpad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pressed: false,
      style: buttonStyle,
    }

    this.playPad = this.playPad.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handlePressPad = this.handlePressPad.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  playPad() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.props.handleDisplay(this.props.label);
    this.handlePressPad();
    setTimeout(() => this.handlePressPad(), 100);
  }

  handleKeyPress(event) {
    if(event.keyCode === this.props.keyCode) {
      this.playPad();
    }
  }

  handlePressPad() {
    if(this.state.pressed) {
      this.setState({pressed: false, style: buttonStyle});
    } else {
      this.setState({pressed: true, style: buttonStylePressed});
    }
  }

  render() {
    return (
      <div 
        className={buttonClass}
        style={this.state.style}
        onClick={this.playPad}
        id={this.props.label}>
        <audio 
          className="clip"
          id={this.props.keyTrigger}
          src={this.props.source}
          />
        <span className="key-trigger">{this.props.keyTrigger}</span>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drumpads: drumpadList,
      label: String.fromCharCode(160), //empty character
    };

    this.displayLabel = this.displayLabel.bind(this);
  }

  displayLabel(activeLabel) {
    this.setState({
      label: activeLabel
    });
  }

  render() {
    let drumpadsRender = this.state.drumpads.map(pad => (
      <Drumpad
        source={pad.url}
        keyTrigger={pad.keyTrigger}
        key={pad.label}
        label={pad.label}
        keyCode={pad.keyCode}
        handleDisplay={this.displayLabel}
                />
    ))
    return (
      <div className="App">
        <header>
          <h1>DRUM MACHINE</h1>
        </header>
        <section>
          <Display 
            label={this.state.label} 
            />
          <div id="drum-machine">
            {drumpadsRender}
          </div>
        </section>
      </div>
    );
  }
}

export default App;

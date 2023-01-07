import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0';

const soundBankFirst = [
{
  keyCode: 81,
  key: "Q",
  id: "Heater1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },

{
  keyCode: 87,
  key: "W",
  id: "Heater2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },

{
  keyCode: 69,
  key: "E",
  id: "Heater3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },

{
  keyCode: 65,
  key: "A",
  id: "Heater4",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },

{
  keyCode: 83,
  key: "S",
  id: "Clap",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },

{
  keyCode: 68,
  key: "D",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },

{
  keyCode: 90,
  key: "Z",
  id: "Kick-n'-Hat",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },

{
  keyCode: 88,
  key: "X",
  id: "Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },

{
  keyCode: 67,
  key: "C",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }];



const soundBankSecond = [
{
  keyCode: 81,
  key: "Q",
  id: "Chord1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },

{
  keyCode: 87,
  key: "W",
  id: "Chord2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },

{
  keyCode: 69,
  key: "E",
  id: "Chord3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },

{
  keyCode: 65,
  key: "A",
  id: "Shaker",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },

{
  keyCode: 83,
  key: "S",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },

{
  keyCode: 68,
  key: "D",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" },

{
  keyCode: 90,
  key: "Z",
  id: "Punchy-Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },

{
  keyCode: 88,
  key: "X",
  id: "Side-Stick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" },

{
  keyCode: 67,
  key: "C",
  id: "Snare",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" }];



const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit" };


const soundBanks = {
  heaterKit: soundBankFirst,
  smoothPianoKit: soundBankSecond };


const KeyboardKey = ({ play, sound: { id, key, url, keyCode } }) => {
  const handleKeydown = event => {
    if (event.keyCode === keyCode) {
      play(key, id);
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
  }, []);

  return /*#__PURE__*/(
    React.createElement("button", { id: "keyCode", className: "drum-pad", onClick: () => play(key, id) }, /*#__PURE__*/
    React.createElement("audio", { className: "clip", id: key, src: url }),
    key));


};

const Keyboard = ({ power, play, sounds }) => /*#__PURE__*/
React.createElement("div", { className: "keyboard" },
power ? sounds.map(sound => /*#__PURE__*/React.createElement(KeyboardKey, { play: play, sound: sound })) : sounds.map(sound => /*#__PURE__*/React.createElement(KeyboardKey, { play: play, sound: { ...sound, url: "#" } })));


const ColorSlider = { color: "red" };

const BankControl = ({ turnOnOff, name, power, volume, handleVolumeChange, changeSoundBank }) => /*#__PURE__*/
React.createElement("div", { className: "control" }, /*#__PURE__*/
React.createElement("h2", { id: "display" }, name), /*#__PURE__*/
React.createElement("button", { onClick: changeSoundBank }, "Change Sound Bank"), /*#__PURE__*/
React.createElement("input", { max: "1", min: "0", step: "0.01", type: "range", style: ColorSlider, value: volume, onChange: handleVolumeChange }), /*#__PURE__*/
React.createElement("h3", null, "Master Volume ", Math.round(volume * 100), "%"), /*#__PURE__*/
React.createElement("button", { id: "onoff", onClick: turnOnOff }, /*#__PURE__*/React.createElement("span", null, power ? "ON" : "OFF")), /*#__PURE__*/
React.createElement("p", null, "\xA9 Vladimir Jovanovi\u0107 :: DobarBREND 2022"));



const App = () => {
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(1);
  const [soundName, setSoundName] = React.useState("");
  const [soundType, setSoundType] = React.useState("heaterKit");
  const [sounds, setSounds] = React.useState(soundBanks[soundType]);

  const turnOnOff = () => {
    setPower(!power);
  };

  const handleVolumeChange = (event) =>
  setVolume(event.target.value);


  const pressKeyEffect = audio => {
    audio.parentElement.style.backgroundColor = "rgba(150, 150, 150, 0.7)";
    audio.parentElement.style.color = "#ffffff";
  };

  const pressKeyEffectOff = audio => {
    setTimeout(() => {
      audio.parentElement.style.backgroundColor = "rgba(100, 20, 20, 0.65)";
      audio.parentElement.style.color = "Gainsboro";
    }, 200);
  };

  const play = (key, sound) => {
    setSoundName(sound);
    const audio = document.getElementById(key);
    pressKeyEffect(audio);
    audio.currentTime = 0;
    audio.play();
    pressKeyEffectOff(audio);
  };

  const changeSoundBank = () => {
    setSoundName("");
    if (soundType === "heaterKit") {
      setSoundType("smoothPianoKit");
      setSounds(soundBanks.smoothPianoKit);
    } else {
      setSoundType("heaterKit");
      setSounds(soundBanks.heaterKit);
    }
  };

  const sliderVolume = () => {
    const audios = sounds.map(sound => document.getElementById(sound.key));audios.forEach(audio => {
      if (audio) {
        audio.volume = volume;
      }
    });
  };

  return /*#__PURE__*/(
    React.createElement("div", { id: "drum-machine" },
    sliderVolume(), /*#__PURE__*/
    React.createElement("div", { className: "wrapper" }, /*#__PURE__*/
    React.createElement("h1", null, "Drum Machine"), /*#__PURE__*/
    React.createElement("img", { src: "https://www.pngall.com/wp-content/uploads/2016/05/Drum-Sticks-PNG-HD.png" }), /*#__PURE__*/
    React.createElement(Keyboard, { power: power, play: play, sounds: sounds }), /*#__PURE__*/
    React.createElement(BankControl, { turnOnOff: turnOnOff, power: power, volume: volume, handleVolumeChange: handleVolumeChange, name: soundName || soundsName[soundType], changeSoundBank: changeSoundBank }))));



};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));
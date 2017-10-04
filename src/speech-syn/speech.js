const sayIt = (input, voiceURI = 'Google US English') => {
  const utterance = new SpeechSynthesisUtterance(input);
  const voices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = function() {
    if (!voices.length)
      sayIt(input, voiceURI);
  };
  if (voices.length) {
    utterance.voice = voices.filter(function(voice) { 
      return voice.voiceURI === voiceURI; 
    })[0];

    window.speechSynthesis.speak(utterance);
  }
};

const getVoiceOptions = () => {
  return [
    "Microsoft David Desktop - English (United States)",
    "Microsoft Zira Desktop - English (United States)",
    "Microsoft Sabina Desktop - Spanish (Mexico)",
    "Google Deutsch",
    "Google US English",
    "Google UK English Female",
    "Google UK English Male",
    "Google español",
    "Google español de Estados Unidos",
    "Google français",
    "Google हिन्दी",
    "Google Bahasa Indonesia",
    "Google italiano",
    "Google 日本語",
    "Google 한국의",
    "Google Nederlands",
    "Google polski",
    "Google português do Brasil",
    "Google русский",
    "Google 普通话（中国大陆）",
    "Google 粤語（香港）",
    "Google 國語（臺灣）",
  ];
};

// const getVoiceDetails = (voiceURI) => {
//   const voices = window.speechSynthesis.getVoices();
//   window.speechSynthesis.onvoiceschanged = function() {
//     if (!voices.length)
//       getVoiceDetails(voiceURI);
//   };
//   if (voices.length) {
//     return voices.filter(function(voice) { 
//       return voice.voiceURI === voiceURI; 
//     })[0];
//   }
// };
const levels = [
  {
    text: "Welcome! The sound is the same for everyone. Progress to personalize it based on your unique vibration.",
    input: `<p>Default sound activated. Level up to unlock customization!</p>`,
    value: function () { return null; },
    prefx: null,
    suffx: null,
    updateSo: function () {
      console.log("Default level - No changes.");
    }
  },
  {
    text: "Your **name** carries a vibrational frequency. We convert it into a numerical value to adjust the base note of the sound.",
    input: `
      <label for="name">Enter your name:</label>
      <input type="text" id="name">
    `,
    value: function () { return document.getElementById("name")?.value || ""; },
    prefx: '',
    suffx: '',
    updateSo: function () {
      let value = this.value();
      let nameValue = [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
      so.notaBase = 10 + (nameValue % 63);
    }
  },
  {
    text: "Your **height** affects resonance. Taller individuals may experience deeper tones.",
    input: `
      <label for="height">Enter your height (cm):</label>
      <input type="number" id="height">
    `,
    value: function () { return parseFloat(document.getElementById("height")?.value) || 0; },
    prefx: '',
    suffx: ' cm',
    updateSo: function () {
      let value = this.value();
      so.numeroDeOctavas = Math.max(1, Math.min(8, Math.floor(value / 30)));
    }
  },
  {
    text: "Your **weight** influences sound absorption. We adjust the duration accordingly.",
    input: `
      <label for="weight">Enter your weight (kg):</label>
      <input type="number" id="weight">
    `,
    value: function () { return parseFloat(document.getElementById("weight")?.value) || 0; },
    prefx: '',
    suffx: ' kg',
    updateSo: function () {
      let value = this.value();
      so.duracion = Math.max(10, Math.min(1000, value * 5));
    }
  },
  {
    text: "Colors have vibrational frequencies. Your **favorite color** influences the musical scale.",
    input: `
      <label for="color">Choose your favorite color:</label>
      <select id="color">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="purple">Purple</option>
      </select>
    `,
    value: function () { return document.getElementById("color")?.value || "major"; },
    prefx: '',
    suffx: '',
    updateSo: function () {
      let value = this.value();
      const colorToScale = { red: "minor", blue: "major", green: "pentatonic", yellow: "dorian", purple: "phrygian" };
      so.aroma = colorToScale[value.toLowerCase()] || "major";
    }
  },
  {
    text: "Your **mood** influences the complexity of the sound.",
    input: `
      <label for="mood">How do you feel?</label>
      <select id="mood">
        <option value="happy">Happy</option>
        <option value="calm">Calm</option>
        <option value="sad">Sad</option>
        <option value="angry">Angry</option>
      </select>
    `,
    value: function () { return document.getElementById("mood")?.value || "calm"; },
    prefx: '',
    suffx: '',
    updateSo: function () {
      let value = this.value();
      const moodMap = { happy: 6, calm: 4, sad: 3, angry: 2 };
      so.numNubes = moodMap[value.toLowerCase()] || 4;
    }
  },
  {
    text: "Each **element** has a sound profile. Choose yours!",
    input: `
      <label for="element">Select your element:</label>
      <select id="element">
        <option value="earth">Earth</option>
        <option value="water">Water</option>
        <option value="fire">Fire</option>
        <option value="air">Air</option>
        <option value="ether">Ether</option>
      </select>
    `,
    value: function () { return document.getElementById("element")?.value || "air"; },
    prefx: '',
    suffx: '',
    updateSo: function () {
      let value = this.value();
      const elementToVol = { fire: 1, water: 0.7, earth: 0.5, air: 0.8, ether: 0.9 };
      so.mainVol = elementToVol[value.toLowerCase()] || 0.8;
    }
  },
  {
    text: "Your **birthdate** holds a numerical vibration that determines silent pauses.",
    input: `
      <label for="birthdate">Enter your birthdate:</label>
      <input type="date" id="birthdate">
    `,
    value: function () { return document.getElementById("birthdate")?.value || ""; },
    prefx: '',
    suffx: '',
    updateSo: function () {
      let value = this.value();
      let birthSum = value.split("-").reduce((sum, num) => sum + parseInt(num || 0), 0);
      so.silencios = birthSum % 100;
    }
  },
  {
    text: "Your **zodiac sign** is linked to cosmic frequencies. We'll fine-tune the base note.",
    input: `
      <label for="zodiac">Choose your zodiac sign:</label>
      <select id="zodiac">
        <option value="aries">Aries</option>
        <option value="taurus">Taurus</option>
        <option value="gemini">Gemini</option>
        <option value="cancer">Cancer</option>
        <option value="leo">Leo</option>
        <option value="virgo">Virgo</option>
        <option value="libra">Libra</option>
        <option value="scorpio">Scorpio</option>
        <option value="sagittarius">Sagittarius</option>
        <option value="capricorn">Capricorn</option>
        <option value="aquarius">Aquarius</option>
        <option value="pisces">Pisces</option>
      </select>
    `,
    value: function () { return document.getElementById("zodiac")?.value || "aries"; },
    prefx: '',
    suffx: '',
    updateSo: function () {
      let value = this.value();
      const zodiacTuning = { aries: 45, taurus: 42, gemini: 48, cancer: 36, leo: 52 };
      so.notaBase = zodiacTuning[value.toLowerCase()] || so.notaBase;
    }
  },
  {
    text: "Time of day affects brainwave activity. Adjust your sound for energy or relaxation.",
    input: `
      <label for="timeOfDay">Select the time of day:</label>
      <select id="timeOfDay">
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="night">Night</option>
      </select>
    `,
    value: function () { return document.getElementById("timeOfDay")?.value || "afternoon"; },
    prefx: '',
    suffx: '',
    updateSo: function () {
      let value = this.value();
      so.mainVol *= value === "morning" ? 1.2 : value === "night" ? 0.8 : 1;
    }
  }
];
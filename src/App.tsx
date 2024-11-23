import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CircleButton from './CircleButton';
import CircleKnob from './CircleKnob';

function App() {
  const english = ["Object Oriented is a prototype-driven product studio", "by Giulio and Marie"];
  const french = ["Object Oriented est un studio de design produit guidé par le prototypage", "par Giulio et Marie"];
  const italian = ["Object Oriented è uno studio di design di prodotto guidato da prototipi", "da Giulio e Marie"];
  const symbols = ["💻🛠️", "🙂🙃"];
  const textArr = [english, french, italian, symbols];

  const [languageIndex, setLanguageIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const changeText = () => {
    setTextIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % textArr[languageIndex].length;
      const text = document.getElementById("text");
      text!.textContent = textArr[languageIndex][newIndex];
      return newIndex;
    });
  };  

  const changeLanguage = (value: number) => {
    const newLanguage = Math.round(value);
    if (newLanguage >= 0 && newLanguage < textArr.length) {
      setLanguageIndex(newLanguage);
      const text = document.getElementById("text");
      text!.textContent = textArr[newLanguage][textIndex];
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center gap-3 items-center bg-gray-100">
      <div className="flex justify-center gap-3 items-center">
        <CircleButton onClick={changeText} />
        <CircleKnob onChange={changeLanguage} />
      </div>
      <div id="text" className="text-blue-500 select-none">
        <h1>{textArr[languageIndex][0]}</h1>
      </div>
    </div>
  );
}

export default App;

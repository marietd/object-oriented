import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    return () => {
      document.body.style.overflow = ''; // Revert on cleanup
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-5 h-screen bg-gray-100">
      <div id="text" className="text-blue-500 select-none w-[90vw] h-16 flex items-center justify-center text-center">
        <h1 className="text-center">{textArr[languageIndex][0]}</h1>
      </div>
      <div className="flex justify-center gap-3 items-center">
        <CircleButton onClick={changeText} />
        <CircleKnob onChange={changeLanguage} />
      </div>
    </div>
  );
}

export default App;

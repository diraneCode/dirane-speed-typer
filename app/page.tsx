"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import WordDisplay from "./components/WordDisplay";
import InputField from "./components/InputField";
import CircularTimer from "./components/CircularTimer";
import Score from "./components/Score";
import FeedbackMessage from "./components/FeedbackMessage";
import GameOverCard from "./components/GameOverCard";
import Leaderboard from "./components/Leaderboard";
import useSound from "use-sound";
import { useSession } from "next-auth/react";
import { categorizedWords } from "./const/WORD";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const levels = [
  { name: "E", timeLimit: 10, wordsToPass: 5 },
  { name: "D", timeLimit: 9, wordsToPass: 10 },
  { name: "C", timeLimit: 8, wordsToPass: 15 },
  { name: "B", timeLimit: 7, wordsToPass: 20 },
  { name: "A", timeLimit: 6, wordsToPass: 25 },
];

const generateWord = (categorie: string) => {

  if(categorie == "Informatique"){
    const word = categorizedWords[0].words
    return word[Math.floor(Math.random() * word.length)];    
  }else if(categorie == "Sport"){
    const word = categorizedWords[1].words    
    return word[Math.floor(Math.random() * word.length)];    
  }else{
    const word = categorizedWords[2].words
    return word[Math.floor(Math.random() * word.length)];    
  }
};

export default function Home() {
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [firstWordTyped, setFirstWordTyped] = useState(false);

  const { data: session } = useSession();
  const gameOverCardRef = useRef(null); // Référence pour la capture d'écran

  const [playKeyPress] = useSound("/sounds/keypress.mp3");
  const [playTimerWarning] = useSound("/sounds/timer-warning.mp3", { volume: 0.5 });
  const [playGameOver] = useSound("/sounds/game-over.mp3");

  const [wordChoice, setWordChoice] = useState(false)
  const [wordChoiceSelect, setWordChoiceSelect] = useState<string>("")

  const startGame = useCallback(() => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(levels[0].timeLimit);
    setCurrentWord(generateWord(wordChoiceSelect));
    setLevel(0);
    setGameOver(false);
    setStartTime(Date.now());
    setWordsTyped(0);
    setFirstWordTyped(false);
  }, []);

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setInput("");
    playGameOver();
    setGameOver(true);
    if (session) {
      // Update leaderboard here
    }
  }, [playGameOver, session]);

  const checkWord = useCallback(() => {
    if (!firstWordTyped) setFirstWordTyped(true);
    if (input.toLowerCase() === currentWord.toLowerCase()) {
      setScore((prevScore) => prevScore + 1);
      setWordsTyped((prev) => prev + 1);
      setTimeLeft(levels[level].timeLimit);
      setCurrentWord(generateWord(wordChoiceSelect));
      setInput("");
      setFeedback(["Bravo!", "Super!", "Waouh!"][Math.floor(Math.random() * 3)]);

      if (score + 1 >= levels[level].wordsToPass && level < levels.length - 1) {
        setLevel((prev) => prev + 1);
      }
    } else {
      setFeedback([
        "Raté! 😞",
        "Oups! 😬",
        "Désolé! 😔",
        "Bravo! 🎉",
        "Bien joué! 👍",
        "Super! 👏",
        "Félicitations! 🥳",
        "Pas mal! 🤔",
        "À refaire! 🔄",
        "Continue comme ça! 💪",
        "Tu y es presque! 🤩",
        "Ça va mieux! 😊",
        "C'est presque parfait! 🌟",
        "Excellent! 🌈",
        "Incroyable! 😲"
      ][Math.floor(Math.random() * 3)]);
      setTimeLeft((prevTime) => Math.max(prevTime - 2, 0));
    }
  }, [input, currentWord, score, level, firstWordTyped]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft <= 3) {
          playTimerWarning();
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
  }, [timeLeft, isPlaying, endGame, playTimerWarning]);

  useEffect(() => {
    if (input.length === currentWord.length) {
      checkWord();
    }
  }, [input, currentWord, checkWord]);

  const handleInputChange = (value: string) => {
    setInput(value);
    playKeyPress();
  };

  const playGame = (categorie: string) => {
    setWordChoiceSelect(categorie)
    startGame()
  }

  // Capture d'écran avec l'API displayMedia
  const handleCaptureScreen = () => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((stream) => {
        // Ici, tu pourrais gérer le flux vidéo ou capturer l'écran
        // Par exemple, on peut arrêter le flux après un certain temps ou utiliser un autre processus
        const track = stream.getTracks()[0]; // Récupère la première piste vidéo
        track.stop(); // Arrête le flux après la capture
        console.log("Capture de l'écran réussie!");
      })
      .catch((err) => {
        console.error("Erreur lors de la capture de l'écran :", err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 p-4 overflow-hidden">
      <Navbar />
      <div className="relative w-full max-w-md">
        <div className="w-full h-full absolute -top-20 left-[40%]">
          <Image src={'/cochon.png'} alt="cochon" width={100} height={100} />
          <div className="w-20 p-5 bg-white/50"></div>
          <div className={`w-fit p-2 ${gameOver ? "bg-red-600/80" : "bg-white/50"} absolute top-2 left-20 rounded-t-2xl rounded-r-2xl`}>
            {!isPlaying ? gameOver ? <span className="text-lg text-white font-bold">Tu es trop nul🤣🤣</span> : <span className="text-lg text-white font-bold">Viens jouer 👋</span> : <AnimatePresence>
              {feedback && isPlaying && firstWordTyped && <FeedbackMessage key={feedback} message={feedback} />}
            </AnimatePresence>}
          </div>
        </div>
        {!showLeaderboard ? (
          <div className={`${gameOver ? "p-0 border-none" : "p-8"} rounded-xl backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 shadow-xl border border-opacity-20 border-white`}>
            {!gameOver && <h1 className="text-4xl font-bold text-white text-center mb-6">Dirane`s Typer</h1>}
            {!isPlaying && !gameOver ? (
              <div className="space-y-4">
                {wordChoice && (<div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white mb-6 text-center">Choisis une catégorie de mot</h2>
                  <Button onClick={() => playGame("Informatique")} className="w-full text-center text-white bg-pink-500 hover:bg-pink-600">Informatique</Button>
                  <Button onClick={() => playGame("Sport")} className="w-full text-center text-white bg-yellow-500 hover:bg-yellow-600">Sport</Button>
                  <Button onClick={() => playGame("Animé")} className="w-full text-center text-white bg-sky-500 hover:bg-sky-600">Animé</Button>
                  <Button onClick={() => setWordChoice(false)} className="w-full">Retour</Button>
                </div>)}
                {!wordChoice && (
                  <div className="space-y-4">
                    <button
                      // onClick={startGame}
                      onClick={() => setWordChoice(true)}
                      className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition-colors"
                    >
                      Jouer
                    </button>
                    <button
                      onClick={() => setShowLeaderboard(true)}
                      className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-semibold transition-colors"
                    >
                      Meilleur score
                    </button>
                    {!session && <div className="text-white text-center text-sm">Connecte toi pour partager ton score ☺️</div>}
                  </div>
                )}
              </div>
            ) : isPlaying ? (
              <>
                <WordDisplay word={currentWord} input={input} />
                <InputField value={input} onChange={handleInputChange} maxLength={currentWord.length} />
                <div className="flex justify-between items-center mt-4">
                  <Score score={score} />
                  <div className="text-2xl font-bold text-white">Niveau: {levels[level].name}</div>
                </div>
                <div className="mt-8">
                  <CircularTimer timeLeft={timeLeft} maxTime={levels[level].timeLimit} />
                </div>
              </>
            ) : (
              <div ref={gameOverCardRef}>
                <GameOverCard
                  score={score}
                  level={levels[level].name}
                  wordsPerMinute={Math.round((wordsTyped / ((Date.now() - startTime) / 60000)) * 100) / 100}
                  onRestart={startGame}
                  onShareWhatsApp={handleCaptureScreen}
                />
              </div>
            )}
          </div>
        ) : (
          <Leaderboard onBack={() => setShowLeaderboard(false)} />
        )}
      </div>
    </div>
  );
}

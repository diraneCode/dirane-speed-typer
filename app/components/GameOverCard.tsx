import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import ShowLeaderboard from "./ShowLeaderboard";
import { Button } from "@/components/ui/button";



type GameOverCardProps = {
  score: number;
  level: string;
  wordsPerMinute: number;
  onRestart: () => void;
  onShareWhatsApp: () => void;
};

export default function GameOverCard({ score, level, wordsPerMinute, onRestart, onShareWhatsApp }: GameOverCardProps) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      const saveScore = async () => {
        try {
          if (session) {
            const response = await fetch("/api/add-score", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: session.user?.email, nom: session.user?.name, image: session.user?.image, score }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error('API error:', errorData);
              throw new Error("Failed to save score");
            }

          }

        } catch (error) {
          console.error("Error saving score:", error);
        }
      };

      saveScore();
    }
  }, [session, score]);

  return (
    <motion.div
      id="game-over-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-8 text-center shadow-lg"
    >
      <h2 className="text-4xl font-bold text-white mb-6">Game Over!</h2>
      <div className="space-y-4 mb-6">
        <p className="text-2xl text-white">
          Score: <span className="font-bold">{score}</span>
        </p>
        <p className="text-2xl text-white">
          Niveau: <span className="font-bold">{level}</span>
        </p>
        <p className="text-2xl text-white">
          Mot par minute: <span className="font-bold">{wordsPerMinute}</span>
        </p>
      </div>
      <div className="space-y-4">
        <Button
          onClick={onRestart}
          className="w-full text-lg py-3 bg-white text-indigo-600 hover:bg-indigo-100 transition-colors duration-300"
        >
          Réessayer
        </Button>
        <Button
          onClick={onShareWhatsApp}
          className="w-full text-lg py-3 bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
        >
          Partager sur WhatsApp
        </Button>
        <ShowLeaderboard />

      </div>
    </motion.div>
  );
} 

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import * as Icon from 'react-icons/fa';
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";

type LeaderboardEntry = {
  email: string;
  nom: string;
  image: string;
  score: number;
};

export default function Leaderboard({ onBack }: { onBack: () => void }) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const { data: session } = useSession();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        setLoading(true)
      }
    };

    if (session) {
      fetchLeaderboard();
    }
  }, [session]);

  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-white mb-6">Meilleur score</h2>
      {session ? loading ? (
        <ul className="space-y-4 mb-6 max-h-52 overflow-scroll">
          {leaderboard.map((entry, index) => (
            <li key={index} className="flex justify-between items-center text-white">
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold">{index + 1} - </span>
                <div className="size-8 rounded-full bg-orange-300 overflow-hidden">
                  <Image src={entry.image} alt={entry.nom} width={100} height={100} className="w-full h-full" />
                </div>
                <span>{entry.nom}</span>
              </div>
              <span className="text-xl font-bold">{entry.score}</span>
            </li>
          ))}
        </ul>
      ) : <ul className="space-y-4 mb-6 max-h-40 overflow-scroll">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </ul> : (
        <div className="text-white mb-6">Connecte toi pour voir les meilleurs scores.</div>
      )}
      {!session && (
        <Button onClick={() => signIn("google")} className="w-full mb-4">
          <Icon.FaGoogle /> Connexion avec Google
        </Button>
      )}
      <Button onClick={onBack} className="w-full">
        Retour
      </Button>
    </div>
  );
}

import { useState } from "react";
import Leaderboard from "./Leaderboard";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { DialogHeader } from "../../components/ui/dialog";


export default function ShowLeaderboard(){
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    return(
        <Dialog>
          <DialogTrigger className="w-full py-2 px-4 bg-black hover:bg-black/80 rounded-md text-white font-semibold transition-colors">
              Meilleur score
          </DialogTrigger>
          <DialogContent className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 border-none">
            <DialogTitle></DialogTitle>
            <DialogHeader>
              <DialogDescription>
                <Leaderboard onBack={() => setShowLeaderboard(showLeaderboard)} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
    )
}
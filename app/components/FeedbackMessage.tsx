import { motion } from "framer-motion"

const feedbackColors = {
    "Bravo!": "bg-green-500",
    "Super!": "bg-blue-500",
    "Waouh!": "bg-purple-500",
    "Raté!": "bg-red-500",
    "Oups!": "bg-yellow-500",
    "Désolé!": "bg-orange-500",
    "Incroyable!": "bg-indigo-500",
    "Fantastique!": "bg-teal-500",
    "Extraordinaire!": "bg-cyan-500",
    "Formidable!": "bg-pink-500",
    "Joker!": "bg-red-600",
    "Dirane!": "bg-blue-600",
    "Époustouflant!": "bg-lime-500",
    "Magnifique!": "bg-amber-500",
    "Sensass!": "bg-fuchsia-500",
    "Bluffant!": "bg-violet-500",
    "Surprenant!": "bg-sky-500",
    "Joker! (Encore)": "bg-green-600",
    "Dirane! (Encore)": "bg-orange-600",
    "Épatant!": "bg-rose-500",
    "Éclatant!": "bg-emerald-500",
    "Stupéfiant!": "bg-gray-500",
    "Sensationnel!": "bg-lime-700",
    "Joker! (Toujours)": "bg-teal-600",
    "Dirane! (Toujours)": "bg-amber-600",
    "Inoubliable!": "bg-slate-500",
    "Splendide!": "bg-blue-700",
    "Radieux!": "bg-yellow-700",
    "Éclatant! (Encore)": "bg-rose-600",
    "Fulgurant!": "bg-green-700",
    "Fabuleux!": "bg-indigo-700",
    "Joker! (Jamais assez)": "bg-red-700",
    "Dirane! (Incontournable)": "bg-orange-700",
    "Dingue!": "bg-cyan-700",
    "Hallucinant!": "bg-violet-700",
    "Incomparable!": "bg-sky-700",
    "Héroïque!": "bg-fuchsia-700",
    "Épique!": "bg-purple-700",
  };

export default function FeedbackMessage({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className={`text-xl font-bold text-white px-1 py-1 rounded-t-2xl rounded-r-2xl ${feedbackColors[message as keyof typeof feedbackColors]}`}
    >
      {message}
    </motion.div>
  )
}


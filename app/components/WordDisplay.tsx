import { motion } from "framer-motion"

export default function WordDisplay({ word, input }: { word: string; input: string }) {
  return (
    <motion.div
      className="text-3xl font-bold text-center my-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      key={word}
    >
      {word.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={
            index < input.length
              ? input[index].toLowerCase() === char.toLowerCase()
                ? "text-green-400"
                : "text-red-400"
              : "text-white"
          }
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}


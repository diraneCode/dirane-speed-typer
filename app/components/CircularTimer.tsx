import { motion } from "framer-motion"

type CircularTimerProps = {
  timeLeft: number
  maxTime: number
}

export default function CircularTimer({ timeLeft, maxTime }: CircularTimerProps) {
  const progress = (timeLeft / maxTime) * 100
  const color = progress > 66 ? "#22c55e" : progress > 33 ? "#eab308" : "#ef4444"

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-300"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <motion.circle
          className="text-blue-600"
          strokeWidth="8"
          strokeDasharray={283}
          strokeDashoffset={283 - (283 * progress) / 100}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          initial={{ strokeDashoffset: 283 }}
          animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-3xl">
        {timeLeft}
      </div>
    </div>
  )
}


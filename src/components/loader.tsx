import { motion } from "framer-motion";

export default function OrbitingLoader() {
  return (
    <div className="flex">
      <motion.div
        className="flex"
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <motion.div
          className="mx-1 h-4 w-4 rounded-full bg-slate-900 dark:bg-white"
          animate={{ scale: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="mx-1 h-4 w-4 rounded-full bg-slate-900 dark:bg-white"
          animate={{ scale: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="mx-1 h-4 w-4 rounded-full bg-slate-900 dark:bg-white"
          animate={{ scale: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
    </div>
  );
}

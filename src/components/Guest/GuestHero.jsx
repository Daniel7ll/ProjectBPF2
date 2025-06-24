import { motion } from "framer-motion";

export default function GuestHero() {
  return (
    <section className="w-full min-h-screen bg-white flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-4 lg:px-24 overflow-hidden">

      {/* LEFT SIDE */}
      <motion.div
        className="flex flex-col justify-center items-start max-w-2xl h-full py-8"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p
          className="text-blue-600 font-semibold mb-5 bg-blue-100 inline-block px-3 py-1 rounded-full text-sm tracking-wide"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          POLITEKNIK CALTEX RIAU
        </motion.p>

        <motion.h1
          className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[55px] font-bold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Satu ide kecil hari ini bisa mengubah dunia esok.
          <br className="hidden sm:inline" />
          Mari mulai berdiskusi!
        </motion.h1>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-3 rounded-full">
            Mulai Diskusi
          </button>
        </motion.div>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        className="w-full lg:w-[50%] flex items-center justify-center"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.img
          src="/img/platform.png"
          alt="Illustration of discussion"
          className="object-contain w-full h-auto max-w-[700px]"
          initial={{ scale: 0.9, y: 60 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        />
      </motion.div>
    </section>
  );
}

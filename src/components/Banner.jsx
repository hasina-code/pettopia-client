"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, PawPrint, ShieldCheck } from "lucide-react";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-60 md:w-72 lg:w-96 h-60 md:h-72 lg:h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 md:w-96 lg:w-[500px] h-72 md:h-96 lg:h-[500px] bg-cyan-500/20 rounded-full blur-3xl"></div>

      {/* Floating Icons (hidden on mobile for performance) */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="hidden md:block absolute top-20 left-10 text-pink-400 opacity-20"
      >
        <PawPrint size={60} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="hidden md:block absolute bottom-20 right-16 text-cyan-400 opacity-20"
      >
        <PawPrint size={80} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 md:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left"
        >
          {/* Badge */}
          <span className="inline-block bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-pink-300">
            🐾 Trusted Pet Adoption Platform
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mt-5">
            Give a Pet a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
              Loving Home
            </span>
          </h1>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg mt-5 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Discover adorable pets waiting for a caring family. Start your
            adoption journey today and bring happiness into your life.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
            <Link
              href="/all-pets"
              className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:scale-105 transition px-6 py-3 sm:px-7 sm:py-4 rounded-2xl font-semibold shadow-2xl text-center"
            >
              Adopt Now
            </Link>

            <Link
              href="/all-pets"
              className="border border-white/20 hover:border-cyan-400 hover:bg-white/10 transition px-6 py-3 sm:px-7 sm:py-4 rounded-2xl font-semibold text-center"
            >
              Explore Pets
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-4 sm:p-5 text-center"
            >
              <Heart className="text-pink-400 mx-auto mb-2" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold">1200+</h3>
              <p className="text-slate-300 text-xs sm:text-sm">Happy Adoptions</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-4 sm:p-5 text-center"
            >
              <PawPrint className="text-cyan-400 mx-auto mb-2" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold">350+</h3>
              <p className="text-slate-300 text-xs sm:text-sm">Pets Available</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-4 sm:p-5 text-center"
            >
              <ShieldCheck className="text-emerald-400 mx-auto mb-2" size={28} />
              <h3 className="text-xl sm:text-2xl font-bold">98%</h3>
              <p className="text-slate-300 text-xs sm:text-sm">Trusted Platform</p>
            </motion.div>

          </div>
        </motion.div>

        {/* RIGHT IMAGES */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] flex justify-center items-center"
        >

          {/* Circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[250px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] border border-dashed border-cyan-400/20 rounded-full"
          />

          {/* Main Image */}
          <motion.img
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            src="	https://cdn.pixabay.com/photo/2022/01/09/05/37/rabbit-6925284_1280.jpg"
            className="absolute z-20 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[320px] h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] object-cover rounded-[30px] border-2 border-white/10 shadow-2xl"
            alt="dog"
          />

          {/* Left Image (hide on small mobile) */}
          <motion.img
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            src="https://cdn.pixabay.com/photo/2023/05/13/19/20/dog-7991199_1280.jpg"
            className="hidden sm:block absolute left-0 top-10 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-[180px] sm:h-[220px] md:h-[240px] lg:h-[260px] object-cover rounded-[25px] rotate-[-8deg] border border-pink-400/20 shadow-xl"
            alt="cat"
          />

          {/* Right Image (hide on mobile) */}
          <motion.img
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            src="https://cdn.pixabay.com/photo/2022/06/19/08/04/kitten-7271313_1280.jpg"
            className="hidden sm:block absolute right-0 bottom-10 w-[150px] sm:w-[170px] md:w-[200px] lg:w-[220px] h-[190px] sm:h-[230px] md:h-[260px] lg:h-[280px] object-cover rounded-[25px] rotate-[8deg] border border-cyan-400/20 shadow-xl"
            alt="pet"
          />

          {/* Badges (hidden on very small screens) */}
          <div className="hidden md:block absolute top-0 left-10 bg-white text-black px-4 py-2 rounded-xl text-sm shadow-xl">
            🐶 1000+ Pets Adopted
          </div>

          <div className="hidden md:block absolute bottom-0 right-10 bg-white text-black px-4 py-2 rounded-xl text-sm shadow-xl">
            ❤️ Find Your Best Friend
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogoAnimation } from './components/CornerLogo';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const lineReveal = {
  hidden: { y: '105%', opacity: 0 },
  visible: { y: '0%', opacity: 1 },
};

// Full subcopy for desktop (one line under title)
const taglineOneLine = "Unlocking potential through curated retail and leisure spaces.";
// Split for mobile (line-by-line reveal, current position)
const taglineLines = [
  'Unlocking potential through',
  'curated retail and leisure spaces.'
];

function App() {
  const [revealed, setRevealed] = useState(false);

  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center md:justify-between py-10 bg-black text-white max-sm:justify-center">
      <LogoAnimation onBreak={() => setRevealed(true)} />

      <div></div>
      <section className="md:flex-1 flex flex-col items-center justify-center text-center max-w-[90vw] mt-12 2xl:mt-20 3xl:mt-24">
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl xl:text-[7.2rem] 2xl:text-[7.5rem] 3xl:text-10xl font-semibold leading-[1.05] tracking-[0] m-0 mb-8">
          {['Shaping spaces.', 'Satisfying outcomes.'].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.2em] -mb-[0.2em]">
              <motion.span
                className="block"
                variants={lineReveal}
                initial="hidden"
                animate={revealed ? 'visible' : 'hidden'}
                transition={{
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3 + i * 0.1,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Desktop: subcopy in one line directly under title */}
        <div className="hidden md:block overflow-hidden mb-6 max-w-3xl mx-auto">
          <motion.span
            className="block text-base md:text-lg lg:text-[24px] 3xl:text-[26px] font-sans font-light leading-tight text-white text-center"
            variants={lineReveal}
            initial="hidden"
            animate={revealed ? 'visible' : 'hidden'}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5,
            }}
          >
            {taglineOneLine}
          </motion.span>
        </div>

        <motion.div
          className="flex justify-center mt-2 mb-10 md:mt-5 gap-4"
          variants={fadeUp}
          initial="hidden"
          animate={revealed ? 'visible' : 'hidden'}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.44 }}
        >
          <a
            href="mailto:info@shapeandsate.com"
            className="inline-block px-5 md:px-10 py-1 md:py-2 font-sans text-base md:text-lg lg:text-[22px] 3xl:text-[24px] text-black no-underline rounded-full border-none cursor-pointer transition-color hover:bg-white duration-200 hover:-translate-y-0.5 bg-purple"
          >
            Let's Talk
          </a>
          <a
            href="https://www.rightmove.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 md:px-10 py-1 md:py-2 font-sans text-base md:text-lg lg:text-[22px] 3xl:text-[24px] text-black no-underline rounded-full border-none cursor-pointer transition-color hover:bg-white duration-200 hover:-translate-y-0.5 bg-blue"
          >
            View Properties
          </a>
        </motion.div>
      </section>

      {/* Tagline (mobile only): line-by-line overflow-hidden reveal, keep current position */}
      <div className="md:hidden mx-12 text-center text-base max-w-md font-sans font-light leading-tight text-white">
        {taglineLines.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.2em] -mb-[0.2em]">
            <motion.span
              className="block"
              variants={lineReveal}
              initial="hidden"
              animate={revealed ? 'visible' : 'hidden'}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.56 + i * 0.09,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </div>
    </main>
  );
}

export default App;

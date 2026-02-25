import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface LogoAnimationProps {
  onBreak?: () => void;
}

export function LogoAnimation({ onBreak }: LogoAnimationProps) {
  const [settled, setSettled] = useState(false);
  const containerControls = useAnimation();
  const shapeControls = useAnimation();
  const sateControls = useAnimation();
  const shapeRef = useRef<HTMLDivElement>(null);
  const sateRef = useRef<HTMLDivElement>(null);
  const onBreakRef = useRef(onBreak);
  useLayoutEffect(() => {
    onBreakRef.current = onBreak;
  });

  useEffect(() => {
    async function run() {
      // Phase 1: scale the combined mark up as one unit
      await containerControls.start({
        scale: 1,
        transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
      });

      await new Promise<void>((r) => setTimeout(r, 280));
      onBreakRef.current?.();

      // Phase 2: both refs are at identical positions (same inset-0 container),
      // so each flies from the same origin to its respective corner.
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const pad = vw >= 768 ? 24 : 16;

      const sr = shapeRef.current!.getBoundingClientRect();
      const ar = sateRef.current!.getBoundingClientRect();

      await Promise.all([
        shapeControls.start({
          x: vw - pad - sr.width - sr.left,
          y: pad - sr.top,
          transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
        }),
        sateControls.start({
          x: pad - ar.left,
          y: vh - pad - ar.height - ar.top,
          transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
        }),
      ]);

      // Blink-free swap: settled imgs become visible in the same render
      // tick as the animation container is hidden.
      setSettled(true);
    }

    run();
  }, [containerControls, shapeControls, sateControls]);

  return (
    <>
      {/* Always in DOM so images are pre-loaded. Invisible until settled. */}
      <img
        src="/SHAPE.svg"
        alt="SHAPE"
        className={`fixed top-4 right-4 md:top-6 md:right-6 block w-[30vw] md:w-[18vw] h-auto pointer-events-none z-50 ${settled ? '' : 'invisible'}`}
        aria-hidden
      />
      <img
        src="/&SATE.svg"
        alt="SATE"
        className={`fixed bottom-4 left-4 md:bottom-6 md:left-6 block w-[30vw] md:w-[18vw] h-auto pointer-events-none z-50 ${settled ? '' : 'invisible'}`}
        aria-hidden
      />

      {/* Animation — hidden after settling */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 flex items-center justify-center ${settled ? 'invisible' : ''}`}
        aria-hidden
      >
        {/* Container scales both logos as one combined mark */}
        <motion.div
          animate={containerControls}
          initial={{ scale: 0.3 }}
          className="relative w-[30vw] md:w-[18vw] aspect-[357/462]"
        >
          {/* Both divs fill the container identically — perfect overlap */}
          <motion.div
            ref={shapeRef}
            animate={shapeControls}
            className="absolute inset-0"
          >
            <img src="/SHAPE.svg" alt="" className="w-full h-full" />
          </motion.div>
          <motion.div
            ref={sateRef}
            animate={sateControls}
            className="absolute inset-0"
          >
            <img src="/&SATE.svg" alt="" className="w-full h-full" />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

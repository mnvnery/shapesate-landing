import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface LoaderProps {
  onComplete?: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const shapeControls = useAnimation();
  const sateControls = useAnimation();
  const shapeRef = useRef<HTMLDivElement>(null);
  const sateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function runAnimation() {
      // Phase 1: appear + scale up together from center
      await Promise.all([
        shapeControls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        }),
        sateControls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        }),
      ]);

      if (cancelled) return;

      // Brief hold so the complete logo reads
      await new Promise<void>((r) => setTimeout(r, 280));

      if (cancelled) return;

      // Phase 2: measure actual on-screen positions then fly to corners
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const pad = vw >= 768 ? 24 : 16; // matches CornerLogo: top-4/md:top-6 etc.

      const shapeEl = shapeRef.current;
      const sateEl = sateRef.current;

      if (shapeEl && sateEl) {
        const sr = shapeEl.getBoundingClientRect();
        const ar = sateEl.getBoundingClientRect();

        // SHAPE → top-right corner
        const shapeX = vw - pad - sr.width - sr.left;
        const shapeY = pad - sr.top;

        // &SATE → bottom-left corner
        const sateX = pad - ar.left;
        const sateY = vh - pad - ar.height - ar.top;

        await Promise.all([
          shapeControls.start({
            x: shapeX,
            y: shapeY,
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }),
          sateControls.start({
            x: sateX,
            y: sateY,
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }),
        ]);
      }

      if (!cancelled) onComplete?.();
    }

    runAnimation();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stacked as one logo at center */}
      <div className="flex flex-col items-center">
        <motion.div
          ref={shapeRef}
          animate={shapeControls}
          initial={{ opacity: 0, scale: 0.45 }}
        >
          <img
            src="/SHAPE.svg"
            alt="SHAPE"
            className="block w-[30vw] md:w-[18vw] max-h-[40vh] h-auto"
          />
        </motion.div>
        <motion.div
          ref={sateRef}
          animate={sateControls}
          initial={{ opacity: 0, scale: 0.45 }}
        >
          <img
            src="/&SATE.svg"
            alt="SATE"
            className="block w-[30vw] md:w-[18vw] max-h-[40vh] h-auto"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

import { useState } from 'react';
import { LogoAnimation } from '../components/CornerLogo';

type Colourway = 'dark' | 'light';

export function LogoOnlyPage() {
  const [colourway, setColourway] = useState<Colourway>('dark');
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div
      className="min-h-[100dvh] w-full relative"
      data-colourway={colourway}
      style={{
        backgroundColor: colourway === 'dark' ? '#000' : '#fff',
      }}
    >
      {/* Logo animation only — no page content */}
      <div
        className={colourway === 'light' ? '[&_img]:invert' : ''}
        style={colourway === 'light' ? { color: '#000' } : undefined}
      >
        <LogoAnimation key={replayKey} onBreak={() => {}} />
      </div>

      {/* Minimal controls for recording: replay + colourway. Keep small so you can crop them out or hide. */}
      <div
        className="hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-4 px-4 py-2 rounded-full bg-black/60 text-white text-sm font-sans"
        aria-hidden
      >
        <button
          type="button"
          onClick={() => setReplayKey((k) => k + 1)}
          className="px-3 py-1 rounded hover:bg-white/20 transition-colors"
        >
          Replay
        </button>
        <span className="text-white/70">Colourway:</span>
        <button
          type="button"
          onClick={() => setColourway('dark')}
          className={`px-3 py-1 rounded transition-colors ${colourway === 'dark' ? 'bg-white/30' : 'hover:bg-white/20'}`}
        >
          Dark
        </button>
        <button
          type="button"
          onClick={() => setColourway('light')}
          className={`px-3 py-1 rounded transition-colors ${colourway === 'light' ? 'bg-white/30' : 'hover:bg-white/20'}`}
        >
          Light
        </button>
      </div>
    </div>
  );
}

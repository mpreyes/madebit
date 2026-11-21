import { useEffect } from 'react';
import { sfx } from '../sound';

// Shown when someone lands here after confirming their email (Kit redirects to ?subscribed=1).
export default function WelcomeWindow({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    sfx.paper();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); onClose(); } };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  return (
    <div className="letter-backdrop welcome-backdrop" onClick={onClose}>
      <div className="letter-win" role="dialog" aria-modal="true" aria-label="You're subscribed" onClick={(e) => e.stopPropagation()}>
        <div className="letter-bar">
          <span>youre_in.txt</span>
          <button onClick={onClose} aria-label="Close">X</button>
        </div>
        <div className="letter-body">
          <p className="welcome-big">YOU'RE IN 💌</p>
          <p>thank you for subscribing, it genuinely means a lot. you'll hear new music before anyone else, plus behind the scenes stuff and the occasional letter from me.</p>
          <p>psst: while you're here, there's a secret song hidden somewhere on this site. good luck.</p>
          <p className="letter-sign">xo, madelyn</p>
        </div>
        <div className="letter-foot">
          <button className="btn-solid" onClick={onClose}>START EXPLORING &gt;</button>
        </div>
      </div>
    </div>
  );
}

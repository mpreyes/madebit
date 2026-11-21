import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { KIT_FORM_ACTION } from '../../data';
import LetterWindow from '../LetterWindow';

type Status = 'idle' | 'sending' | 'sent';

export default function MailboxScreen() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const email = useRef<HTMLInputElement>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch(KIT_FORM_ACTION, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
    } catch {
      // If Kit blocks the in-page request, fall back to a normal form post in a new tab.
      setStatus('idle');
      form.submit();
    }
  };

  return (
    <div className="screen-pad mailbox" style={{ position: 'relative' }}>
      <button className={`envelope-btn ${open ? 'open' : ''}`} onClick={() => setOpen(true)} aria-label="Open the letter">
        <span className="envelope" aria-hidden="true" />
        <span className="envelope-hint">open me</span>
      </button>
      <h2 className="screen-heading big mint">MAILBOX</h2>
      <p className="screen-copy">I write letters sometimes: new music first, behind the scenes, random thoughts. Want one?</p>
      {status === 'sent' ? (
        <p className="screen-copy mail-sent">LETTER'S ON ITS WAY. Check your inbox to confirm.</p>
      ) : (
        <form action={KIT_FORM_ACTION} method="post" target="_blank" className="mail-form" onSubmit={submit}>
          <label htmlFor="mail-email" className="eyebrow">EMAIL</label>
          <div className="mail-row">
            <input ref={email} id="mail-email" type="email" name="email_address" required placeholder="you@email.com" autoComplete="email" />
            <button type="submit" className="btn-solid" disabled={status === 'sending'}>
              {status === 'sending' ? 'SENDING…' : 'SEND ME MAIL'}
            </button>
          </div>
        </form>
      )}
      {open && <LetterWindow onClose={() => setOpen(false)} onSignUp={() => { setOpen(false); email.current?.focus(); }} />}
    </div>
  );
}

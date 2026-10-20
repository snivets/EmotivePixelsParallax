import '../styles/scroll-hint-bouncer.css'

export function ScrollHinter() {
  return (
    <div className="bounce-container" aria-hidden="true">
      <div className="bounce-icon">⌄</div>
    </div>
  );
}
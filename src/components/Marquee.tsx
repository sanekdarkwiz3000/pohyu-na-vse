const words = [
  "POHYU HA BCE",
  "3× Battle Cup Champions",
  "Risen from the ashes",
  "EST. 2026",
  "GG WP",
];

function Row() {
  return (
    <div className="marquee-row">
      {words.map((word) => (
        <span key={word}>
          {word}
          <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </div>
  );
}

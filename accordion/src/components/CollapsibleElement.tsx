export function CollapsibleElement({
  title,
  text,
  showElement,
  toggleCollapsibleState,
}: {
  title: string;
  text: string;
  showElement: boolean;
  toggleCollapsibleState: (el: number) => void;
}) {
  return (
    <div className="outerDiv">
      <h2 onClick={() => toggleCollapsibleState(1)} className="title">
        {title}
      </h2>
      {showElement && (
        <div>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}

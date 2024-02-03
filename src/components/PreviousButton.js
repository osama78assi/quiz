function PreviousButton({ curQuestion, onPrev }) {
  return (
    <button
      className="btn btn-add"
      disabled={curQuestion === 0}
      onClick={() => onPrev({ type: "prev" })}
    >
      Previous
    </button>
  );
}

export default PreviousButton;

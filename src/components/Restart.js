function Restart({onRestart}) {
  return (
    <button className="btn btn-ui" onClick={() => onRestart({type: "restart"})}>
      Restart
    </button>
  )
}

export default Restart

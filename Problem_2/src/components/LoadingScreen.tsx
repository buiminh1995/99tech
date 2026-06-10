function LoadingScreen() {
  return (
    <div className="swap-card-container">
      <div className="swap-card">
        <div className="loading-screen">
          <div className="spinner" />
            <h2 className="text-2xl text-white font-mono">Swapping...</h2>
            <p className="text-white">Your transaction is being confirmed</p>
          </div>
      </div>
    </div>
  );
}

export default LoadingScreen
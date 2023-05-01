function runMemoryMeasurements() {
    const interval = -Math.log(Math.random()) * 5 * 60 * 1000;
    console.log(`Next measurement in ${Math.round(interval / 1000)} seconds.`);
    setTimeout(measureMemory, interval);
  }
  
  async function measureMemory() {
    const memorySample = await performance.measureUserAgentSpecificMemory();
    console.log(memorySample);
    runMemoryMeasurements();
  }
  
  if (crossOriginIsolated) {
    runMemoryMeasurements();
  }
  
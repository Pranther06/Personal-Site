/* ============================================================
   DEVICE CAPABILITY DETECTION
   Runs instantly (before any big model download) to decide
   whether the in-browser LLM can run on this device.
   Checks: WebGPU support + an actual adapter + rough RAM.
   ============================================================ */

/**
 * @returns {Promise<{capable: boolean, reason: string, details: object}>}
 */
export async function checkLLMCapability() {
  const details = {
    hasWebGPU: false,
    hasAdapter: false,
    deviceMemory: navigator.deviceMemory || null, // GB (approx), Chromium-only
    cores: navigator.hardwareConcurrency || null,
  };

  // 1) WebGPU API present?
  if (!("gpu" in navigator)) {
    return { capable: false, reason: "This browser doesn't support WebGPU (needed to run the AI locally).", details };
  }
  details.hasWebGPU = true;

  // 2) Can we actually get a GPU adapter?
  try {
    const adapter = await navigator.gpu.requestAdapter();
    details.hasAdapter = !!adapter;
    if (!adapter) {
      return { capable: false, reason: "No compatible GPU adapter available for WebGPU.", details };
    }
  } catch (e) {
    return { capable: false, reason: "WebGPU is present but failed to initialize.", details };
  }

  // 3) Rough RAM check (only when the browser reports it).
  //    deviceMemory maxes out at 8 and is coarse; treat <4 as too low.
  if (details.deviceMemory != null && details.deviceMemory < 4) {
    return { capable: false, reason: "This device may not have enough memory to run the AI smoothly.", details };
  }

  return { capable: true, reason: "Device supports in-browser AI.", details };
}

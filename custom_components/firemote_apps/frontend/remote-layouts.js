// Base sizes in pixels, shared by masonry and Sections dashboard sizing.
export const remoteDimensions = Object.freeze({
  __proto__: null,
  AF1: [193.97, 588.38],
  AF2: [193.97, 634.08],
  AF3: [193.97, 657.14],
  AF4: [193.97, 715.94],
  AF5: [193.97, 772.94],
  AF6: [193.97, 750.45],
  AFJTV: [193.97, 873.02],
  AFXF2: [193.97, 873.02],
  AR1: [184, 747.5],
  AR2: [184, 597],
  AR3: [184, 737],
  CC1: [203.36, 696.66],
  CC2: [203.36, 696.66],
  CC3: [203.36, 696.66],
  HO1: [193.97, 726.39],
  HO2: [193.97, 726.39],
  HO3: [193.97, 902.83],
  HO4: [193.97, 902.83],
  NS1: [137.97, 681.98],
  NS2: [137.97, 681.98],
  ON1: [137.97, 726.39],
  ON2: [137.97, 726.39],
  RVRP: [183.8, 680.56],
  RVR: [183.8, 680.56],
  RSR: [183.8, 680.56],
  RHR: [183.8, 652.56],
  RWR: [183.8, 652.56],
  RTR: [202.02, 680.38],
  XM1: [193.97, 793.98],
  XM2: [193.97, 793.98],
});

export function calculateLayoutCellHeight(height, scale) {
  const gapPixels = (height / 56) * 8 - 24;
  return Math.trunc(((height - gapPixels) / 56) * (scale / 100) * 100) / 100;
}

export function calculateLayoutCellWidth(width, scale) {
  const medianCellWidth = 104;
  const gapPixels = (width / medianCellWidth) * 8 - 24;
  return Math.ceil(((width - gapPixels) / medianCellWidth) * (scale / 100));
}

export function calculateMasonryViewHeight(height, scale) {
  return Math.ceil((height / 50) * (scale / 100));
}

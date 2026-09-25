import React, { useMemo } from "react";
import qrcode from "qrcode-generator";

type Props = { value: string; className?: string; color?: string };

/** Vector QR code with rounded finder patterns, so it stays sharp in the printed PDF. */
export default function QrCode({ value, className, color = "#2e2e2e" }: Props) {
  const { size, modules } = useMemo(() => {
    const qr = qrcode(0, "M");
    qr.addData(value);
    qr.make();
    return { size: qr.getModuleCount(), modules: qr };
  }, [value]);

  // the three 7x7 corner squares are drawn separately as rounded shapes
  const inFinder = (row: number, col: number) =>
    (row < 7 && col < 7) || (row < 7 && col >= size - 7) || (row >= size - 7 && col < 7);

  let dots = "";
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!inFinder(row, col) && modules.isDark(row, col)) dots += `M${col + 0.08} ${row + 0.08}h0.84v0.84h-0.84z`;
    }
  }

  const finders = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7],
  ];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} role="img" aria-label={value} shapeRendering="geometricPrecision">
      <path d={dots} fill={color} />
      {finders.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x + 0.5} y={y + 0.5} width={6} height={6} rx={1.9} fill="none" stroke={color} strokeWidth={1} />
          <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.9} fill={color} />
        </g>
      ))}
    </svg>
  );
}

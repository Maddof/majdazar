import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "~/components/ui/button";

const FALLBACK_ITEMS = [
  "Prize 1",
  "Prize 2",
  "Prize 3",
  "Prize 4",
  "Prize 5",
  "Prize 6",
  "Prize 7",
  "Prize 8",
  "Prize 9",
  "Prize 10",
  "Prize 11",
  "Prize 12",
  "Prize 13",
];

const SIZE = 400;

function generateWheelColors(count: number): string[] {
  const base = { r: 0xd0, g: 0xe6, b: 0xff };
  const maxLift = 0.5; // how much to lift towards white (1.0 would be pure white)

  return Array.from({ length: count }, (_, index) => {
    const t = count > 1 ? (index / (count - 1)) * maxLift : 0;
    const r = Math.round(base.r + (255 - base.r) * t);
    const g = Math.round(base.g + (255 - base.g) * t);
    const b = Math.round(base.b + (255 - base.b) * t);
    return `rgb(${r} ${g} ${b})`;
  });
}

export function SpinWheel({
  items,
  onResultChange,
}: {
  items?: string[];
  onResultChange?: (result: string | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const angleRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const wheelItems = items && items.length > 0 ? items : FALLBACK_ITEMS;
  const numSegments = wheelItems.length;
  const arc = (2 * Math.PI) / numSegments;
  const colors = useMemo(() => generateWheelColors(numSegments), [numSegments]);

  useEffect(() => {
    onResultChange?.(result);
  }, [onResultChange, result]);

  // Drag state
  const dragRef = useRef<{
    active: boolean;
    lastAngle: number; // angle of pointer relative to wheel center at last event
    lastTime: number;
    velocity: number; // radians/ms
  }>({ active: false, lastAngle: 0, lastTime: 0, velocity: 0 });

  const getPointerAngle = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    return Math.atan2(clientY - cy, clientX - cx);
  };

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (spinning) return;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const pa = getPointerAngle(e.nativeEvent as MouseEvent | TouchEvent);
    dragRef.current = {
      active: true,
      lastAngle: pa,
      lastTime: performance.now(),
      velocity: 0,
    };
    setResult(null);
  };

  const onDragMove = (e: MouseEvent | TouchEvent) => {
    if (!dragRef.current.active) return;
    e.preventDefault();
    const now = performance.now();
    const pa = getPointerAngle(e);
    const delta = pa - dragRef.current.lastAngle;
    // Wrap delta to [-π, π] to handle 0/2π boundary
    const wrapped =
      delta > Math.PI
        ? delta - 2 * Math.PI
        : delta < -Math.PI
          ? delta + 2 * Math.PI
          : delta;
    const dt = now - dragRef.current.lastTime;
    dragRef.current.velocity = dt > 0 ? (wrapped / dt) * 1.5 : 0;
    dragRef.current.lastAngle = pa;
    dragRef.current.lastTime = now;
    angleRef.current += wrapped;
    draw(angleRef.current);
  };

  const onDragEnd = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    const vel = dragRef.current.velocity; // rad/ms
    // if (Math.abs(vel) < 0.0003) return; // too slow, just stop
    // Fling: animate with friction
    const friction = 0.996; // per ms
    let v = vel;
    let lastTime = performance.now();

    const fling = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      v *= Math.pow(friction, dt);
      angleRef.current += v * dt;
      draw(angleRef.current);
      if (Math.abs(v) > 0.0002) {
        rafRef.current = requestAnimationFrame(fling);
      } else {
        // Settle — resolve winner
        const final =
          ((angleRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        angleRef.current = final;
        const offset =
          (((-Math.PI / 2 - final) % (2 * Math.PI)) + 2 * Math.PI) %
          (2 * Math.PI);
        const index = Math.floor(offset / arc) % numSegments;
        setResult(wheelItems[index]);
      }
    };
    rafRef.current = requestAnimationFrame(fling);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleMove = (e: MouseEvent | TouchEvent) => onDragMove(e);
    const handleEnd = () => onDragEnd();
    window.addEventListener("mousemove", handleMove, { passive: false });
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning]);

  const draw = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const r = cx - 8;

    ctx.clearRect(0, 0, SIZE, SIZE);

    for (let i = 0; i < numSegments; i++) {
      const start = angle + i * arc;
      const end = start + arc;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();
      ctx.strokeStyle = "#232d37";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + arc / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#111";
      ctx.font = "bold 16px system-ui, sans-serif";
      ctx.fillText(wheelItems[i], r - 12, 5);
      ctx.restore();
    }

    // Center hub
    ctx.beginPath();
    ctx.arc(cx, cy, 16, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#232d37";
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  useEffect(() => {
    draw(angleRef.current);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const totalRotation =
      (5 + Math.floor(Math.random() * 5)) * 2 * Math.PI +
      Math.random() * 2 * Math.PI;
    const startAngle = angleRef.current;
    const targetAngle = startAngle + totalRotation;
    const duration = 4000;
    const t0 = performance.now();

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

    const tick = (now: number) => {
      const t = Math.min((now - t0) / duration, 1);
      const current = startAngle + totalRotation * easeOut(t);
      angleRef.current = current;
      draw(current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        const final =
          ((targetAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        angleRef.current = final;
        // Pointer is at the top (angle -π/2). Find which segment is there.
        const offset =
          (((-Math.PI / 2 - final) % (2 * Math.PI)) + 2 * Math.PI) %
          (2 * Math.PI);
        const index = Math.floor(offset / arc) % numSegments;
        setResult(wheelItems[index]);
        setSpinning(false);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  return (
    <div className="hidden flex-col items-center gap-6 py-10 md:flex">
      <div className="relative inline-block">
        {/* Drag hint — top-left of wheel */}
        <div className="absolute top-0 left-0 z-10 flex -translate-x-1/5 -translate-y-1/5 flex-col items-end gap-1">
          <p className="max-w-30 -translate-x-2 translate-y-4 -rotate-45 text-center text-sm font-medium tracking-wide uppercase">
            Drag or click to spin
          </p>
          {/* Curved arrow following the wheel's edge */}
          <svg
            width="70"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-foreground"
          >
            {/* Arc from left edge to top edge, curving clockwise along the wheel */}
            <path
              d="M 4 64 A 60 60 0 0 1 64 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Arrowhead at (64,4) pointing right (CW tangent direction) */}
            <polyline
              points="57,0 64,4 57,8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
        {/* Pointer at 12 o'clock */}
        <div
          className="absolute top-3 left-1/2 z-10 -translate-x-1/2 -translate-y-full"
          style={{
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "28px solid #232d37",
          }}
        />
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className="block cursor-grab rounded-full shadow-md active:cursor-grabbing"
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
        />
        <Button
          onClick={spin}
          disabled={spinning || dragRef.current.active}
          size="lg"
          className="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
        >
          {spinning ? "Spinning..." : "Spin"}
        </Button>
      </div>
    </div>
  );
}

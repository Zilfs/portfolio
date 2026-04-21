"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  SiBootstrap,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiLaravel,
  SiGo,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiPostman,
} from "react-icons/si";

// ─── Canvas constants ─────────────────────────────────────────────────────────
const VB_W = 860;
const VB_H = 920;
const BOX = 48;
const PILL_W = 134;
const PILL_H = 34;
const ROOT = { x: 90, y: 460 };
const CAT_X = 270;
const ICON_X = 480;

interface Item {
  id: string;
  label: string;
  note: string;
  Icon: React.ElementType;
  iconColor: string;
  y: number;
}
interface Branch {
  id: string;
  label: string;
  color: string;
  catY: number;
  items: Item[];
}

const BRANCHES: Branch[] = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#3b82f6",
    catY: 180,
    items: [
      {
        id: "bootstrap",
        label: "Bootstrap",
        note: "CSS Framework",
        Icon: SiBootstrap,
        iconColor: "#7952b3",
        y: 70,
      },
      {
        id: "tailwind",
        label: "Tailwind CSS",
        note: "Utility-First CSS",
        Icon: SiTailwindcss,
        iconColor: "#38bdf8",
        y: 165,
      },
      {
        id: "react",
        label: "React.js",
        note: "UI Library",
        Icon: SiReact,
        iconColor: "#61dafb",
        y: 260,
      },
      {
        id: "nextjs",
        label: "Next.js",
        note: "React Framework",
        Icon: SiNextdotjs,
        iconColor: "#e2e8f0",
        y: 355,
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#f97316",
    catY: 460,
    items: [
      {
        id: "laravel",
        label: "Laravel",
        note: "PHP Framework",
        Icon: SiLaravel,
        iconColor: "#ff2d20",
        y: 430,
      },
      {
        id: "golang",
        label: "Golang",
        note: "Systems Language",
        Icon: SiGo,
        iconColor: "#00add8",
        y: 520,
      },
    ],
  },
  {
    id: "database",
    label: "Database",
    color: "#22c55e",
    catY: 645,
    items: [
      {
        id: "postgresql",
        label: "PostgreSQL",
        note: "Relational DB",
        Icon: SiPostgresql,
        iconColor: "#336791",
        y: 615,
      },
      {
        id: "mysql",
        label: "MySQL",
        note: "Relational DB",
        Icon: SiMysql,
        iconColor: "#4479a1",
        y: 705,
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps / Tools",
    color: "#a855f7",
    catY: 810,
    items: [
      {
        id: "docker",
        label: "Docker",
        note: "Containerization",
        Icon: SiDocker,
        iconColor: "#2496ed",
        y: 785,
      },
      {
        id: "postman",
        label: "Postman",
        note: "API Testing",
        Icon: SiPostman,
        iconColor: "#ff6c37",
        y: 870,
      },
    ],
  },
];

// ── Path helpers ──────────────────────────────────────────────────────────────
function pathRootToCat(catY: number): string {
  const ex = CAT_X - PILL_W / 2;
  const cp1x = ROOT.x + (ex - ROOT.x) * 0.55;
  const cp2x = ROOT.x + (ex - ROOT.x) * 0.45;
  return `M ${ROOT.x} ${ROOT.y} C ${cp1x} ${ROOT.y} ${cp2x} ${catY} ${ex} ${catY}`;
}

function pathCatToItem(catY: number, itemY: number): string {
  const sx = CAT_X + PILL_W / 2;
  const ex = ICON_X;
  const cp1x = sx + (ex - sx) * 0.45;
  const cp2x = sx + (ex - sx) * 0.55;
  return `M ${sx} ${catY} C ${cp1x} ${catY} ${cp2x} ${itemY} ${ex} ${itemY}`;
}

// ── Animated curve ────────────────────────────────────────────────────────────
function CurvePath({
  d,
  stroke,
  strokeWidth = 2,
  opacity = 1,
  delay = 0,
  isInView,
}: {
  d: string;
  stroke: string;
  strokeWidth?: number;
  opacity?: number;
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeOpacity={opacity}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
      transition={{ duration: 0.75, delay, ease: "easeInOut" }}
    />
  );
}

// ── Root node ─────────────────────────────────────────────────────────────────
function RootNode({ isInView }: { isInView: boolean }) {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.05 }}
      style={{ originX: `${ROOT.x}px`, originY: `${ROOT.y}px` }}
    >
      <rect
        x={ROOT.x - 28}
        y={ROOT.y - 28}
        width={56}
        height={56}
        rx={14}
        fill="rgba(18,18,38,0.97)"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1"
      />
      {[-9, 0, 9].map((dy, i) => (
        <line
          key={i}
          x1={ROOT.x - 11}
          y1={ROOT.y + dy}
          x2={ROOT.x + 11}
          y2={ROOT.y + dy}
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ))}
    </motion.g>
  );
}

// ── Category pill with hover glow ─────────────────────────────────────────────
function CategoryPill({
  catY,
  label,
  color,
  filterId,
  delay,
  isInView,
}: {
  catY: number;
  label: string;
  color: string;
  filterId: string;
  delay: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const px = CAT_X - PILL_W / 2;
  const py = catY - PILL_H / 2;

  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.3, delay }}
      style={{ originX: `${CAT_X}px`, originY: `${catY}px`, cursor: "pointer" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Glow rect behind — only visible on hover */}
      <motion.rect
        x={px - 4}
        y={py - 4}
        width={PILL_W + 8}
        height={PILL_H + 8}
        rx={11}
        fill={color}
        animate={{ opacity: hovered ? 0.18 : 0 }}
        transition={{ duration: 0.2 }}
        filter={`url(#${filterId})`}
      />
      {/* Main pill */}
      <motion.rect
        x={px}
        y={py}
        width={PILL_W}
        height={PILL_H}
        rx={8}
        fill="rgba(8,8,20,0.93)"
        animate={{
          stroke: color,
          strokeOpacity: hovered ? 1 : 0.55,
          strokeWidth: hovered ? 1.8 : 1.3,
        }}
        transition={{ duration: 0.2 }}
      />
      <text
        x={CAT_X}
        y={catY + 5}
        fill={color}
        fontSize="12.5"
        fontFamily="monospace"
        fontWeight="700"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
      >
        {label}
      </text>
    </motion.g>
  );
}

// ── Icon node with hover glow ─────────────────────────────────────────────────
function IconNode({
  item,
  color,
  filterId,
  delay,
  isInView,
}: {
  item: Item;
  color: string;
  filterId: string;
  delay: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const bx = ICON_X;
  const by = item.y - BOX / 2;
  const Icon = item.Icon;

  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.26, delay }}
      style={{
        originX: `${ICON_X + BOX / 2}px`,
        originY: `${item.y}px`,
        cursor: "pointer",
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Outer glow bloom — expands on hover */}
      <motion.rect
        x={bx - 6}
        y={by - 6}
        width={BOX + 12}
        height={BOX + 12}
        rx={16}
        fill={color}
        animate={{ opacity: hovered ? 0.22 : 0 }}
        transition={{ duration: 0.2 }}
        filter={`url(#${filterId})`}
      />

      {/* Icon box border brightens on hover */}
      <motion.rect
        x={bx}
        y={by}
        width={BOX}
        height={BOX}
        rx={12}
        fill="rgba(8,8,20,0.93)"
        animate={{
          stroke: hovered ? color : item.iconColor,
          strokeOpacity: hovered ? 0.85 : 0.3,
          strokeWidth: hovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Accent dot */}
      <motion.circle
        cx={bx + BOX - 7}
        cy={by + 7}
        r={4.5}
        fill={color}
        animate={{ opacity: hovered ? 1 : 0.75, r: hovered ? 5.5 : 4.5 }}
        transition={{ duration: 0.2 }}
      />

      {/* React icon */}
      <foreignObject
        x={bx}
        y={by}
        width={BOX}
        height={BOX}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            width: BOX,
            height: BOX,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon style={{ color: item.iconColor, width: 22, height: 22 }} />
        </div>
      </foreignObject>

      {/* Label — brightens on hover */}
      <motion.text
        x={bx + BOX + 12}
        y={item.y - 5}
        fontSize="13.5"
        fontFamily="monospace"
        fontWeight="600"
        style={{ pointerEvents: "none" }}
        animate={{ fill: hovered ? "#ffffff" : "rgba(255,255,255,0.88)" }}
        transition={{ duration: 0.2 }}
      >
        {item.label}
      </motion.text>

      {/* Note */}
      <text
        x={bx + BOX + 12}
        y={item.y + 13}
        fill="rgba(255,255,255,0.35)"
        fontSize="11"
        fontFamily="monospace"
        style={{ pointerEvents: "none" }}
      >
        <tspan fill={color} fontSize="10">
          •{" "}
        </tspan>
        {item.note}
      </text>

      {/* Invisible wide hit area so label text is also hoverable */}
      <rect x={bx} y={by} width={300} height={BOX} fill="transparent" />
    </motion.g>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="stack"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="font-mono text-primary text-sm tracking-widest">
            {"// TECHNOLOGIES"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
            My Tech Stack
          </h2>
        </motion.div>

        {/* ── DESKTOP SVG ───────────────────────────────────────────────── */}
        <div className="hidden lg:block w-full">
          <svg
            width="100%"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            style={{
              maxWidth: VB_W,
              display: "block",
              margin: "0 auto",
              overflow: "visible",
            }}
          >
            <defs>
              {/* Shared ambient glow for lines */}
              <filter
                id="lineGlow"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
              >
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Per-branch heavy glow filter for hover effect */}
              {BRANCHES.map((b) => (
                <filter
                  key={b.id}
                  id={`hoverGlow-${b.id}`}
                  x="-60%"
                  y="-60%"
                  width="220%"
                  height="220%"
                >
                  <feFlood
                    floodColor={b.color}
                    floodOpacity="1"
                    result="color"
                  />
                  <feComposite
                    in="color"
                    in2="SourceGraphic"
                    operator="in"
                    result="coloredSource"
                  />
                  <feGaussianBlur
                    in="coloredSource"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              ))}
            </defs>

            {/* Root → category curves */}
            <g filter="url(#lineGlow)">
              {BRANCHES.map((b, bi) => (
                <CurvePath
                  key={`root-${b.id}`}
                  d={pathRootToCat(b.catY)}
                  stroke={b.color}
                  strokeWidth={2.4}
                  opacity={0.85}
                  delay={0.1 + bi * 0.08}
                  isInView={isInView}
                />
              ))}
            </g>

            {/* Category → item curves */}
            {BRANCHES.map((b, bi) =>
              b.items.map((item, ii) => (
                <CurvePath
                  key={`cat-${item.id}`}
                  d={pathCatToItem(b.catY, item.y)}
                  stroke={b.color}
                  strokeWidth={1.6}
                  opacity={0.45}
                  delay={0.55 + bi * 0.08 + ii * 0.07}
                  isInView={isInView}
                />
              )),
            )}

            {/* Root node */}
            <RootNode isInView={isInView} />

            {/* Category pills */}
            {BRANCHES.map((b, bi) => (
              <CategoryPill
                key={b.id}
                catY={b.catY}
                label={b.label}
                color={b.color}
                filterId={`hoverGlow-${b.id}`}
                delay={0.45 + bi * 0.08}
                isInView={isInView}
              />
            ))}

            {/* Icon nodes */}
            {BRANCHES.map((b, bi) =>
              b.items.map((item, ii) => (
                <IconNode
                  key={item.id}
                  item={item}
                  color={b.color}
                  filterId={`hoverGlow-${b.id}`}
                  delay={0.65 + bi * 0.08 + ii * 0.08}
                  isInView={isInView}
                />
              )),
            )}
          </svg>
        </div>

        {/* ── MOBILE fallback ───────────────────────────────────────────── */}
        <div className="lg:hidden grid gap-5">
          {BRANCHES.map((branch, bi) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: bi * 0.1 }}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(10,10,20,0.82)",
                border: `1px solid ${branch.color}33`,
                backdropFilter: "blur(10px)",
              }}
            >
              <h3
                className="font-mono text-sm font-semibold mb-4 flex items-center gap-2"
                style={{ color: branch.color }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: branch.color }}
                />
                {branch.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {branch.items.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          `0 0 14px ${branch.color}55`;
                        (e.currentTarget as HTMLElement).style.borderColor =
                          `${branch.color}66`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "none";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.07)";
                      }}
                    >
                      <Icon
                        style={{ color: item.iconColor, width: 16, height: 16 }}
                      />
                      <span
                        className="text-xs font-mono"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                      >
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

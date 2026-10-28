import { colours } from "@/data/products";
export default function GarmentArt({ product, colour = "Bitumen" }) {
  const light = colour === "Bone";
  const ink = light ? "#242422" : "#f2ecdf";
  const hoodie = product.type === "hoodie";
  const words = product.design.toUpperCase().split(" ");
  const midpoint = Math.ceil(words.length / 2);
  return (
    <svg
      viewBox="0 0 400 450"
      role="img"
      aria-label={`${product.name}, ${colour}, concept mockup`}
      className="w-full h-full p-6 transition-transform duration-500 group-hover:scale-105"
    >
      <ellipse
        cx="200"
        cy="411"
        rx="113"
        ry="9"
        fill="#15140f"
        opacity="0.08"
      />
      <path
        d={
          hoodie
            ? "M150 100 Q135 43 174 32 Q200 20 226 32 Q265 43 250 100 L288 119 L344 311 L299 327 L263 222 L267 398 L133 398 L137 222 L101 327 L56 311 L112 119 Z"
            : "M150 75 Q200 102 250 75 L303 102 L351 174 L298 208 L268 169 L268 388 L132 388 L132 169 L102 208 L49 174 L97 102 Z"
        }
        fill={colours[colour]}
        stroke="#15140f"
        strokeOpacity="0.16"
        strokeWidth="2"
      />
      {hoodie ? (
        <>
          <path
            d="M150 100 Q200 133 250 100 M177 51 Q200 38 223 51 L219 96 Q200 112 181 96 Z M162 324 L178 300 L222 300 L238 324 L238 356 L162 356 Z"
            fill="none"
            stroke={ink}
            strokeOpacity="0.18"
            strokeWidth="2"
          />
          <path
            d="M188 115 L185 175 M212 115 L215 175"
            stroke={ink}
            strokeOpacity="0.5"
            strokeWidth="2"
          />
        </>
      ) : (
        <path
          d="M150 75 Q200 126 250 75"
          fill="none"
          stroke={ink}
          strokeOpacity="0.22"
          strokeWidth="7"
        />
      )}
      <g fill={ink} textAnchor="middle" fontFamily="Anton, Impact, sans-serif">
        {product.printStyle === 1 && (
          <circle
            cx="200"
            cy="223"
            r="54"
            fill="none"
            stroke={ink}
            strokeWidth="2"
          />
        )}
        {product.printStyle === 2 && (
          <path
            d="M147 182 L253 182 M147 257 L253 257"
            fill="none"
            stroke="#b5392c"
            strokeWidth="5"
          />
        )}
        <text x="200" y="211" fontSize={words.length > 3 ? "13" : "16"}>
          {words.slice(0, midpoint).join(" ")}
        </text>
        <text x="200" y="235" fontSize="16">
          {words.slice(midpoint).join(" ")}
        </text>
        <text
          x="200"
          y="253"
          fontSize="5.5"
          letterSpacing="1.5"
          fontFamily="monospace"
        >
          BOGAN SUPPLY CO. / NZ
        </text>
      </g>
      <path
        d={hoodie ? "M136 385 H264" : "M135 375 H265"}
        stroke={ink}
        strokeOpacity="0.15"
      />
    </svg>
  );
}

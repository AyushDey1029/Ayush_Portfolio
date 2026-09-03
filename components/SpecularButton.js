'use client';
import React, { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';
import './SpecularButton.css';

const PAD = 20;

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor1;
uniform vec3 uLineColor2;
uniform vec3 uLineColor3;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float shapeSDF(vec2 p) { return sdRoundedRect(p, uHalfSize, uRadius); }

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = shapeSDF(p);
  vec2 L = vec2(cos(uAngle), sin(uAngle));

  // Dark base stroke hugging the edge for a sense of thickness
  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;

  // Symmetric specular: the edges facing toward/away from the light both
  // catch a streak. The angular window (size + fade) is measured with an
  // elliptical normal so it varies continuously along straight edges.
  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float hi = line * rim * edgeClamp * uIntensity;

  // Multi-color chromatic gradient along the perimeter
  float perimeterAngle = atan(p.y, p.x);
  float gradT = clamp((perimeterAngle + 3.14159265) / 6.2831853, 0.0, 1.0);
  vec3 gradColor;
  if (gradT < 0.5) {
    gradColor = mix(uLineColor1, uLineColor2, gradT * 2.0);
  } else {
    gradColor = mix(uLineColor2, uLineColor3, (gradT - 0.5) * 2.0);
  }

  vec3 col = uBaseColor * base + gradColor * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  fragColor = vec4(col, a);
}
`;

const SpecularButton = ({
  children = 'Get Started',
  size = 'md',
  radius = 12,
  tint = '#161b22',
  tintOpacity = 0.85,
  blur = 8,
  textColor = '#f0f6fc',
  gradientColors = ['#38bdf8', '#818cf8', '#c084fc'],
  baseColor = '#2d333b',
  intensity = 1.3,
  shineSize = 14,
  shineFade = 45,
  thickness = 1.2,
  speed = 0.35,
  followMouse = true,
  proximity = 250,
  autoAnimate = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  href,
  target,
  rel,
  as
}) => {
  const btnRef = useRef(null);
  const fxRef = useRef(null);
  const propsRef = useRef({});

  propsRef.current = {
    radius,
    gradientColors,
    baseColor,
    intensity,
    shineSize,
    shineFade,
    thickness,
    speed,
    followMouse,
    proximity,
    autoAnimate
  };

  useEffect(() => {
    const btn = btnRef.current;
    const fx = fxRef.current;
    if (!btn || !fx) return;

    // On mobile / touch devices, skip WebGL to avoid exhausting mobile WebGL context limits
    if (typeof window !== 'undefined' && window.innerWidth < 960) {
      return;
    }

    let gl;
    let renderer;
    try {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true, dpr });
      gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    } catch (e) {
      console.warn('WebGL initialization failed for SpecularButton:', e);
      return;
    }

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uCenter: { value: [0, 0] },
        uHalfSize: { value: [1, 1] },
        uRadius: { value: 0 },
        uAngle: { value: 2.4 },
        uPx: { value: window.devicePixelRatio || 1 },
        uLineColor1: { value: [0.22, 0.74, 0.97] },
        uLineColor2: { value: [0.5, 0.55, 0.97] },
        uLineColor3: { value: [0.75, 0.52, 0.99] },
        uBaseColor: { value: [0.18, 0.2, 0.23] },
        uIntensity: { value: 1.3 },
        uShineSize: { value: 0.2 },
        uShineFade: { value: 0.75 },
        uThickness: { value: 1.2 },
        uBaseWidth: { value: window.devicePixelRatio || 1 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    fx.appendChild(gl.canvas);

    const sizeRef = { w: 1, h: 1 };
    const resize = () => {
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) return;
      sizeRef.w = w;
      sizeRef.h = h;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setSize(w + PAD * 2, h + PAD * 2);
      program.uniforms.uCenter.value = [(PAD + w / 2) * dpr, (PAD + h / 2) * dpr];
      program.uniforms.uHalfSize.value = [(w / 2) * dpr, (h / 2) * dpr];
      program.uniforms.uPx.value = dpr;
      program.uniforms.uBaseWidth.value = dpr;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(btn);
    resize();

    let pointerAngle = null;
    let proximityT = 0;
    const onPointerMove = (e) => {
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const dist = Math.hypot(dx, dy);

      if (dist === 0) {
        const nx = (e.clientX - cx) / (rect.width / 2);
        const ny = (cy - e.clientY) / (rect.height / 2);
        pointerAngle = Math.atan2(2 / rect.height, -2 / rect.width) + nx * 0.3 + ny * 0.15;
      } else {
        pointerAngle = Math.atan2(cy - e.clientY, e.clientX - cx);
      }
      const t = Math.max(0, 1 - dist / Math.max(propsRef.current.proximity, 1));
      proximityT = t * t * (3 - 2 * t);
    };
    window.addEventListener('pointermove', onPointerMove);

    let angle = 2.4;
    let idleAngle = 2.4;
    let bright = 0;
    let last = performance.now();
    let raf = 0;

    const c1 = new Color();
    const c2 = new Color();
    const c3 = new Color();
    const baseC = new Color();

    const update = (now) => {
      raf = requestAnimationFrame(update);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const p = propsRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      idleAngle += p.speed * dt;
      const steer = p.followMouse && pointerAngle != null && (!p.autoAnimate || proximityT > 0);
      const targetA = steer ? pointerAngle : idleAngle;
      const diff = ((targetA - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      angle += diff * (1 - Math.exp(-dt * 7));

      const brightTarget = p.autoAnimate ? 1 : proximityT;
      bright += (brightTarget - bright) * (1 - Math.exp(-dt * 8));

      const colors = p.gradientColors || ['#38bdf8', '#818cf8', '#c084fc'];
      c1.set(colors[0] || '#38bdf8');
      c2.set(colors[1] || '#818cf8');
      c3.set(colors[2] || '#c084fc');
      baseC.set(p.baseColor);

      program.uniforms.uAngle.value = angle;
      program.uniforms.uRadius.value = Math.min(p.radius, Math.min(sizeRef.w, sizeRef.h) / 2) * dpr;
      program.uniforms.uLineColor1.value = [c1.r, c1.g, c1.b];
      program.uniforms.uLineColor2.value = [c2.r, c2.g, c2.b];
      program.uniforms.uLineColor3.value = [c3.r, c3.g, c3.b];
      program.uniforms.uBaseColor.value = [baseC.r, baseC.g, baseC.b];
      program.uniforms.uIntensity.value = p.intensity * bright;
      program.uniforms.uShineSize.value = (p.shineSize * Math.PI) / 180;
      program.uniforms.uShineFade.value = (p.shineFade * Math.PI) / 180;
      program.uniforms.uThickness.value = p.thickness * dpr;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      if (gl.canvas.parentNode === fx) fx.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  const sharedStyle = {
    '--sb-radius': `${radius}px`,
    '--sb-tint': tint,
    '--sb-tint-opacity': tintOpacity,
    '--sb-blur': `${blur}px`,
    '--sb-text-color': textColor
  };

  const classNameFull = `specular-button specular-button--${size}${className ? ` ${className}` : ''}`;

  if (as === 'a' || href) {
    return (
      <a
        ref={btnRef}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={classNameFull}
        style={sharedStyle}
      >
        <span ref={fxRef} className="specular-button__fx" aria-hidden="true" />
        <span className="specular-button__label">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNameFull}
      style={sharedStyle}
    >
      <span ref={fxRef} className="specular-button__fx" aria-hidden="true" />
      <span className="specular-button__label">{children}</span>
    </button>
  );
};

export default SpecularButton;

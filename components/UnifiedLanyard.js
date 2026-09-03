/* eslint-disable react/no-unknown-property */
'use client';
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './UnifiedLanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

/**
 * Animation stages (deterministic state machine):
 *   'dropping'  — card falls from above viewport under gravity
 *   'settling'  — card has entered view, swing is dampening
 *   'shifting'  — anchor slides rightward to final column position
 *   'docked'    — animation complete, full interactive mode
 */

export default function UnifiedLanyard({ onSlideStart }) {
  const [phase, setPhase] = useState('dropping');
  const [isMobile, setIsMobile] = useState(false);
  const [textureMode, setTextureMode] = useState('craft');
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 960);
    const handleResize = () => setIsMobile(window.innerWidth < 960);
    window.addEventListener('resize', handleResize);

    // Check prefers-reduced-motion
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // If reduced motion: skip directly to docked state + show text
  useEffect(() => {
    if (reducedMotion && mounted && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      setPhase('docked');
      setTextureMode('profile');
      if (onSlideStart) onSlideStart();
    }
  }, [reducedMotion, mounted, onSlideStart]);

  const handleSettled = useCallback(() => {
    if (phase !== 'dropping') return;
    setPhase('settling');
  }, [phase]);

  const handleSwingDone = useCallback(() => {
    if (phase !== 'settling') return;
    setPhase('shifting');
    setTextureMode('profile');
    if (onSlideStart) onSlideStart();
  }, [phase, onSlideStart]);

  const handleDocked = useCallback(() => {
    if (phase !== 'shifting') return;
    setPhase('docked');
  }, [phase]);

  // Skip intro jumps straight to shifting
  const handleSkip = useCallback(() => {
    if (phase === 'docked' || phase === 'shifting') return;
    setPhase('shifting');
    setTextureMode('profile');
    if (onSlideStart) onSlideStart();
  }, [phase, onSlideStart]);

  if (!mounted) return null;

  const showSkip = phase === 'dropping' || phase === 'settling';

  return (
    <>
      {/* Skip button */}
      {showSkip && (
        <button onClick={handleSkip} className="unified-skip-btn" aria-label="Skip Intro">
          <span>Skip Intro</span>
          <span>→</span>
        </button>
      )}

      {/* Full Page Canvas */}
      <div className="unified-lanyard-wrap">
        <Canvas
          className="unified-canvas"
          camera={{ position: [0, 0, 24], fov: isMobile ? 26 : 21 }}
          dpr={[1, isMobile ? 1.25 : 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
            depth: true
          }}
          onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
        >
          <ambientLight intensity={Math.PI * 0.9} />
          <Physics gravity={[0, -40, 0]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <LanyardBand
              isMobile={isMobile}
              phase={phase}
              textureMode={textureMode}
              onSettled={handleSettled}
              onSwingDone={handleSwingDone}
              onDocked={handleDocked}
              reducedMotion={reducedMotion}
            />
          </Physics>

          <Environment frames={1} resolution={256} blur={0.75}>
            <Lightformer intensity={2.5} color="#38bdf8" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="#818cf8" position={[-2, 1, 3]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="#c084fc" position={[2, 1, 3]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={8} color="white" position={[-8, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
          </Environment>
        </Canvas>
      </div>
    </>
  );
}

let cachedCardGeometry = null;

function buildCompositeTexture(baseMap, frontImg, backImg) {
  const baseImg = baseMap?.image;
  const W = baseImg?.width || 1024;
  const H = baseImg?.height || 1024;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return baseMap;
  if (baseImg) ctx.drawImage(baseImg, 0, 0, W, H);

  const drawFitted = (img, rect) => {
    if (!img) return;
    const rx = rect.x * W, ry = rect.y * H, rw = rect.w * W, rh = rect.h * H;
    const s = Math.max(rw / img.width, rh / img.height);
    const dw = img.width * s, dh = img.height * s;
    const dx = rx + (rw - dw) / 2, dy = ry + (rh - dh) / 2;
    ctx.save(); ctx.beginPath(); ctx.rect(rx, ry, rw, rh); ctx.clip();
    ctx.drawImage(img, dx, dy, dw, dh); ctx.restore();
  };

  if (frontImg) drawFitted(frontImg, FRONT_UV_RECT);
  if (backImg) drawFitted(backImg, BACK_UV_RECT);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.flipY = baseMap ? baseMap.flipY : false;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

// ---------------------------------------------------------------------------
// Inner R3F component: physics bodies, rope joints, useFrame animation loop
// ---------------------------------------------------------------------------
function LanyardBand({
  isMobile,
  phase,
  textureMode,
  onSettled,
  onSwingDone,
  onDocked,
  reducedMotion,
  minSpeed = 0,
  maxSpeed = 50
}) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();

  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic', canSleep: false, colliders: false,
    angularDamping: 3.5, linearDamping: 3.5
  };

  const { nodes, materials } = useGLTF('/assets/lanyard/card.glb');
  const texture = useTexture('/assets/lanyard/lanyard.png');
  const craftTex = useTexture('/assets/lanyard/card-front.png');
  const profileTex = useTexture('/assets/lanyard/card-profile.png');
  const backTex = useTexture('/assets/lanyard/card-back.png');

  // Pre-generate composite textures once to prevent stutter during live transitions
  const craftMap = useMemo(() => {
    return buildCompositeTexture(materials.base?.map, craftTex?.image, backTex?.image);
  }, [craftTex?.image, backTex?.image, materials.base?.map]);

  const profileMap = useMemo(() => {
    return buildCompositeTexture(materials.base?.map, profileTex?.image, backTex?.image);
  }, [profileTex?.image, backTex?.image, materials.base?.map]);

  const cardMap = textureMode === 'profile' ? profileMap : craftMap;

  // Seamlessly bridge and fill the circular punch hole in card.glb (cached across renders)
  const cardGeometry = useMemo(() => {
    if (!nodes?.card?.geometry) return null;
    if (cachedCardGeometry) return cachedCardGeometry;
    const geom = nodes.card.geometry.clone();

    // Front face punch-hole perimeter vertices (sorted CCW)
    const frontRing = [13, 6, 12, 1, 11, 0, 10, 2, 9, 7, 3, 5, 8, 4];
    // Back face punch-hole perimeter vertices (sorted CW)
    const backRing = [483, 486, 468, 392, 464, 388, 471, 417, 474, 489, 476, 384, 462, 481, 394, 425];

    const newIndices = [];
    for (let i = 1; i < frontRing.length - 1; i++) {
      newIndices.push(frontRing[0], frontRing[i], frontRing[i + 1]);
    }
    for (let i = 1; i < backRing.length - 1; i++) {
      newIndices.push(backRing[0], backRing[i + 1], backRing[i]);
    }

    const origIndices = Array.from(geom.index.array);
    const combined = new Uint16Array([...origIndices, ...newIndices]);
    geom.setIndex(new THREE.BufferAttribute(combined, 1));
    geom.computeVertexNormals();
    cachedCardGeometry = geom;
    return geom;
  }, [nodes?.card?.geometry]);

  const [curve] = useState(() =>
    new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );

  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.85]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.95]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.95]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 5.42, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  const ANCHOR_Y = 8.0;

  const timeRef = useRef(0);
  const shiftTime = useRef(0);
  // Phase transition refs (fire-once guards)
  const settledFired = useRef(false);
  const swingDoneFired = useRef(false);
  const dockedFired = useRef(false);
  const anchorX = useRef(0);

  // For reduced motion: teleport anchor to final position on first frame
  const reducedMotionApplied = useRef(false);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.033);
    timeRef.current += dt;
    const t = timeRef.current;

    // Reduced motion: instantly position at docked state
    if (reducedMotion && !reducedMotionApplied.current) {
      reducedMotionApplied.current = true;
      const finalX = isMobile ? 0 : 3.6;
      anchorX.current = finalX;
      fixed.current?.setNextKinematicTranslation({ x: finalX, y: ANCHOR_Y, z: 0 });
      return;
    }

    // ── 1. Initial 360° Spin as card descends ──
    if (t >= 0.15 && t <= 1.05 && !dragged && card.current) {
      ang.copy(card.current.angvel());
      card.current.setAngvel({
        x: ang.x * 0.92,
        y: 7.2,
        z: ang.z * 0.92
      });
    }

    // ── 2. Face stabilization: smoothly steer card to face camera (rot.y → 0) ──
    if (t > 1.05 && !dragged && card.current) {
      const q = card.current.rotation();
      if (q) {
        const quat = new THREE.Quaternion(q.x, q.y, q.z, q.w);
        const euler = new THREE.Euler().setFromQuaternion(quat, 'YXZ');
        let yAngle = euler.y;
        // Wrap to [-π, π]
        while (yAngle > Math.PI) yAngle -= Math.PI * 2;
        while (yAngle < -Math.PI) yAngle += Math.PI * 2;

        ang.copy(card.current.angvel());
        card.current.setAngvel({
          x: ang.x * 0.92,
          y: -yAngle * 3.2,
          z: ang.z * 0.92
        });
      }
    }

    // ── Phase: DROPPING — detect when card enters viewport ──
    if (phase === 'dropping' && !settledFired.current && card.current) {
      const cardY = card.current.translation().y;
      if (cardY < 3.5) {
        settledFired.current = true;
        onSettled();
      }
    }

    // ── Phase: SETTLING — hold loading page for 1.8s, then shift ──
    if (phase === 'settling' && !swingDoneFired.current && card.current) {
      if (dragged) {
        const cardPos = card.current.translation();
        if (cardPos.x > 1.2) {
          swingDoneFired.current = true;
          onSwingDone();
        }
      }
      if (t >= 1.8) {
        swingDoneFired.current = true;
        onSwingDone();
      }
    }

    // ── Phase: SHIFTING — smooth natural gliding to the right ──
    if (phase === 'shifting') {
      shiftTime.current += dt;
      const targetX = isMobile ? 0 : 3.6;
      const DURATION = 1.15;
      const p = Math.min(shiftTime.current / DURATION, 1);
      // Smooth sinusoidal ease-in-out (zero initial acceleration, zero final snap)
      const ease = 0.5 - 0.5 * Math.cos(Math.PI * p);
      anchorX.current = targetX * ease;

      if (p >= 1 && !dockedFired.current) {
        dockedFired.current = true;
        anchorX.current = targetX;
        onDocked();
      }
    } else if (phase === 'docked') {
      anchorX.current = isMobile ? 0 : 3.6;
    }

    fixed.current?.setNextKinematicTranslation({ x: anchorX.current, y: ANCHOR_Y, z: 0 });

    // ── Drag interaction (active in all phases) ──
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(r => r.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }

    // ── Ribbon curve ──
    if (fixed.current && j1.current && j2.current && j3.current && card.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const d = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), dt * (minSpeed + d * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      if (band.current?.geometry) {
        band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      }
    }
  });

  curve.curveType = 'chordal';
  if (texture) texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      {/* Anchor group: starts high so bodies are above the camera frustum */}
      <group position={[0, 5.0, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="kinematicPosition" position={[0, 0, 0]} />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[1.05, 1.45, 0.01]} />
          <group
            scale={isMobile ? 2.4 : 5.5}
            position={[0, -1.4, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture?.(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture?.(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            {nodes?.card && (
              <mesh geometry={cardGeometry || nodes.card.geometry}>
                <meshPhysicalMaterial
                  map={cardMap}
                  map-anisotropy={16}
                  clearcoat={isMobile ? 0 : 1}
                  clearcoatRoughness={0.15}
                  roughness={0.8}
                  metalness={0.3}
                />
              </mesh>
            )}
            <group position={[0, 0.042, 0]}>
              {nodes?.clip && (
                <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.2} />
              )}
              {nodes?.clamp && (
                <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
              )}
            </group>
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#ffffff"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={isMobile ? 1.15 : 1.35}
        />
      </mesh>

      {/* Pre-warm profile texture into GPU VRAM to ensure 0ms swap latency */}
      <mesh position={[0, -100, 0]} visible={false}>
        <planeGeometry args={[0.01, 0.01]} />
        <meshBasicMaterial map={profileMap} />
      </mesh>
    </>
  );
}

useGLTF.preload('/assets/lanyard/card.glb');
useTexture.preload('/assets/lanyard/lanyard.png');
useTexture.preload('/assets/lanyard/card-front.png');
useTexture.preload('/assets/lanyard/card-profile.png');
useTexture.preload('/assets/lanyard/card-back.png');

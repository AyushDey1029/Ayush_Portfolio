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

export default function UnifiedLanyard({ onSlideStart }) {
  const [stage, setStage] = useState('intro'); // 'intro' | 'sliding' | 'docked'
  const [hintVisible, setHintVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [textureMode, setTextureMode] = useState('craft'); // 'craft' -> 'profile'
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 960);
    const handleResize = () => setIsMobile(window.innerWidth < 960);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTriggerSlide = useCallback(() => {
    if (stage !== 'intro') return;
    setStage('sliding');
    setHintVisible(false);
    setTextureMode('profile');
    if (onSlideStart) onSlideStart();
  }, [stage, onSlideStart]);

  if (!mounted) return null;

  const isDocked = stage === 'docked';
  const isIntro = stage === 'intro';

  return (
    <>
      {/* Dark backdrop overlay during intro */}
      {!isDocked && (
        <div className={`unified-backdrop ${stage === 'sliding' ? 'hidden' : ''}`} />
      )}

      {/* Skip Intro button */}
      {isIntro && (
        <button onClick={handleTriggerSlide} className="unified-skip-btn" aria-label="Skip Intro">
          <span>Skip Intro</span>
          <span>→</span>
        </button>
      )}

      {/* Drag Hint */}
      <div className={`unified-drag-hint ${hintVisible && isIntro ? 'visible' : ''}`}>
        <span>Drag card right to enter</span>
        <span className="unified-arrow">→</span>
      </div>

      {/* Unified Canvas Container */}
      <div className={`unified-lanyard-wrap ${isDocked ? 'docked' : ''}`}>
        <Canvas
          className="unified-canvas"
          camera={{ position: [0, 0, 24], fov: isMobile ? 26 : 21 }}
          dpr={[1, isMobile ? 1.5 : 2]}
          gl={{ alpha: true, antialias: true }}
          onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
        >
          <ambientLight intensity={Math.PI * 0.9} />
          <Physics gravity={[0, -38, 0]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <LanyardBand
              isMobile={isMobile}
              stage={stage}
              textureMode={textureMode}
              onSettle={() => setHintVisible(true)}
              onTriggerSlide={handleTriggerSlide}
              onDocked={() => setStage('docked')}
            />
          </Physics>

          <Environment blur={0.75}>
            <Lightformer
              intensity={2.5}
              color="#38bdf8"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="#818cf8"
              position={[-2, 1, 3]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="#c084fc"
              position={[2, 1, 3]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={8}
              color="white"
              position={[-8, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      </div>
    </>
  );
}

function LanyardBand({
  isMobile = false,
  stage = 'intro',
  textureMode = 'craft',
  onSettle,
  onTriggerSlide,
  onDocked,
  minSpeed = 0,
  maxSpeed = 50
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();

  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();

  const segmentProps = { type: 'dynamic', canSleep: false, colliders: false, angularDamping: 3.5, linearDamping: 3.5 };

  const { nodes, materials } = useGLTF('/assets/lanyard/card.glb');
  const texture = useTexture('/assets/lanyard/lanyard.png');
  const craftTex = useTexture('/assets/lanyard/card-front.png');
  const profileTex = useTexture('/assets/lanyard/card-profile.png');
  const backTex = useTexture('/assets/lanyard/card-back.png');

  // Dynamic texture map (craft vs profile photo)
  const cardMap = useMemo(() => {
    const baseMap = materials.base?.map;
    const baseImg = baseMap?.image;
    const W = baseImg?.width || 1024;
    const H = baseImg?.height || 1024;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    if (baseImg) {
      ctx.drawImage(baseImg, 0, 0, W, H);
    }

    const drawFitted = (img, rect) => {
      if (!img) return;
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const scale = Math.max(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    const activeFront = textureMode === 'profile' ? profileTex.image : craftTex.image;
    if (activeFront) drawFitted(activeFront, FRONT_UV_RECT);
    if (backTex?.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap ? baseMap.flipY : true;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [textureMode, craftTex, profileTex, backTex, materials.base?.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );

  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  const timeRef = useRef(0);
  const hasSpun = useRef(false);
  const hasSettled = useRef(false);
  const slideTriggered = useRef(false);
  const dockTriggered = useRef(false);
  const anchorX = useRef(0);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    timeRef.current += dt;
    const t = timeRef.current;

    // 1. Initial 360° Spin (as card drops from horizontal under gravity)
    if (t >= 0.25 && t <= 1.35 && !hasSpun.current && !dragged) {
      card.current?.setAngvel({ x: 0, y: 7.2, z: 0 });
    } else if (t > 1.35 && !hasSpun.current) {
      hasSpun.current = true;
    }

    // 2. Stabilization facing forward (rot.y = 0)
    if (hasSpun.current && !dragged && card.current) {
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({
        x: ang.x * 0.95,
        y: (0 - rot.y) * 1.8,
        z: ang.z * 0.95
      });

      if (t > 1.6 && !hasSettled.current) {
        hasSettled.current = true;
        if (onSettle) onSettle();
      }
    }

    // 3. Trigger Slide on User Drag or Timeout
    if (stage === 'intro') {
      if (dragged && card.current) {
        const cardPos = card.current.translation();
        if (cardPos.x > 1.4 && !slideTriggered.current) {
          slideTriggered.current = true;
          if (onTriggerSlide) onTriggerSlide();
        }
      }
      if (t >= 3.2 && !slideTriggered.current) {
        slideTriggered.current = true;
        if (onTriggerSlide) onTriggerSlide();
      }
    }

    // 4. Smooth gliding motion towards right-hand hero column
    if (stage === 'sliding' || stage === 'docked') {
      const targetX = isMobile ? 0 : 3.8;
      const diffX = targetX - anchorX.current;
      anchorX.current += diffX * Math.min(dt * 3.5, 1);

      if (Math.abs(diffX) < 0.08 && !dockTriggered.current) {
        dockTriggered.current = true;
        if (onDocked) onDocked();
      }
    }

    fixed.current?.setNextKinematicTranslation({ x: anchorX.current, y: 0, z: 0 });

    // Drag physics
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }

    // Ribbon physics curve
    if (fixed.current && j1.current && j2.current && j3.current && card.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          dt * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
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
  if (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }

  return (
    <>
      <group position={[0, 4.6, 0]}>
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
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
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
              <mesh geometry={nodes.card.geometry}>
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
            {nodes?.clip && (
              <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.2} />
            )}
            {nodes?.clamp && (
              <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
            )}
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
          lineWidth={isMobile ? 1.05 : 1.2}
        />
      </mesh>
    </>
  );
}

useGLTF.preload('/assets/lanyard/card.glb');

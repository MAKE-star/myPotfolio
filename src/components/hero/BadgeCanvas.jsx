// src/components/hero/BadgeCanvas.jsx
//
// James's original Three.js physics lanyard — fully preserved.
// Only the card FACE content is updated to Mayopo's terminal aesthetic:
//
//   FRONT:  ┌MA┐ header · photo slot · MAYOPO ADEOYE · 4.85/5.00 badge · barcode · ● Available
//   BACK:   QR → mayopo.netlify.app · terminal info block · scanlines
//
// Everything else (rope physics, RigidBody joints, drag, GradientBackground,
// LanyardClip, materials, Canvas setup) is James's code untouched.

import { useState, useRef, useEffect, Suspense } from "react";
import * as THREE from "three";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import {
  Physics,
  RigidBody,
  BallCollider,
  CuboidCollider,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { Text, RoundedBox, shaderMaterial } from "@react-three/drei";
import QRCode from "qrcode";

// ── James's gradient background shader — unchanged ───────────────────────────
const LiquidGradientMaterial = shaderMaterial(
  {},
  `varying vec2 vUv;
   void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
  `varying vec2 vUv;
   void main(){
     vec3 dark=vec3(0.02,0.04,0.02);vec3 mid=vec3(0.04,0.07,0.03);
     vec3 g1=vec3(0.06,0.12,0.04);vec3 g2=vec3(0.08,0.14,0.05);
     vec3 g3=vec3(0.03,0.08,0.02);vec3 g4=vec3(0.07,0.11,0.04);
     float d=(vUv.x+(1.0-vUv.y))*0.5;
     vec3 c=mix(dark,mid,smoothstep(0.3,0.7,d));
     c=mix(c,g1,smoothstep(0.35,0.0,distance(vUv,vec2(0.15,0.85)))*0.3);
     c=mix(c,g2,smoothstep(0.28,0.0,distance(vUv,vec2(0.82,0.15)))*0.35);
     c=mix(c,g3,smoothstep(0.32,0.0,distance(vUv,vec2(0.25,0.3)))*0.25);
     c=mix(c,g4,smoothstep(0.3,0.0,distance(vUv,vec2(0.7,0.75)))*0.28);
     c=mix(c,g2,smoothstep(0.25,0.0,distance(vUv,vec2(0.5,0.5)))*0.2);
     float v=smoothstep(0.0,0.5,vUv.x)*smoothstep(0.0,0.5,vUv.y)*
             smoothstep(0.0,0.5,1.0-vUv.x)*smoothstep(0.0,0.5,1.0-vUv.y);
     c*=v+0.4;
     gl_FragColor=vec4(c,1.0);
   }`,
);
extend({ LiquidGradientMaterial });

function GradientBackground() {
  const { viewport } = useThree();
  return (
    <mesh position={[0, 0, -2]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1.5, 1.5]} />
      <liquidGradientMaterial />
    </mesh>
  );
}

// ── James's lanyard texture — updated text to Mayopo ────────────────────────
function createLanyardTexture() {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 1024;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#050a05";
  ctx.fillRect(0, 0, 256, 1024);
  // subtle noise
  for (let i = 0; i < 4000; i++) {
    ctx.fillStyle = `rgba(57,255,106,${Math.random() * 0.03})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 1024, 1, 1);
  }
  // green stripe lines
  ctx.strokeStyle = "rgba(57,255,106,0.12)";
  ctx.lineWidth = 2;
  for (let x = 20; x < 256; x += 36) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1024); ctx.stroke();
  }
  // repeating name text
  ctx.save();
  ctx.translate(128, 512);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "rgba(57,255,106,0.5)";
  ctx.font = "bold 36px 'JetBrains Mono',monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let y = -600; y <= 600; y += 140) ctx.fillText("MAYOPO · ADEOYE", 0, y);
  ctx.restore();
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1, 6);
  t.anisotropy = 16;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ── James's LanyardClip — unchanged ─────────────────────────────────────────
function LanyardClip() {
  return (
    <group position={[0, 0.1, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.15, 16]} />
        <meshStandardMaterial color="#2a3d2a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.12, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <torusGeometry args={[0.08, 0.02, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#2a3d2a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.04, 0.012, 12, 24]} />
        <meshStandardMaterial color="#1e8c3a" metalness={0.75} roughness={0.25} />
      </mesh>
      <mesh position={[0.08, -0.12, 0]} castShadow>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color="#2a3d2a" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// ── Helper: generate barcode texture ────────────────────────────────────────
function createBarcodeTexture() {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 48;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#050a05";
  ctx.fillRect(0, 0, 256, 48);
  const bars = [18,10,24,12,20,8,16,22,10,18,14,24,8,20,12,16,10,22,18,8,14,20,12,24,10,16,18,12,8,22,14,18];
  const bw = 256 / (bars.length * 1.6);
  bars.forEach((h, i) => {
    ctx.fillStyle = `rgba(57,255,106,0.35)`;
    const x = i * bw * 1.6;
    const barH = (h / 24) * 36;
    ctx.fillRect(x, 48 - barH, bw, barH);
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ── Helper: generate scanline texture ───────────────────────────────────────
function createScanlineTexture() {
  const c = document.createElement("canvas");
  c.width = 4; c.height = 4;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, 4, 4);
  ctx.fillStyle = "rgba(0,0,0,0.12)";
  ctx.fillRect(0, 2, 4, 2);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(40, 80);
  return t;
}

// ── Badge — James's physics intact, card faces replaced ─────────────────────
function Badge({ isMobile }) {
  const ropeMesh  = useRef();
  const ropeTexture = useRef(createLanyardTexture());
  const barcodeTexture = useRef(createBarcodeTexture());
  const scanTexture    = useRef(createScanlineTexture());

  const fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), dir = new THREE.Vector3();

  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([
      new THREE.Vector3(), new THREE.Vector3(),
      new THREE.Vector3(), new THREE.Vector3(),
    ]),
  );
  const [dragged, drag]   = useState(false);
  const [hovered, hover]  = useState(false);
  const [qrTexture, setQrTexture]       = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Load profile photo
    const loader = new THREE.TextureLoader();
    loader.load("/mayopo.jpg", (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = t.magFilter = THREE.LinearFilter;
      setProfileImage(t);
    });

    // Generate QR → mayopo.netlify.app
    QRCode.toCanvas(
      document.createElement("canvas"),
      "https://mayopo.netlify.app",
      { width: 512, margin: 2, color: { dark: "#39ff6a", light: "#050a05" } },
    )
      .then((c) => {
        const t = new THREE.CanvasTexture(c);
        t.colorSpace = THREE.SRGBColorSpace;
        setQrTexture(t);
      })
      .catch(console.error);
  }, []);

  // ── James's rope joints — unchanged ──────────────────────────────────────
  useRopeJoint(fixed, j1, [[0,0,0],[0,0,0],1]);
  useRopeJoint(j1,   j2, [[0,0,0],[0,0,0],1]);
  useRopeJoint(j2,   j3, [[0,0,0],[0,0,0],1]);
  useSphericalJoint(j3, card, [[0,0,0],[0,0.85,0]]);

  const fixedX = isMobile ? 0  : 2;
  const fixedY = isMobile ? 5.5 : 5;

  // ── James's useFrame — unchanged ──────────────────────────────────────────
  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z,
      });
    }
    [j1, j2, j3, card].forEach((r) => r.current?.wakeUp());
    if (fixed.current) {
      fixed.current.setNextKinematicTranslation({ x: fixedX, y: fixedY, z: 0 });
      [j1, j2].forEach((ref, i) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const cd = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (i === 0 ? 1 : 1 + cd));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      const pts = curve.getPoints(40);
      if (ropeMesh.current) {
        ropeMesh.current.geometry.dispose();
        ropeMesh.current.geometry = new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(pts), 64, 0.035, 12, false,
        );
      }
      ang.copy(card.current.angvel());
      card.current.setAngvel({ x: ang.x * 0.98, y: ang.y * 0.98, z: ang.z * 0.98 }, true);
    }
  });
  curve.curveType = "chordal";

  return (
    <>
      <group position={[fixedX, fixedY, 0]}>
        <RigidBody ref={fixed} type="kinematicPosition">
          <LanyardClip />
        </RigidBody>
        <RigidBody position={[0.3,0,0]} ref={j1} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.6,0,0]} ref={j2} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.9,0,0]} ref={j3} angularDamping={2} linearDamping={2}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={card}
          angularDamping={0.5}
          linearDamping={0.5}
          type={dragged ? "kinematicPosition" : "dynamic"}
          position={[1.2,0,0]}
          restitution={0.2}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          {/* Lanyard hole cylinder */}
          <mesh position={[0, 1.15, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.035, 0.035, 0.06, 16]} />
            <meshStandardMaterial color="#1e3a1e" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* ── CARD BODY ── */}
          <group
            scale={2.25}
            position={[0, -0.55, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => { e.target.releasePointerCapture(e.pointerId); drag(false); }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            {/* Card base — dark terminal green */}
            <RoundedBox args={[0.71, 1, 0.02]} radius={0.03} smoothness={4} castShadow receiveShadow>
              <meshPhysicalMaterial
                color="#080f08"
                metalness={0.4}
                roughness={0.3}
                clearcoat={0.8}
                clearcoatRoughness={0.15}
                emissive="#050a05"
                emissiveIntensity={0.1}
              />
            </RoundedBox>

            {/* Scanline overlay */}
            <mesh position={[0, 0, 0.011]}>
              <planeGeometry args={[0.71, 1]} />
              <meshStandardMaterial
                map={scanTexture.current}
                transparent
                opacity={0.18}
                depthWrite={false}
              />
            </mesh>

            {/* Border glow strip — accent green */}
            <RoundedBox args={[0.72, 1.01, 0.005]} radius={0.03} smoothness={4} position={[0,0,-0.008]}>
              <meshStandardMaterial
                color="#39ff6a"
                emissive="#39ff6a"
                emissiveIntensity={0.08}
                transparent
                opacity={0.25}
              />
            </RoundedBox>

            {/* ── FRONT FACE ── */}
            <group position={[0, 0, 0.012]}>

              {/* Header bar */}
              <mesh position={[0, 0.44, 0]}>
                <planeGeometry args={[0.71, 0.09]} />
                <meshStandardMaterial color="#050a05" />
              </mesh>

              {/* ┌MA┐ logo */}
              <Text position={[-0.18, 0.44, 0.001]} fontSize={0.032} color="#e8ede8"
                anchorX="left" anchorY="middle" fontWeight={700} letterSpacing={0.02}>
                {"┌MA┐"}
              </Text>
              <Text position={[0.12, 0.44, 0.001]} fontSize={0.018} color="#3d4d3d"
                anchorX="left" anchorY="middle" letterSpacing={0.1}>
                ID · 2026
              </Text>

              {/* Header underline accent */}
              <mesh position={[0, 0.395, 0.001]}>
                <planeGeometry args={[0.71, 0.002]} />
                <meshStandardMaterial color="#39ff6a" emissive="#39ff6a" emissiveIntensity={0.3} />
              </mesh>

              {/* Photo slot */}
              <mesh position={[0, 0.17, 0]}>
                <planeGeometry args={[0.32, 0.32]} />
                <meshStandardMaterial color="#0c1a0c" />
              </mesh>
              {profileImage ? (
                <mesh position={[0, 0.17, 0.001]}>
                  <planeGeometry args={[0.30, 0.30]} />
                  <meshStandardMaterial
                    map={profileImage}
                    roughness={0.4}
                    metalness={0}
                  />
                </mesh>
              ) : (
                <>
                  {/* Silhouette placeholder */}
                  <mesh position={[0, 0.14, 0.001]}>
                    <planeGeometry args={[0.14, 0.2]} />
                    <meshStandardMaterial color="#1e3a1e" />
                  </mesh>
                  <Text position={[0, 0.28, 0.002]} fontSize={0.02} color="#3d4d3d"
                    anchorX="center" anchorY="middle" letterSpacing={0.1}>
                    PHOTO
                  </Text>
                </>
              )}

              {/* Name */}
              <Text position={[0, -0.04, 0.001]} fontSize={0.038} color="#e8ede8"
                anchorX="center" anchorY="middle" fontWeight={700} letterSpacing={0.04}>
                MAYOPO ADEOYE
              </Text>

              {/* Role */}
              <Text position={[0, -0.1, 0.001]} fontSize={0.024} color="#7a8c7a"
                anchorX="center" anchorY="middle" letterSpacing={0.1}>
                FULL STACK DEVELOPER
              </Text>

              {/* Divider */}
              <mesh position={[0, -0.175, 0.001]}>
                <planeGeometry args={[0.6, 0.002]} />
                <meshStandardMaterial color="#39ff6a" transparent opacity={0.15} />
              </mesh>

              {/* Assessment score */}
              <Text position={[0, -0.24, 0.001]} fontSize={0.048} color="#39ff6a"
                anchorX="center" anchorY="middle" fontWeight={700} letterSpacing={0.02}>
                4.85 / 5.00
              </Text>
              <Text position={[0, -0.305, 0.001]} fontSize={0.02} color="#1e8c3a"
                anchorX="center" anchorY="middle" letterSpacing={0.12}>
                STRONG HIRE · FINTECH
              </Text>

              {/* Barcode */}
              <mesh position={[0, -0.375, 0.001]}>
                <planeGeometry args={[0.58, 0.055]} />
                <meshStandardMaterial map={barcodeTexture.current} transparent />
              </mesh>

              {/* Footer */}
              <mesh position={[0, -0.445, 0]}>
                <planeGeometry args={[0.71, 0.075]} />
                <meshStandardMaterial color="#050a05" />
              </mesh>
              <Text position={[-0.3, -0.445, 0.001]} fontSize={0.018} color="#3d4d3d"
                anchorX="left" anchorY="middle" letterSpacing={0.1}>
                Lagos, NG
              </Text>
              <Text position={[0.28, -0.445, 0.001]} fontSize={0.018} color="#1e8c3a"
                anchorX="right" anchorY="middle" letterSpacing={0.06}>
                ● AVAILABLE
              </Text>
              <mesh position={[0, -0.408, 0.001]}>
                <planeGeometry args={[0.71, 0.001]} />
                <meshStandardMaterial color="#39ff6a" transparent opacity={0.08} />
              </mesh>
            </group>

            {/* ── BACK FACE ── */}
            <RoundedBox args={[0.71, 1, 0.02]} radius={0.03} smoothness={4}
              position={[0, 0, -0.011]} rotation={[0, Math.PI, 0]} castShadow receiveShadow>
              <meshPhysicalMaterial
                color="#050a05"
                metalness={0.3}
                roughness={0.2}
                clearcoat={0.8}
                clearcoatRoughness={0.2}
              />
            </RoundedBox>

            {/* Back scanlines */}
            <mesh position={[0, 0, -0.022]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[0.71, 1]} />
              <meshStandardMaterial
                map={scanTexture.current}
                transparent opacity={0.15} depthWrite={false}
              />
            </mesh>

            {/* Back content */}
            <group position={[0, 0, -0.022]} rotation={[0, Math.PI, 0]}>
              {/* Header */}
              <mesh position={[0, 0.44, 0.001]}>
                <planeGeometry args={[0.71, 0.09]} />
                <meshStandardMaterial color="#050a05" />
              </mesh>
              <Text position={[0, 0.44, 0.002]} fontSize={0.024} color="#39ff6a"
                anchorX="center" anchorY="middle" letterSpacing={0.14} fontWeight={700}>
                ❯ SCAN TO VISIT PORTFOLIO
              </Text>
              <mesh position={[0, 0.395, 0.002]}>
                <planeGeometry args={[0.71, 0.002]} />
                <meshStandardMaterial color="#39ff6a" emissive="#39ff6a" emissiveIntensity={0.3} />
              </mesh>

              {/* QR code */}
              {qrTexture ? (
                <mesh position={[0, 0.07, 0.001]}>
                  <planeGeometry args={[0.46, 0.46]} />
                  <meshStandardMaterial map={qrTexture} />
                </mesh>
              ) : (
                <Text position={[0, 0.07, 0.001]} fontSize={0.025} color="#3d4d3d"
                  anchorX="center" anchorY="middle">
                  LOADING QR...
                </Text>
              )}

              {/* Divider */}
              <mesh position={[0, -0.19, 0.001]}>
                <planeGeometry args={[0.6, 0.002]} />
                <meshStandardMaterial color="#39ff6a" transparent opacity={0.12} />
              </mesh>

              {/* Info block */}
              {[
                ["URL",    "mayopo.netlify.app"],
                ["GITHUB", "MAKE-star"],
                ["EMAIL",  "adeoyemayopo..."],
                ["LOC",    "Lagos, NG"],
              ].map(([k, v], i) => (
                <group key={k} position={[0, -0.26 - i * 0.072, 0.001]}>
                  <Text position={[-0.28, 0, 0]} fontSize={0.019} color="#3d4d3d"
                    anchorX="left" anchorY="middle" letterSpacing={0.12}>
                    {k}
                  </Text>
                  <Text position={[-0.1, 0, 0]} fontSize={0.02} color="#7a8c7a"
                    anchorX="left" anchorY="middle" letterSpacing={0.04}>
                    {v}
                  </Text>
                </group>
              ))}

              {/* Footer */}
              <mesh position={[0, -0.445, 0]}>
                <planeGeometry args={[0.71, 0.075]} />
                <meshStandardMaterial color="#050a05" />
              </mesh>
              <Text position={[0, -0.445, 0.001]} fontSize={0.018} color="#1e8c3a"
                anchorX="center" anchorY="middle" letterSpacing={0.1}>
                ┌MA┐ · EST. 2019
              </Text>
              <mesh position={[0, -0.408, 0.001]}>
                <planeGeometry args={[0.71, 0.001]} />
                <meshStandardMaterial color="#39ff6a" transparent opacity={0.08} />
              </mesh>
            </group>
          </group>
        </RigidBody>
      </group>

      {/* Rope mesh */}
      <mesh ref={ropeMesh} castShadow receiveShadow>
        <meshStandardMaterial map={ropeTexture.current} roughness={0.85} metalness={0} />
      </mesh>
    </>
  );
}

// ── Canvas — James's setup with updated lighting for terminal palette ─────────
export default function BadgeCanvas({ isMobile }) {
  const fov = isMobile ? 28 : 25;
  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov }}
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.85,
      }}
      style={{ pointerEvents: "auto" }}
    >
      <GradientBackground />

      {/* Lighting — cooler/greener tint to match terminal palette */}
      <directionalLight
        position={[8, 10, 6]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-6, 4, 4]} intensity={1.0} color="#39ff6a" />
      <pointLight position={[6, 2, -4]}  intensity={0.8} color="#0a1a0a" />
      <ambientLight intensity={0.45} />

      <Suspense fallback={null}>
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Badge isMobile={isMobile} />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
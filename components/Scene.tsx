
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Text, Environment, PerspectiveCamera, Sparkles, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Section } from '../types';

// Defining intrinsic Three.js elements as variables to fix JSX type errors in environments where the R3F namespace augmentation is not recognized.
const Points = 'points' as any;
const BufferGeometry = 'bufferGeometry' as any;
const BufferAttribute = 'bufferAttribute' as any;
const PointsMaterial = 'pointsMaterial' as any;
const Mesh = 'mesh' as any;
const SphereGeometry = 'sphereGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const SpotLight = 'spotLight' as any;
const Fog = 'fog' as any;

const BackgroundPoints = () => {
  const points = useMemo(() => {
    const p = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      p[i * 3] = (Math.random() - 0.5) * 100;
      p[i * 3 + 1] = (Math.random() - 0.5) * 100;
      p[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null!);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0003;
      ref.current.rotation.x += 0.0001;
    }
  });

  return (
    /* Using PascalCase variable to bypass intrinsic element type checks */
    <Points ref={ref}>
      <BufferGeometry>
        <BufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </BufferGeometry>
      <PointsMaterial size={0.12} color="#ff0080" transparent opacity={0.3} />
    </Points>
  );
};

const AbstractSphere = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime();
      mesh.current.rotation.x = Math.sin(time * 0.15) * 0.2;
      mesh.current.rotation.y = Math.cos(time * 0.25) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      {/* Using PascalCase variable to bypass intrinsic element type checks */}
      <Mesh ref={mesh} position={[0, 0, -25]}>
        <SphereGeometry args={[8, 64, 64]} />
        <MeshDistortMaterial
          color="#2d0a1b"
          emissive="#ff0080"
          emissiveIntensity={0.15}
          roughness={0.05}
          metalness={1}
          distort={0.4}
          speed={2}
        />
      </Mesh>
    </Float>
  );
};

const CameraController = ({ section }: { section: Section }) => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const config: Record<Section, { x: number; y: number; z: number; rx: number; ry: number }> = {
      [Section.HERO]: { x: 0, y: 0, z: 20, rx: 0, ry: 0 },
      [Section.ABOUT]: { x: -10, y: 3, z: 18, rx: 0, ry: 0.5 },
      [Section.SKILLS]: { x: 0, y: 12, z: 15, rx: -0.6, ry: 0 },
      [Section.PROJECTS]: { x: 18, y: -2, z: 25, rx: 0.2, ry: -0.6 },
      [Section.EXPERIENCE]: { x: -8, y: -22, z: 28, rx: 0.7, ry: 0.5 },
      [Section.ACHIEVEMENTS]: { x: 15, y: 22, z: 28, rx: -0.7, ry: -0.5 },
      [Section.CONTACT]: { x: 0, y: 0, z: 16, rx: 0, ry: 0 },
    };

    const target = config[section];
    
    gsap.to(camera.position, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: 3,
      ease: 'expo.inOut',
      overwrite: 'auto'
    });

    gsap.to(camera.rotation, {
      x: target.rx,
      y: target.ry,
      duration: 3,
      ease: 'expo.inOut',
      overwrite: 'auto'
    });
  }, [section, camera]);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 2 - camera.position.x * 0.01) * 0.04;
    camera.position.y += (mouse.current.y * 2 - camera.position.y * 0.01) * 0.04;
    camera.lookAt(0, 0, -18);
  });

  return null;
};

// Fix: Define SceneProps interface
interface SceneProps {
  currentSection: Section;
}

const Scene: React.FC<SceneProps> = ({ currentSection }) => {
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={35} />
        <CameraController section={currentSection} />
        
        {/* Using PascalCase variable to bypass intrinsic element type checks */}
        <AmbientLight intensity={0.7} />
        <PointLight position={[20, 20, 20]} intensity={5} color="#ff0080" />
        <PointLight position={[-20, -20, -20]} intensity={3} color="#db2777" />
        <SpotLight position={[-50, 50, 30]} angle={0.3} penumbra={1} intensity={5} color="#ffffff" castShadow />

        <Stars radius={300} depth={60} count={6000} factor={10} saturation={1} fade speed={2} />
        <Sparkles count={200} scale={60} size={4} speed={0.5} color="#ff0080" />
        
        <BackgroundPoints />

        {currentSection === Section.HERO && (
          <Float speed={4} rotationIntensity={0.3} floatIntensity={0.6}>
            <Text
              position={[0, 5, -20]}
              fontSize={10}
              color="#ffffff"
              font="https://fonts.gstatic.com/s/orbitron/v30/yMJR8V-923fS75eQp_o5.woff2"
              fillOpacity={0.05}
              strokeWidth={0.02}
              strokeColor="#ff0080"
            >
              FUTURE
            </Text>
          </Float>
        )}

        <AbstractSphere />
        
        <Environment preset="night" />
        {/* Using PascalCase variable to bypass intrinsic element type checks */}
        <Fog attach="fog" args={['#000', 30, 130]} />
      </Canvas>
    </div>
  );
};

export default Scene;

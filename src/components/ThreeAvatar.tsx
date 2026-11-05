import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeAvatarProps {
  avatarPhotoUrl?: string;
  name?: string;
}

export const ThreeAvatar: React.FC<ThreeAvatarProps> = ({
  avatarPhotoUrl,
  name = 'Adithyan'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animFrameId = useRef<number>(0);
  const pointerPos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 420;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Lights
    const ambLight = new THREE.AmbientLight(0x0f172a, 2.0);
    scene.add(ambLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 3.5, 30);
    cyanLight.position.set(8, 8, 12);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 3.0, 30);
    purpleLight.position.set(-8, -6, 10);
    scene.add(purpleLight);

    // Root Avatar Group (3–12 parts procedural composite)
    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);

    // 1. Procedural Cyber Torso / Shoulders
    const torsoGeo = new THREE.CylinderGeometry(2.2, 3.6, 4.2, 8, 1, false);
    const torsoMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false
    });
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.y = -3.2;
    avatarGroup.add(torso);

    // 2. Torso Wireframe Exoskeleton
    const torsoWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const torsoWire = new THREE.Mesh(torsoGeo, torsoWireMat);
    torso.add(torsoWire);

    // 3. Cyber Collar / Neck Ring
    const neckGeo = new THREE.CylinderGeometry(1.2, 1.4, 1.2, 16);
    const neckMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.95,
      roughness: 0.15
    });
    const neck = new THREE.Mesh(neckGeo, neckMat);
    neck.position.y = -0.6;
    avatarGroup.add(neck);

    // 4. Interactive Head Group
    const headGroup = new THREE.Group();
    headGroup.position.y = 1.6;
    avatarGroup.add(headGroup);

    // 5. Head Cranium Geometry
    const headGeo = new THREE.SphereGeometry(2.1, 24, 24);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x060d1d,
      roughness: 0.15,
      metalness: 0.85
    });
    const head = new THREE.Mesh(headGeo, headMat);
    headGroup.add(head);

    // 6. Cyber Neural Wireframe Layer
    const neuralGeo = new THREE.SphereGeometry(2.25, 14, 14);
    const neuralMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const neuralLayer = new THREE.Mesh(neuralGeo, neuralMat);
    headGroup.add(neuralLayer);

    // 7. Futuristic Cyber Visor (HUD)
    const visorGeo = new THREE.BoxGeometry(2.9, 0.9, 1.4);
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.85,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.6,
      transparent: true,
      opacity: 0.9
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.15, 1.55);
    headGroup.add(visor);

    // 8. Visor Scanline Beam
    const beamGeo = new THREE.PlaneGeometry(2.7, 0.1);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(0, 0, 2.27);
    headGroup.add(beam);

    // 9. Floating Holographic Matrix Halo Ring
    const haloGeo = new THREE.TorusGeometry(3.6, 0.08, 12, 48);
    const haloMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 0.8,
      wireframe: true
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = Math.PI / 2.4;
    avatarGroup.add(halo);

    // 10. Floating Holographic User Photo Badge (Activated if photo is uploaded)
    let photoMesh: THREE.Mesh | null = null;
    if (avatarPhotoUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        avatarPhotoUrl,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          const photoGeo = new THREE.CircleGeometry(1.6, 32);
          const photoMat = new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            opacity: 0.95,
            side: THREE.DoubleSide
          });
          photoMesh = new THREE.Mesh(photoGeo, photoMat);
          photoMesh.position.set(0, -3.2, 2.2);
          avatarGroup.add(photoMesh);
        },
        undefined,
        (err) => console.warn('Could not load avatar photo texture:', err)
      );
    }

    // Pointer Tracker within avatar bounds or screen
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - (rect.left + rect.width / 2);
      const clientY = e.clientY - (rect.top + rect.height / 2);
      pointerPos.current.targetX = Math.max(-1, Math.min(1, clientX / (rect.width / 2)));
      pointerPos.current.targetY = Math.max(-1, Math.min(1, clientY / (rect.height / 2)));
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();

    function tick() {
      if (document.hidden) {
        animFrameId.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth damping on head and avatar orientation
      pointerPos.current.x = THREE.MathUtils.damp(
        pointerPos.current.x,
        pointerPos.current.targetX,
        4.0,
        delta
      );
      pointerPos.current.y = THREE.MathUtils.damp(
        pointerPos.current.y,
        pointerPos.current.targetY,
        4.0,
        delta
      );

      // Natural breathing & floating motion
      avatarGroup.position.y = Math.sin(elapsed * 1.5) * 0.25;

      // Head tracks pointer
      headGroup.rotation.y = pointerPos.current.x * 0.45;
      headGroup.rotation.x = -pointerPos.current.y * 0.35;

      // Slight body turn
      torso.rotation.y = pointerPos.current.x * 0.15;

      // Visor beam scan oscillation
      beam.position.y = 0.15 + Math.sin(elapsed * 4.0) * 0.35;

      // Orbiting Halo ring rotation
      halo.rotation.z = elapsed * 0.8;
      halo.rotation.x = Math.PI / 2.4 + Math.sin(elapsed * 1.0) * 0.1;

      // Neural layer slow counter-rotation
      neuralLayer.rotation.y = -elapsed * 0.3;

      renderer.render(scene, camera);
      animFrameId.current = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      torsoGeo.dispose();
      torsoMat.dispose();
      torsoWireMat.dispose();
      neckGeo.dispose();
      neckMat.dispose();
      headGeo.dispose();
      headMat.dispose();
      neuralGeo.dispose();
      neuralMat.dispose();
      visorGeo.dispose();
      visorMat.dispose();
      beamGeo.dispose();
      beamMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [avatarPhotoUrl]);

  return (
    <div
      className="relative flex flex-col items-center justify-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-[320px] h-[380px] sm:w-[380px] sm:h-[440px] cursor-grab active:cursor-grabbing relative z-10"
      />

      {/* Futuristic Status Badge under Avatar */}
      <div className="absolute bottom-2 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-950/50 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
        <span>{avatarPhotoUrl ? 'HOLOGRAPHIC AVATAR // SYNCED' : '3D NEURAL AVATAR // ACTIVE'}</span>
      </div>

      {/* Cyber Corner Decals */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-500/40 pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-purple-500/40 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-500/40 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-purple-500/40 pointer-events-none" />
    </div>
  );
};

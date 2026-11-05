import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BackgroundTheme } from '../types/portfolio';

interface ThreeBackgroundProps {
  density?: 'low' | 'medium' | 'high';
  activeCameraPreset?: 'default' | 'orbit' | 'neural' | 'deep';
  zenMode?: boolean;
  backgroundTheme: BackgroundTheme;
}

// Reusable math vectors to prevent garbage collection inside animation loop
const _pointerTarget = new THREE.Vector2(0, 0);
const _pointerCurrent = new THREE.Vector2(0, 0);

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  density = 'high',
  activeCameraPreset = 'default',
  zenMode = false,
  backgroundTheme = '3d'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameIdRef = useRef<number>(0);
  const timeoutIdRef = useRef<number>(0);

  useEffect(() => {
    // Only mount and run Three.js canvas in '3d' mode!
    if (backgroundTheme !== '3d') return;
    const container = containerRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0018);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 75);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Ambient & Directional Cyber Lighting with Green / Emerald Glow
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00ff88, 2.5);
    dirLight1.position.set(40, 50, 40);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x10b981, 2.2);
    dirLight2.position.set(-40, -30, 30);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0x00f0ff, 1.8);
    dirLight3.position.set(0, 40, -30);
    scene.add(dirLight3);

    // 1. Procedural Starfield Particles with Green / Emerald / Cyan
    const starCount = isSoftwareGl || density === 'low' ? 600 : density === 'medium' ? 1200 : 2000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const emeraldColor = new THREE.Color(0x10b981);
    const neonGreen = new THREE.Color(0x00ff88);
    const cyanColor = new THREE.Color(0x00f0ff);
    const purpleColor = new THREE.Color(0xc084fc);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPos[i3] = (Math.random() - 0.5) * 320;
      starPos[i3 + 1] = (Math.random() - 0.5) * 320;
      starPos[i3 + 2] = (Math.random() - 0.5) * 250;

      const choice = Math.random();
      const col = choice < 0.35 ? neonGreen : choice < 0.65 ? emeraldColor : choice < 0.85 ? cyanColor : purpleColor;
      starColors[i3] = col.r;
      starColors[i3 + 1] = col.g;
      starColors[i3 + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Procedural circle point texture
    const pointCanvas = document.createElement('canvas');
    pointCanvas.width = 32;
    pointCanvas.height = 32;
    const ctx = pointCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(0, 240, 255, 0.8)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const starTexture = new THREE.CanvasTexture(pointCanvas);
    starTexture.colorSpace = THREE.SRGBColorSpace;

    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      map: starTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 2. Floating Procedural Tech Artifacts (Group)
    const techGroup = new THREE.Group();
    scene.add(techGroup);

    // Artifact A: Quantum Qubit Cage
    const qubitGroup = new THREE.Group();
    const cageGeo = new THREE.IcosahedronGeometry(7, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      wireframe: true,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    qubitGroup.add(cageMesh);

    const qubitCoreGeo = new THREE.SphereGeometry(3.2, 16, 16);
    const qubitCoreMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.95
    });
    const qubitCoreMesh = new THREE.Mesh(qubitCoreGeo, qubitCoreMat);
    qubitGroup.add(qubitCoreMesh);
    qubitGroup.position.set(-35, 18, -10);
    techGroup.add(qubitGroup);

    // Artifact B: Neural Tensor Core
    const tensorGroup = new THREE.Group();
    const cubeGeo = new THREE.BoxGeometry(6.5, 6.5, 6.5);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      wireframe: true,
      emissive: 0xa855f7,
      emissiveIntensity: 0.7,
      roughness: 0.1,
      metalness: 0.9
    });
    const tensorCube = new THREE.Mesh(cubeGeo, cubeMat);
    tensorGroup.add(tensorCube);

    const ringGeo = new THREE.TorusGeometry(6, 0.15, 8, 32);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.5,
      metalness: 0.9
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 3;
    tensorGroup.add(ring1);
    tensorGroup.add(ring2);
    tensorGroup.position.set(38, -16, -15);
    techGroup.add(tensorGroup);

    // Artifact C: Floating Data Octahedron Crystal
    const crystalGroup = new THREE.Group();
    const octGeo = new THREE.OctahedronGeometry(6, 0);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      wireframe: true,
      emissive: 0x059669,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.9
    });
    const crystalMesh = new THREE.Mesh(octGeo, octMat);
    crystalGroup.add(crystalMesh);
    crystalGroup.position.set(32, 22, -25);
    techGroup.add(crystalGroup);

    // 3. Neural Network Constellation Lines
    const nodeCount = isSoftwareGl ? 18 : 36;
    const nodePositions: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodePositions.push(new THREE.Vector3(
        (Math.random() - 0.5) * 110,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 50
      ));
    }

    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 28) {
          linePoints.push(nodePositions[i], nodePositions[j]);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });
    const constellationLines = new THREE.LineSegments(lineGeo, lineMat);
    techGroup.add(constellationLines);

    // Pointer Parallax Tracking
    const handlePointerMove = (e: MouseEvent) => {
      _pointerTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      _pointerTarget.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Frame Pacing for Software WebGL
    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          timeoutIdRef.current = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          timeoutIdRef.current = window.setTimeout(cb, 60);
        }
      };
      timeoutIdRef.current = window.setTimeout(poll, 5);
    }

    // Animation Loop with Clock
    const clock = new THREE.Clock();

    function tick() {
      if (document.hidden) {
        animFrameIdRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      _pointerCurrent.x = THREE.MathUtils.damp(_pointerCurrent.x, _pointerTarget.x, 2.5, delta);
      _pointerCurrent.y = THREE.MathUtils.damp(_pointerCurrent.y, _pointerTarget.y, 2.5, delta);

      let targetCamX = _pointerCurrent.x * 12;
      let targetCamY = -_pointerCurrent.y * 10;
      let targetCamZ = 75;

      if (activeCameraPreset === 'orbit') {
        targetCamX += Math.sin(elapsed * 0.4) * 20;
        targetCamZ = 65;
      } else if (activeCameraPreset === 'neural') {
        targetCamX = _pointerCurrent.x * 8;
        targetCamZ = 50;
      } else if (activeCameraPreset === 'deep') {
        targetCamZ = 95;
      }

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 2.0, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 2.0, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 2.0, delta);
      camera.lookAt(0, 0, 0);

      starField.rotation.y = elapsed * 0.02;
      starField.rotation.x = elapsed * 0.008;

      qubitGroup.rotation.x = elapsed * 0.4;
      qubitGroup.rotation.y = elapsed * 0.6;
      qubitGroup.position.y = 18 + Math.sin(elapsed * 1.2) * 2.5;

      tensorGroup.rotation.y = elapsed * 0.5;
      tensorGroup.rotation.z = elapsed * 0.3;
      ring1.rotation.z = elapsed * 1.5;
      ring2.rotation.x = -elapsed * 1.2;
      tensorGroup.position.y = -16 + Math.cos(elapsed * 1.1) * 2.2;

      crystalGroup.rotation.y = elapsed * 0.7;
      crystalGroup.rotation.x = elapsed * 0.35;
      crystalGroup.position.y = 22 + Math.sin(elapsed * 1.4) * 2;

      constellationLines.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        animFrameIdRef.current = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      clearTimeout(timeoutIdRef.current);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      starTexture.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      qubitCoreGeo.dispose();
      qubitCoreMat.dispose();
      cubeGeo.dispose();
      cubeMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [density, activeCameraPreset, backgroundTheme]);

  // Mode 1: Light Colour Plain Background (Zero animation, clean, pristine)
  if (backgroundTheme === 'light') {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[#f8fafc] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/60 via-[#f8fafc] to-[#e2e8f0]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-cyber-grid opacity-35 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-[120px] pointer-events-none" />
      </div>
    );
  }

  // Mode 2: Dark Normal Simple Background (Zero animation, minimalist emerald dark)
  if (backgroundTheme === 'dark-simple') {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[#020b08] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/70 via-[#030e0a] to-[#010604]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      </div>
    );
  }

  // Mode 3: 3D Universe Cosmos (Animated WebGL)
  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
        zenMode ? 'opacity-100' : 'opacity-85'
      }`}
      aria-hidden="true"
    />
  );
};

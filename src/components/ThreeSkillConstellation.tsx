import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SkillItem } from '../types/portfolio';

interface ThreeSkillConstellationProps {
  skills: SkillItem[];
  onSelectSkill?: (skill: SkillItem) => void;
  selectedSkillId?: string;
}

export const ThreeSkillConstellation: React.FC<ThreeSkillConstellationProps> = ({
  skills,
  onSelectSkill,
  selectedSkillId
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(skills[0] || null);
  const animFrameId = useRef<number>(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || skills.length === 0) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 32);

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
    const ambLight = new THREE.AmbientLight(0x0f172a, 2.5);
    scene.add(ambLight);

    const light1 = new THREE.PointLight(0x00f0ff, 3.5, 40);
    light1.position.set(10, 15, 20);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xa855f7, 3.0, 40);
    light2.position.set(-10, -15, 20);
    scene.add(light2);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Central Core Sphere (AI / Core Computation)
    const coreGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      wireframe: true,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.8
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(core);

    // Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(10, 0.08, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    rootGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(14, 0.08, 8, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.35 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    rootGroup.add(ring2);

    // Skill Nodes in 3D Orbital Positions
    const nodeMeshes: { mesh: THREE.Mesh; skill: SkillItem; angle: number; radius: number; speed: number; yOffset: number }[] = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    skills.forEach((skill, idx) => {
      const radius = 8 + (idx % 3) * 3.5;
      const angle = (idx / skills.length) * Math.PI * 2;
      const yOffset = ((idx % 4) - 1.5) * 2.8;

      // Color based on status
      const isLearning = skill.status === 'learning';
      const nodeColor = isLearning ? 0xa855f7 : 0x00f0ff;

      const nodeGeo = new THREE.SphereGeometry(1.0, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColor,
        emissive: nodeColor,
        emissiveIntensity: 0.7,
        roughness: 0.2,
        metalness: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.userData = { skillId: skill.id };

      rootGroup.add(nodeMesh);
      nodeMeshes.push({
        mesh: nodeMesh,
        skill,
        angle,
        radius,
        speed: 0.25 + (idx % 3) * 0.1,
        yOffset
      });
    });

    // Handle Interactivity: Click on canvas to select node
    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map(n => n.mesh));

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const found = nodeMeshes.find(n => n.mesh === hitMesh);
        if (found) {
          setActiveSkill(found.skill);
          onSelectSkill?.(found.skill);
        }
      }
    };

    container.addEventListener('click', handleClick);

    const clock = new THREE.Clock();

    function tick() {
      if (document.hidden) {
        animFrameId.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = clock.getElapsedTime();

      // Rotate central core
      core.rotation.y = elapsed * 0.4;
      core.rotation.x = elapsed * 0.2;

      // Rotate orbital rings
      ring1.rotation.z = elapsed * 0.15;
      ring2.rotation.z = -elapsed * 0.12;

      // Move skill nodes along their orbits
      nodeMeshes.forEach((item) => {
        const currentAngle = item.angle + elapsed * item.speed * 0.4;
        item.mesh.position.x = Math.cos(currentAngle) * item.radius;
        item.mesh.position.z = Math.sin(currentAngle) * item.radius;
        item.mesh.position.y = item.yOffset + Math.sin(elapsed * 1.5 + item.angle) * 0.8;

        // Pulse selected node
        if (item.skill.id === (selectedSkillId || activeSkill?.id)) {
          item.mesh.scale.set(1.4, 1.4, 1.4);
        } else {
          item.mesh.scale.set(1.0, 1.0, 1.0);
        }
      });

      // Gentle group swaying
      rootGroup.rotation.y = Math.sin(elapsed * 0.2) * 0.15;

      renderer.render(scene, camera);
      animFrameId.current = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(animFrameId.current);
      container.removeEventListener('click', handleClick);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      nodeMeshes.forEach(n => {
        n.mesh.geometry.dispose();
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [skills, selectedSkillId, activeSkill?.id]);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 w-full p-4 rounded-2xl glass-panel border border-cyan-500/20 bg-slate-950/60">
      {/* 3D Constellation Canvas */}
      <div className="relative w-full lg:w-3/5 h-[360px] sm:h-[420px] flex items-center justify-center">
        <div ref={mountRef} className="w-full h-full cursor-pointer" />
        <div className="absolute top-3 left-3 px-3 py-1 bg-slate-900/80 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-400">
          3D SKILL CONSTELLATION // CLICK NODE TO INSPECT
        </div>
      </div>

      {/* Selected Skill Readout Card */}
      <div className="w-full lg:w-2/5 flex flex-col gap-4 p-5 rounded-xl bg-slate-900/80 border border-cyan-500/30">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
            {activeSkill?.category || 'Skill Node'}
          </span>
          <span className={`text-xs font-mono px-2 py-0.5 rounded ${
            activeSkill?.status === 'learning' ? 'bg-purple-900/40 text-purple-300 border border-purple-500/30' : 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30'
          }`}>
            {activeSkill?.status === 'learning' ? '⚡ Currently Learning' : '✓ Core Foundation'}
          </span>
        </div>

        <div>
          <h4 className="text-2xl font-bold font-heading text-white">{activeSkill?.name || 'Select a Node'}</h4>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            {activeSkill?.description || 'Click any revolving orbital node in the 3D space to inspect proficiency benchmarks and technical application.'}
          </p>
        </div>

        {activeSkill && (
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Proficiency Benchmark:</span>
              <span className="text-cyan-400 font-bold">{activeSkill.level}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  activeSkill.status === 'learning' ? 'bg-gradient-to-r from-purple-500 to-indigo-400' : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                }`}
                style={{ width: `${activeSkill.level}%` }}
              />
            </div>
            <div className="text-[11px] font-mono text-slate-400 pt-1">
              Editable directly via private Admin Dashboard.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

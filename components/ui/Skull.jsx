"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Skull() {
  const canvasRef = useRef();

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
    camera.position.set(0, 0, 5);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // Set clear color to transparent
    renderer.setClearColor(0x000000, 0.8); // 0x000000 represents black, 0 represents transparency

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 0.9);
    light.position.setScalar(10);
    light.castShadow = true;
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));

    // Mount renderer to canvas
    const canvas = canvasRef.current;
    canvas.appendChild(renderer.domElement);
    // Set canvas size to 100%
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Model loading
    const base = new THREE.Object3D();
    scene.add(base);

    const loader = new GLTFLoader();
    loader.load("/assets/3d/scene.gltf", (gltf) => {
      gltf.scene.scale.setScalar(0.4);
      base.add(gltf.scene);
    });

    // Event listener
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const pointOfIntersection = new THREE.Vector3();
    const onMouseMove = (event) => {
      if (typeof window !== "undefined") {
        mouse.x = (event.clientX / window?.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window?.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, pointOfIntersection);
        base.lookAt(pointOfIntersection);
      }
    };
    if (typeof window !== "undefined") {
      window?.addEventListener("mousemove", onMouseMove, false);
    }

    // Render loop
    const animate = () => {
      if (resize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      if (typeof window !== "undefined") {
        window?.removeEventListener("mousemove", onMouseMove);
      }
      renderer.dispose();
    };
  }, []);

  const resize = (renderer) => {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  };

  return (
    <div
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: "url('/assets/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

export default Skull;

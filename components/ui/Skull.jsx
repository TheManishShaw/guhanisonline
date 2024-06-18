"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Skull() {
  const canvasRef = useRef();

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 5);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // Set clear color to transparent
    renderer.setClearColor(0x000000, 0.2); // 0x000000 represents black, 0 represents transparency
    renderer.shadowMap.enabled = true;
    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(20, 20, 50);
    light.castShadow = true;
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.1));
    // Mount renderer to canvas
    const canvas = canvasRef.current;
    canvas.appendChild(renderer.domElement);
    // Set initial canvas size
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Model loading
    const base = new THREE.Object3D();
    scene.add(base);

    const loader = new GLTFLoader();
    loader.load("/assets/3d/scene.gltf", (gltf) => {
      gltf.scene.scale.setScalar(0.6);
      base.add(gltf.scene);
    });
    loader.receiveShadow = true;
    // Event listener
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
    plane.receiveShadow = true;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const pointOfIntersection = new THREE.Vector3();
    const onPointerMove = (event) => {
      let clientX, clientY;
      if (event.type === "mousemove") {
        clientX = event.clientX;
        clientY = event.clientY;
      } else if (event.type === "touchmove" && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      }

      if (clientX !== undefined && clientY !== undefined) {
        mouse.x = (clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, pointOfIntersection);
        base.lookAt(pointOfIntersection);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", onPointerMove, false);
      window.addEventListener("touchmove", onPointerMove, false);
      window.addEventListener("resize", onWindowResize, false);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Render loop
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", onPointerMove);
        window.removeEventListener("touchmove", onPointerMove);
        window.removeEventListener("resize", onWindowResize);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: "url('/assets/skull_bg.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

export default Skull;

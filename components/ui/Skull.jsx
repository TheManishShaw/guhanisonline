"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TypeAnimation } from "react-type-animation"; // Import your typing animation library
import { Music, Users, TrendingUp, Play, UserCheck, Zap } from "lucide-react";
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
      style={{
        position: "relative", // Make the parent relative for the absolute text
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: "url('/assets/skull_bg.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          top: "40px", // Place the text at the top
          left: "50%", // Center horizontally
          transform: "translateX(-50%)", // Adjust for center alignment
          color: "white",
          zIndex: 10,
        }}
      >
        <TypeAnimation
          sequence={[
            "Elevate Your Sound",
            1000,
            "Tailor Your Portfolio With Weekly Sessions",
            1000,
            "Sample Curated Loops Into Your Instrumentals",
            1000,
            "Partner With A Professional Producer",
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{
            fontSize: "4em",
            display: "inline-block",
            textAlign: "center",
          }}
          repeat={Infinity}
        />
      </div>
      <div
        className=""
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 bg-[#1C1B1B] p-4 md:p-6 px-8 md:px-28 rounded-lg bg-opacity-65 backdrop-blur-sm border border-[#5eead4]/20 hover:border-[#5eead4]/40 transition-all duration-500 ease-in-out hover:shadow-[0_0_30px_rgba(94,234,212,0.3)] hover:shadow-2xl animate-pulse-slow">
          <StatsItem 
            icon={<Music />} 
            text="1000+ Songs Produced" 
            onClick={() => window.location.href = '/beats'}
            description="Explore our songs collection"
          />
          <div className="text-white text-2xl font-light opacity-50 hidden md:block">|</div>
          <StatsItem 
            icon={<UserCheck />} 
            text="150+ Happy Clients" 
            onClick={() => window.location.href = '/clientele'}
            description="See our satisfied clients"
          />
          <div className="text-white text-2xl font-light opacity-50 hidden md:block">|</div>
          <StatsItem 
            icon={<Zap />} 
            text="Always Creating" 
            onClick={() => window.location.href = '/blogs'}
            description="Get in touch for new projects"
          />
        </div>
      </div>
    </div>
  );
}

export default Skull;

function StatsItem({ icon, text, onClick, description }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div 
      className="relative flex flex-col items-center gap-2 cursor-pointer group transition-all duration-300 ease-in-out"
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowTooltip(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowTooltip(false);
      }}
    >
      <div 
        className={`text-[#5eead4] transition-all duration-300 ease-in-out transform ${
          isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
        }`}
      >
        {React.cloneElement(icon, { 
          className: "w-7 h-7 md:w-8 md:h-8",
          size: undefined 
        })}
      </div>
      <span 
        className={`text-white text-lg md:text-xl whitespace-nowrap transition-all duration-300 ease-in-out ${
          isHovered ? 'text-[#5eead4] scale-105' : 'scale-100'
        }`}
      >
        {text}
      </span>
      
      {/* Animated background glow effect */}
      <div 
        className={`absolute inset-0 rounded-lg transition-all duration-300 ease-in-out ${
          isHovered ? 'bg-[#5eead4]/20 scale-110' : 'bg-transparent scale-100'
        }`}
        style={{ zIndex: -1 }}
      />
      
      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="absolute bottom-full mb-2 px-3 py-2 bg-black/80 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap transition-all duration-200 ease-in-out transform"
          style={{
            animation: 'fadeInUp 0.2s ease-out',
          }}
        >
          {description}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(94, 234, 212, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(94, 234, 212, 0);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

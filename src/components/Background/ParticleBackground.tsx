'use client';
import { useEffect, useRef, useState, useMemo } from 'react';

interface Node {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  targetOpacity: number;
  color: string;
  connections: number[];
  angle: number;
  rotationSpeed: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  console.log(nodes)
  const colors = useMemo(() => [
    '#EFDA1C', // Yellow
    '#00ffe0', // Cyan
    '#4ecdc4', // Teal
    '#a78bfa', // Purple
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize nodes
    const initNodes = () => {
      const newNodes: Node[] = [];
      const nodeCount = Math.min(50, Math.floor((window.innerWidth * window.innerHeight) / 20000));

      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 2,
          speed: Math.random() * 0.2 + 0.1,
          opacity: Math.random() * 0.3 + 0.2,
          targetOpacity: Math.random() * 0.3 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          connections: [],
          angle: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
        });
      }

      // Create connections between nodes
      newNodes.forEach((node, index) => {
        const maxConnections = 3;
        const possibleConnections = newNodes
          .map((_, i) => i)
          .filter(i => i !== index);
        
        const numConnections = Math.min(
          maxConnections,
          Math.floor(Math.random() * maxConnections) + 1
        );

        for (let i = 0; i < numConnections; i++) {
          const randomIndex = Math.floor(Math.random() * possibleConnections.length);
          const connectionIndex = possibleConnections[randomIndex];
          if (!node.connections.includes(connectionIndex)) {
            node.connections.push(connectionIndex);
          }
        }
      });

      setNodes(newNodes);
    };

    initNodes();

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with a subtle gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      setNodes(prevNodes => {
        return prevNodes.map(node => {
          // Move node in a circular pattern
          node.angle += node.rotationSpeed;
          node.x += Math.cos(node.angle) * node.speed;
          node.y += Math.sin(node.angle) * node.speed;

          // Wrap around screen
          if (node.x < 0) node.x = canvas.width;
          if (node.x > canvas.width) node.x = 0;
          if (node.y < 0) node.y = canvas.height;
          if (node.y > canvas.height) node.y = 0;

          // Calculate distance from mouse
          const dx = node.x - mousePosition.x;
          const dy = node.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Update opacity and size based on mouse distance
          if (distance < 150) {
            node.targetOpacity = 1;
            node.size = 6;
          } else {
            node.targetOpacity = Math.random() * 0.3 + 0.2;
            node.size = Math.random() * 4 + 2;
          }

          // Smooth opacity transition
          node.opacity += (node.targetOpacity - node.opacity) * 0.1;

          // Draw connections
          node.connections.forEach(connectionIndex => {
            const connectedNode = prevNodes[connectionIndex];
            if (connectedNode) {
              const distance = Math.sqrt(
                Math.pow(node.x - connectedNode.x, 2) +
                Math.pow(node.y - connectedNode.y, 2)
              );

              if (distance < 200) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(connectedNode.x, connectedNode.y);
                ctx.strokeStyle = `${node.color}${Math.floor(node.opacity * 50).toString(16).padStart(2, '0')}`;
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          });

          // Draw node
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fillStyle = `${node.color}${Math.floor(node.opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();

          // Draw glow effect
          const glow = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.size * 2
          );
          glow.addColorStop(0, `${node.color}${Math.floor(node.opacity * 255).toString(16).padStart(2, '0')}`);
          glow.addColorStop(1, `${node.color}00`);
          ctx.fillStyle = glow;
          ctx.fill();

          return node;
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [colors, mousePosition.x, mousePosition.y]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Create a new node with connections
    setNodes(prevNodes => {
      const newNode: Node = {
        x: clickX,
        y: clickY,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 0.2 + 0.1,
        opacity: 1,
        targetOpacity: 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      };

      // Connect to nearby nodes
      prevNodes.forEach((node, index) => {
        const distance = Math.sqrt(
          Math.pow(node.x - clickX, 2) +
          Math.pow(node.y - clickY, 2)
        );
        if (distance < 200 && Math.random() > 0.7) {
          newNode.connections.push(index);
          node.connections.push(prevNodes.length);
        }
      });

      return [...prevNodes, newNode];
    });
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    />
  );
};

export default ParticleBackground; 
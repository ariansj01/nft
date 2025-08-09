'use client';
import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  targetOpacity: number;
  color: string;
  angle: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const colors = ['#EFDA1C', '#00ffe0'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initNodes = () => {
      const newNodes: Node[] = [];
      const nodeCount = Math.min(20, Math.floor((window.innerWidth * window.innerHeight) / 60000));
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1.5,
          speed: Math.random() * 0.15 + 0.05,
          opacity: Math.random() * 0.3 + 0.2,
          targetOpacity: Math.random() * 0.3 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: Math.random() * Math.PI * 2,
        });
      }
      nodesRef.current = newNodes;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.angle += 0.003;
        node.x += Math.cos(node.angle) * node.speed;
        node.y += Math.sin(node.angle) * node.speed;

        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;

        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const distance = Math.hypot(dx, dy);
        node.targetOpacity = distance < 120 ? 0.9 : 0.25;
        node.opacity += (node.targetOpacity - node.opacity) * 0.08;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}${Math.floor(node.opacity * 255)
          .toString(16)
          .padStart(2, '0')}`;
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [colors]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      onMouseMove={handleMouseMove}
    />
  );
};

export default ParticleBackground;
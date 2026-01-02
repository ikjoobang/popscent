import { jsxRenderer } from 'hono/jsx-renderer'
import { html } from 'hono/html'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PopScent | Design Your Air</title>
        <meta name="description" content="PopScent - Premium Home Fragrance Brand by Brand Stone. Candles, Diffusers, Car & Room Fragrances" />
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {html`<style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: #fff;
            color: #000;
            overflow-x: hidden;
          }
          
          /* ============================================
             3D FACTORY PRODUCTION LINE - HERO SECTION
             ============================================ */
          
          .factory-hero {
            position: relative;
            min-height: 100vh;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          /* Animated Grid Background */
          .factory-grid {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
            background-size: 60px 60px;
            animation: gridMove 20s linear infinite;
          }
          @keyframes gridMove {
            0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
            100% { transform: perspective(500px) rotateX(60deg) translateY(60px); }
          }
          
          /* 3D Production Line Container */
          .production-line {
            position: absolute;
            bottom: 15%;
            left: 0;
            right: 0;
            height: 200px;
            perspective: 1000px;
          }
          
          /* Conveyor Belt */
          .conveyor {
            position: absolute;
            bottom: 0;
            left: -10%;
            right: -10%;
            height: 30px;
            background: linear-gradient(90deg, 
              transparent,
              rgba(59, 130, 246, 0.2) 10%,
              rgba(59, 130, 246, 0.4) 50%,
              rgba(59, 130, 246, 0.2) 90%,
              transparent
            );
            border-radius: 15px;
            overflow: hidden;
          }
          
          .conveyor::before {
            content: '';
            position: absolute;
            inset: 0;
            background: repeating-linear-gradient(
              90deg,
              transparent,
              transparent 30px,
              rgba(255,255,255,0.1) 30px,
              rgba(255,255,255,0.1) 32px
            );
            animation: conveyorMove 1s linear infinite;
          }
          @keyframes conveyorMove {
            0% { transform: translateX(0); }
            100% { transform: translateX(32px); }
          }
          
          /* Perfume Bottles on Production Line */
          .bottle-container {
            position: absolute;
            bottom: 40px;
            display: flex;
            gap: 120px;
            animation: bottlesMove 8s linear infinite;
          }
          @keyframes bottlesMove {
            0% { transform: translateX(-200px); }
            100% { transform: translateX(calc(100vw + 200px)); }
          }
          
          .perfume-bottle {
            position: relative;
            width: 60px;
            height: 100px;
            animation: bottleFloat 2s ease-in-out infinite;
          }
          .perfume-bottle:nth-child(2) { animation-delay: 0.3s; }
          .perfume-bottle:nth-child(3) { animation-delay: 0.6s; }
          .perfume-bottle:nth-child(4) { animation-delay: 0.9s; }
          .perfume-bottle:nth-child(5) { animation-delay: 1.2s; }
          
          @keyframes bottleFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          
          /* Bottle Body */
          .bottle-body {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 60px;
            background: linear-gradient(135deg, 
              rgba(255,255,255,0.3) 0%,
              rgba(255,255,255,0.1) 50%,
              rgba(255,255,255,0.2) 100%
            );
            border-radius: 8px 8px 12px 12px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 
              0 10px 40px rgba(59, 130, 246, 0.3),
              inset 0 0 20px rgba(255,255,255,0.1);
          }
          
          /* Liquid Inside */
          .bottle-liquid {
            position: absolute;
            bottom: 4px;
            left: 4px;
            right: 4px;
            height: 70%;
            border-radius: 4px 4px 8px 8px;
            animation: liquidWave 3s ease-in-out infinite;
          }
          .bottle-1 .bottle-liquid { background: linear-gradient(180deg, #fbbf24, #f59e0b); }
          .bottle-2 .bottle-liquid { background: linear-gradient(180deg, #a78bfa, #7c3aed); }
          .bottle-3 .bottle-liquid { background: linear-gradient(180deg, #34d399, #059669); }
          .bottle-4 .bottle-liquid { background: linear-gradient(180deg, #f472b6, #ec4899); }
          .bottle-5 .bottle-liquid { background: linear-gradient(180deg, #60a5fa, #3b82f6); }
          
          @keyframes liquidWave {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.95); }
          }
          
          /* Bottle Cap */
          .bottle-cap {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 25px;
            background: linear-gradient(180deg, #374151, #1f2937);
            border-radius: 4px 4px 2px 2px;
          }
          .bottle-cap::before {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 14px;
            height: 10px;
            background: linear-gradient(180deg, #4b5563, #374151);
            border-radius: 2px;
          }
          
          /* Scent Particles */
          .scent-particles {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 40px;
          }
          .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            animation: particleRise 2s ease-out infinite;
          }
          .particle:nth-child(1) { left: 30%; animation-delay: 0s; }
          .particle:nth-child(2) { left: 50%; animation-delay: 0.4s; }
          .particle:nth-child(3) { left: 70%; animation-delay: 0.8s; }
          
          @keyframes particleRise {
            0% { transform: translateY(0) scale(1); opacity: 0.8; }
            100% { transform: translateY(-30px) scale(0); opacity: 0; }
          }
          
          /* Robotic Arms */
          .robot-arm {
            position: absolute;
            bottom: 80px;
          }
          .robot-arm-1 { left: 20%; }
          .robot-arm-2 { left: 50%; }
          .robot-arm-3 { left: 80%; }
          
          .arm-base {
            width: 20px;
            height: 60px;
            background: linear-gradient(90deg, #374151, #4b5563, #374151);
            border-radius: 4px;
            position: relative;
          }
          .arm-segment {
            position: absolute;
            top: -30px;
            left: 50%;
            transform-origin: bottom center;
            width: 8px;
            height: 40px;
            background: linear-gradient(90deg, #6b7280, #9ca3af, #6b7280);
            border-radius: 4px;
            animation: armMove 3s ease-in-out infinite;
          }
          .robot-arm-1 .arm-segment { animation-delay: 0s; }
          .robot-arm-2 .arm-segment { animation-delay: 1s; }
          .robot-arm-3 .arm-segment { animation-delay: 2s; }
          
          @keyframes armMove {
            0%, 100% { transform: translateX(-50%) rotate(-20deg); }
            50% { transform: translateX(-50%) rotate(20deg); }
          }
          
          .arm-claw {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 16px;
            height: 16px;
            border: 3px solid #9ca3af;
            border-top: none;
            border-radius: 0 0 8px 8px;
          }
          
          /* Glow Effects */
          .glow-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            opacity: 0.4;
            animation: glowPulse 4s ease-in-out infinite;
          }
          .glow-1 { top: 20%; left: 10%; width: 200px; height: 200px; background: #3b82f6; }
          .glow-2 { top: 40%; right: 15%; width: 150px; height: 150px; background: #8b5cf6; animation-delay: 1s; }
          .glow-3 { bottom: 30%; left: 30%; width: 180px; height: 180px; background: #06b6d4; animation-delay: 2s; }
          
          @keyframes glowPulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 0.5; }
          }
          
          /* Hero Content */
          .hero-content {
            position: relative;
            z-index: 10;
            text-align: center;
            padding: 0 20px;
          }
          
          .hero-title {
            font-size: clamp(3rem, 12vw, 10rem);
            font-weight: 900;
            color: #fff;
            line-height: 0.9;
            letter-spacing: -0.04em;
            text-shadow: 0 0 80px rgba(59, 130, 246, 0.5);
            animation: titleGlow 3s ease-in-out infinite;
          }
          @keyframes titleGlow {
            0%, 100% { text-shadow: 0 0 80px rgba(59, 130, 246, 0.3); }
            50% { text-shadow: 0 0 120px rgba(59, 130, 246, 0.6); }
          }
          
          .hero-subtitle {
            font-size: clamp(1rem, 3vw, 1.5rem);
            color: rgba(255,255,255,0.6);
            margin-top: 24px;
            font-weight: 400;
            letter-spacing: 0.1em;
          }
          
          .hero-stats {
            display: flex;
            justify-content: center;
            gap: 48px;
            margin-top: 60px;
            flex-wrap: wrap;
          }
          .stat-item {
            text-align: center;
          }
          .stat-number {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 800;
            color: #3b82f6;
            text-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
          }
          .stat-label {
            font-size: 0.875rem;
            color: rgba(255,255,255,0.5);
            margin-top: 4px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          
          /* Scroll Indicator */
          .scroll-indicator {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            animation: scrollBounce 2s ease-in-out infinite;
          }
          .scroll-indicator span {
            color: rgba(255,255,255,0.4);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.2em;
          }
          .scroll-arrow {
            width: 24px;
            height: 24px;
            border-right: 2px solid rgba(255,255,255,0.4);
            border-bottom: 2px solid rgba(255,255,255,0.4);
            transform: rotate(45deg);
          }
          @keyframes scrollBounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(10px); }
          }
          
          /* ============================================
             FULLSCREEN VIDEO HERO - SIMPLE
             ============================================ */
          
          .fullscreen-hero {
            position: relative;
            width: 100%;
            height: 100vh;
            height: 100dvh;
            overflow: hidden;
            background: linear-gradient(180deg, #e8f4fc 0%, #d4e8f5 100%);
          }
          
          .fullscreen-video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
          }
          
          .scroll-indicator-simple {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10;
            animation: bounce 2s ease-in-out infinite;
          }
          .scroll-indicator-simple i {
            font-size: 28px;
            color: rgba(255,255,255,0.7);
          }
          @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(10px); }
          }
          
          /* ============================================
             TOSS STYLE BUSINESS PROCESS ANIMATION (BACKUP)
             ============================================ */
          
          .process-hero {
            position: relative;
            min-height: 100vh;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            padding: 100px 20px 60px;
          }
          
          .process-hero-title {
            font-size: clamp(2.5rem, 8vw, 5rem);
            font-weight: 900;
            color: #0f172a;
            text-align: center;
            margin-bottom: 16px;
            letter-spacing: -0.03em;
          }
          
          .process-hero-subtitle {
            font-size: clamp(1rem, 2.5vw, 1.25rem);
            color: #64748b;
            text-align: center;
            margin-bottom: 60px;
          }
          
          /* Process Flow Container */
          .process-flow {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            max-width: 1200px;
            padding: 40px;
          }
          
          /* Individual Process Step */
          .process-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            opacity: 0;
            animation: stepAppear 0.6s ease-out forwards;
          }
          .process-step:nth-child(1) { animation-delay: 0.1s; }
          .process-step:nth-child(2) { animation-delay: 0.3s; }
          .process-step:nth-child(3) { animation-delay: 0.5s; }
          .process-step:nth-child(4) { animation-delay: 0.7s; }
          .process-step:nth-child(5) { animation-delay: 0.9s; }
          .process-step:nth-child(6) { animation-delay: 1.1s; }
          .process-step:nth-child(7) { animation-delay: 1.3s; }
          .process-step:nth-child(8) { animation-delay: 1.5s; }
          
          @keyframes stepAppear {
            0% { opacity: 0; transform: translateY(30px) scale(0.8); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          
          /* Process Icon Circle - Clean & Professional */
          .process-icon {
            width: 72px;
            height: 72px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            animation: iconBounce 3s ease-in-out infinite;
            position: relative;
          }
          .process-icon::after {
            content: '';
            position: absolute;
            inset: -3px;
            border-radius: 23px;
            background: inherit;
            opacity: 0.15;
            filter: blur(8px);
            z-index: -1;
          }
          
          .process-step:nth-child(1) .process-icon { animation-delay: 0s; }
          .process-step:nth-child(2) .process-icon { animation-delay: 0.2s; }
          .process-step:nth-child(3) .process-icon { animation-delay: 0.4s; }
          .process-step:nth-child(4) .process-icon { animation-delay: 0.6s; }
          .process-step:nth-child(5) .process-icon { animation-delay: 0.8s; }
          .process-step:nth-child(6) .process-icon { animation-delay: 1.0s; }
          .process-step:nth-child(7) .process-icon { animation-delay: 1.2s; }
          .process-step:nth-child(8) .process-icon { animation-delay: 1.4s; }
          
          @keyframes iconBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          
          .process-icon:hover {
            transform: translateY(-12px) scale(1.1);
            box-shadow: 0 16px 48px rgba(0,0,0,0.15);
          }
          
          /* Icon Colors - Minimal Black & White with subtle accent */
          .icon-consult { background: #0f172a; color: white; }
          .icon-order { background: #1e293b; color: white; }
          .icon-produce { background: #0f172a; color: white; }
          .icon-pack { background: #1e293b; color: white; }
          .icon-inspect { background: #0f172a; color: white; }
          .icon-oem { background: #3b82f6; color: white; } /* Accent for key service */
          .icon-export { background: #1e293b; color: white; }
          .icon-sell { background: #0f172a; color: white; }
          
          /* Process Label */
          .process-label {
            font-size: 14px;
            font-weight: 700;
            color: #334155;
            text-align: center;
          }
          .process-label-en {
            font-size: 11px;
            font-weight: 500;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          /* Arrow Between Steps - Subtle */
          .process-arrow {
            font-size: 14px;
            color: #94a3b8;
            opacity: 0;
            animation: arrowAppear 0.4s ease-out forwards;
          }
          .process-arrow:nth-of-type(1) { animation-delay: 0.2s; }
          .process-arrow:nth-of-type(2) { animation-delay: 0.4s; }
          .process-arrow:nth-of-type(3) { animation-delay: 0.6s; }
          .process-arrow:nth-of-type(4) { animation-delay: 0.8s; }
          .process-arrow:nth-of-type(5) { animation-delay: 1.0s; }
          .process-arrow:nth-of-type(6) { animation-delay: 1.2s; }
          .process-arrow:nth-of-type(7) { animation-delay: 1.4s; }
          
          @keyframes arrowAppear {
            0% { opacity: 0; transform: translateX(-5px); }
            100% { opacity: 0.5; transform: translateX(0); }
          }
          
          /* Process Stats */
          .process-stats {
            display: flex;
            gap: 48px;
            margin-top: 60px;
            flex-wrap: wrap;
            justify-content: center;
          }
          .process-stat {
            text-align: center;
            opacity: 0;
            animation: statAppear 0.6s ease-out forwards;
          }
          .process-stat:nth-child(1) { animation-delay: 1.8s; }
          .process-stat:nth-child(2) { animation-delay: 2.0s; }
          .process-stat:nth-child(3) { animation-delay: 2.2s; }
          
          @keyframes statAppear {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          .process-stat-number {
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 800;
            color: #0f172a;
          }
          .process-stat-label {
            font-size: 14px;
            color: #64748b;
            margin-top: 4px;
          }
          
          /* Mobile Responsive */
          @media (max-width: 768px) {
            .process-flow {
              gap: 16px;
              padding: 20px;
            }
            .process-icon {
              width: 60px;
              height: 60px;
              font-size: 24px;
              border-radius: 18px;
            }
            .process-arrow {
              font-size: 18px;
            }
            .process-label {
              font-size: 12px;
            }
            .process-stats {
              gap: 32px;
            }
          }
          
          @media (max-width: 480px) {
            .process-flow {
              flex-direction: column;
              gap: 24px;
            }
            .process-arrow {
              transform: rotate(90deg);
            }
          }
          
          /* ============================================
             ORIGINAL ANIMATIONS (kept for other sections)
             ============================================ */
          
          /* Distribution Animation */
          .distribution-visual {
            width: 300px; height: 220px;
            position: relative;
          }
          .dist-box {
            position: absolute;
            width: 55px; height: 55px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border-radius: 10px;
            animation: moveBox 2.5s ease-in-out infinite;
            box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
          }
          .dist-box:nth-child(1) { left: 25px; animation-delay: 0s; }
          .dist-box:nth-child(2) { left: 122px; animation-delay: 0.4s; }
          .dist-box:nth-child(3) { left: 220px; animation-delay: 0.8s; }
          .dist-belt {
            position: absolute;
            bottom: 50px; left: 0; right: 0;
            height: 10px;
            background: linear-gradient(90deg, #e5e7eb, #d1d5db, #e5e7eb);
            border-radius: 5px;
          }
          @keyframes moveBox {
            0%, 100% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(-70px); opacity: 1; }
          }
          
          /* Trading Animation */
          .trading-visual {
            width: 220px; height: 220px;
            position: relative;
          }
          .globe-outer {
            width: 140px; height: 140px;
            border: 3px solid #fff;
            border-radius: 50%;
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            animation: spin 12s linear infinite;
          }
          .globe-inner {
            width: 100%; height: 100%;
            border: 2px solid rgba(255,255,255,0.2);
            border-radius: 50%;
            transform: rotateX(70deg);
          }
          .trade-pulse {
            position: absolute;
            top: 50%; left: 50%;
            width: 50px; height: 50px;
            background: rgba(59, 130, 246, 0.4);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: pulse 2.5s ease-out infinite;
          }
          .trade-pulse.delay-1 { animation-delay: 0.8s; }
          .trade-pulse.delay-2 { animation-delay: 1.6s; }
          @keyframes spin { to { transform: translate(-50%, -50%) rotate(360deg); } }
          @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
            100% { transform: translate(-50%, -50%) scale(5); opacity: 0; }
          }
          
          /* Development Animation */
          .dev-visual {
            width: 220px; height: 220px;
            position: relative;
          }
          .dev-particle {
            position: absolute;
            width: 24px; height: 24px;
            background: #000;
            border-radius: 50%;
            animation: assemble 3s ease-in-out infinite;
          }
          .dev-particle:nth-child(1) { top: 30px; left: 40px; --dx: -50px; --dy: -50px; animation-delay: 0s; }
          .dev-particle:nth-child(2) { top: 30px; right: 40px; --dx: 50px; --dy: -50px; animation-delay: 0.3s; }
          .dev-particle:nth-child(3) { bottom: 30px; left: 40px; --dx: -50px; --dy: 50px; animation-delay: 0.6s; }
          .dev-particle:nth-child(4) { bottom: 30px; right: 40px; --dx: 50px; --dy: 50px; animation-delay: 0.9s; }
          .dev-center {
            position: absolute;
            top: 50%; left: 50%;
            width: 50px; height: 50px;
            background: #3b82f6;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: centerPulse 3s ease-in-out infinite;
            box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
          }
          @keyframes assemble {
            0%, 100% { transform: translate(var(--dx), var(--dy)) scale(0.4); opacity: 0.2; }
            50% { transform: translate(0, 0) scale(1); opacity: 1; }
          }
          @keyframes centerPulse {
            0%, 100% { transform: translate(-50%, -50%) scale(0.7); }
            50% { transform: translate(-50%, -50%) scale(1.3); }
          }
          
          /* Chat Styles */
          .chat-bubble {
            position: fixed;
            bottom: 32px; right: 32px;
            width: 64px; height: 64px;
            background: #000;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            transition: transform 0.2s, box-shadow 0.2s;
            z-index: 1000;
          }
          .chat-bubble:hover { 
            transform: scale(1.1); 
            box-shadow: 0 12px 40px rgba(0,0,0,0.3);
          }
          
          .chat-window {
            position: fixed;
            bottom: 112px; right: 32px;
            width: 400px;
            max-width: calc(100vw - 64px);
            height: 520px;
            max-height: calc(100vh - 160px);
            background: #fff;
            border-radius: 24px;
            box-shadow: 0 16px 64px rgba(0,0,0,0.15);
            display: none;
            flex-direction: column;
            overflow: hidden;
            z-index: 999;
          }
          .chat-window.active { display: flex; }
          
          .chat-header {
            background: #000;
            color: #fff;
            padding: 20px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          
          .message {
            max-width: 85%;
            padding: 14px 18px;
            border-radius: 20px;
            font-size: 14px;
            line-height: 1.6;
          }
          .message.bot {
            background: #f3f4f6;
            align-self: flex-start;
            border-bottom-left-radius: 6px;
          }
          .message.user {
            background: #000;
            color: #fff;
            align-self: flex-end;
            border-bottom-right-radius: 6px;
          }
          .message.typing span {
            display: inline-block;
            width: 8px; height: 8px;
            background: #9ca3af;
            border-radius: 50%;
            margin: 0 3px;
            animation: typing 1.2s infinite;
          }
          .message.typing span:nth-child(2) { animation-delay: 0.2s; }
          .message.typing span:nth-child(3) { animation-delay: 0.4s; }
          @keyframes typing {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-10px); }
          }
          
          .chat-input-area {
            padding: 20px;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 12px;
          }
          .chat-input {
            flex: 1;
            padding: 14px 20px;
            border: 1px solid #e5e7eb;
            border-radius: 28px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
          }
          .chat-input:focus { border-color: #000; }
          .chat-send {
            width: 48px; height: 48px;
            background: #000;
            border: none;
            border-radius: 50%;
            color: #fff;
            cursor: pointer;
            transition: background 0.2s;
          }
          .chat-send:hover { background: #333; }
          
          /* ============================================
             MOBILE RESPONSIVE - COMPLETE OPTIMIZATION
             ============================================ */
          
          /* Tablet (768px and below) */
          @media (max-width: 768px) {
            /* Navigation */
            nav .max-w-7xl {
              padding-left: 16px;
              padding-right: 16px;
              height: 64px;
            }
            nav a.text-2xl {
              font-size: 18px;
            }
            
            /* Hero Video */
            .fullscreen-hero {
              height: 100vh;
              height: 100dvh; /* Dynamic viewport height for mobile */
            }
            .scroll-indicator-simple {
              bottom: 24px;
            }
            .scroll-indicator-simple i {
              font-size: 24px;
            }
            
            /* Sections - reduce min-height */
            section.min-h-screen {
              min-height: auto;
              padding: 80px 0;
            }
            
            /* Section padding */
            .max-w-7xl {
              padding-left: 20px;
              padding-right: 20px;
            }
            
            /* Typography scaling */
            h2.text-5xl, h2.text-7xl {
              font-size: 2.5rem !important;
              line-height: 1.1;
            }
            
            /* Distribution visual */
            .distribution-visual {
              width: 240px;
              height: 180px;
              transform: scale(0.85);
            }
            .dist-box {
              width: 45px;
              height: 45px;
            }
            .dist-box:nth-child(1) { left: 15px; }
            .dist-box:nth-child(2) { left: 97px; }
            .dist-box:nth-child(3) { left: 180px; }
            
            /* Trading visual */
            .trading-visual {
              width: 180px;
              height: 180px;
            }
            .globe-outer {
              width: 120px;
              height: 120px;
            }
            
            /* Development visual */
            .dev-visual {
              width: 180px;
              height: 180px;
            }
            .dev-particle {
              width: 20px;
              height: 20px;
            }
            .dev-center {
              width: 40px;
              height: 40px;
            }
            
            /* Partners section */
            .w-28 {
              width: 80px !important;
              height: 80px !important;
            }
            .w-28 span {
              font-size: 8px !important;
            }
            
            /* Numbers section */
            .text-\[8rem\], .text-\[12rem\] {
              font-size: 4rem !important;
            }
            .gap-16 {
              gap: 24px !important;
            }
            .text-4xl {
              font-size: 1.75rem !important;
            }
            
            /* Contact section */
            .text-2xl.text-gray-300, .text-3xl.text-gray-300 {
              font-size: 1rem !important;
              word-break: break-all;
            }
            .px-16 {
              padding-left: 32px !important;
              padding-right: 32px !important;
            }
            
            /* Footer */
            footer {
              padding: 40px 0;
            }
            footer .text-2xl {
              font-size: 1.25rem;
            }
            
            /* Chat */
            .chat-bubble { 
              bottom: 20px; 
              right: 20px; 
              width: 52px; 
              height: 52px; 
            }
            .chat-bubble i {
              font-size: 20px;
            }
            .chat-window { 
              bottom: 0;
              right: 0;
              left: 0;
              width: 100%;
              max-width: 100%;
              height: 70vh;
              border-radius: 24px 24px 0 0;
            }
            .chat-header {
              padding: 16px 20px;
            }
            .chat-messages {
              padding: 16px;
            }
            .chat-input-area {
              padding: 12px 16px;
              padding-bottom: max(12px, env(safe-area-inset-bottom));
            }
          }
          
          /* Mobile Small (480px and below) */
          @media (max-width: 480px) {
            /* Navigation */
            nav .max-w-7xl {
              height: 56px;
            }
            nav a.text-2xl {
              font-size: 16px;
            }
            #langToggle {
              padding: 6px 12px;
              font-size: 12px;
            }
            
            /* Typography */
            h2.text-5xl, h2.text-7xl {
              font-size: 2rem !important;
            }
            .text-xl {
              font-size: 1rem !important;
            }
            
            /* Sections */
            section.min-h-screen {
              padding: 60px 0;
            }
            .max-w-7xl {
              padding-left: 16px;
              padding-right: 16px;
            }
            .gap-16 {
              gap: 32px !important;
            }
            
            /* Visuals - hide on very small screens */
            .distribution-visual,
            .trading-visual,
            .dev-visual {
              transform: scale(0.7);
            }
            
            /* Partners */
            .w-28 {
              width: 64px !important;
              height: 64px !important;
            }
            .gap-10 {
              gap: 12px !important;
            }
            
            /* Numbers */
            .text-\[8rem\], .text-\[12rem\] {
              font-size: 2.5rem !important;
            }
            .mt-20 {
              margin-top: 40px !important;
            }
            .gap-24 {
              gap: 16px !important;
            }
            .text-4xl, .text-5xl {
              font-size: 1.5rem !important;
            }
            
            /* Contact */
            .text-5xl.tracking-tight {
              font-size: 2rem !important;
            }
            .mb-12 {
              margin-bottom: 24px !important;
            }
            .px-16 {
              padding-left: 24px !important;
              padding-right: 24px !important;
            }
            .py-5 {
              padding-top: 12px !important;
              padding-bottom: 12px !important;
            }
            
            /* Footer */
            footer .text-2xl {
              font-size: 1.125rem;
            }
          }
          
          /* Safe area for notched phones */
          @supports (padding: max(0px)) {
            nav {
              padding-top: env(safe-area-inset-top);
            }
            .chat-window {
              padding-bottom: env(safe-area-inset-bottom);
            }
          }
          
          /* Landscape mode on mobile */
          @media (max-height: 500px) and (orientation: landscape) {
            .fullscreen-hero {
              height: 100vh;
            }
            section.min-h-screen {
              min-height: auto;
              padding: 40px 0;
            }
            .scroll-indicator-simple {
              bottom: 16px;
            }
          }
        </style>`}
      </head>
      <body>
        {children}
      </body>
    </html>
  )
})

import React, { useRef, useEffect } from 'react';

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform float u_scale;
uniform float u_rotation;
uniform float u_proportion;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;
uniform float u_softness;
uniform float u_shapeScale;

#define PI 3.14159265358979323846
#define TWO_PI 6.28318530717958647692

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec3 blend_colors(vec3 c1, vec3 c2, vec3 c3, float mixer, float softness) {
  float s = softness * 0.5;
  float edge1 = 0.33 - s;
  float edge2 = 0.33 + s;
  float edge3 = 0.66 - s;
  float edge4 = 0.66 + s;

  if (mixer < edge2) {
    return mix(c1, c2, smoothstep(edge1, edge2, mixer));
  }
  if (mixer < edge4) {
    return mix(c2, c3, smoothstep(edge3, edge4, mixer));
  }
  return c3;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float t = u_time * 0.5;
    
    uv -= 0.5;
    uv.x *= u_resolution.x / u_resolution.y;
    uv = rotate(uv, u_rotation);
    
    // Scale and noise for organic feel
    float noise_scale = 1.0 + 5.0 * u_scale;
    float n = noise(uv * noise_scale + t);
    
    // Liquid distortion
    uv.x += u_distortion * sin(t + n * TWO_PI);
    uv.y += u_distortion * cos(t + n * TWO_PI);
    
    float iterations = clamp(u_swirlIterations, 1.0, 20.0);
    for(float i = 1.0; i <= 20.0; i += 1.0) {
        if (i > iterations) break;
        uv.x += (u_swirl * 0.5) / i * cos(t + i * 1.5 * uv.y);
        uv.y += (u_swirl * 0.5) / i * cos(t + i * 1.0 * uv.x);
    }

    vec2 checks_uv = uv * (1.0 + 3.0 * u_shapeScale);
    float shape = 0.5 + 0.5 * sin(checks_uv.x) * cos(checks_uv.y);
    float mixer = shape + 0.5 * (u_proportion - 0.5);

    vec3 finalColor = blend_colors(u_color1, u_color2, u_color3, clamp(mixer, 0.0, 1.0), u_softness);
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
};

export const LiquidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const program = gl.createProgram();
    const vShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!program || !vShader || !fShader) return;

    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // [OPTIMIZATION] Prefers Reduced Motion Check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      color1: gl.getUniformLocation(program, 'u_color1'),
      color2: gl.getUniformLocation(program, 'u_color2'),
      color3: gl.getUniformLocation(program, 'u_color3'),
      scale: gl.getUniformLocation(program, 'u_scale'),
      rotation: gl.getUniformLocation(program, 'u_rotation'),
      proportion: gl.getUniformLocation(program, 'u_proportion'),
      distortion: gl.getUniformLocation(program, 'u_distortion'),
      swirl: gl.getUniformLocation(program, 'u_swirl'),
      swirlIterations: gl.getUniformLocation(program, 'u_swirlIterations'),
      softness: gl.getUniformLocation(program, 'u_softness'),
      shapeScale: gl.getUniformLocation(program, 'u_shapeScale'),
    };

    const prismParams = {
      color1: hexToRgb('#000000'), // Pure Black
      color2: hexToRgb('#1E40AF'), // Deeper Blue
      color3: hexToRgb('#3B82F6'), // Bright Blue (instead of white)
      rotation: -0.87, // ~ -50deg
      proportion: 0.01,
      scale: 0.01,
      speed: 0.13,
      distortion: 0.0,
      swirl: 0.5,
      swirlIterations: 16,
      softness: 0.47,
      shapeScale: 0.45,
    };

    const resize = () => {
      // [OPTIMIZATION] Cap devicePixelRatio to 2.0 to avoid excessive GPU load on 3x+ displays
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    // [OPTIMIZATION] IntersectionObserver to pause animation when not visible
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    let animationFrame: number;
    const render = (time: number) => {
      if (!isVisible || prefersReducedMotion) {
        animationFrame = requestAnimationFrame(render);
        return;
      }

      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, time * 0.001 * prismParams.speed);
      gl.uniform3fv(uniforms.color1, prismParams.color1);
      gl.uniform3fv(uniforms.color2, prismParams.color2);
      gl.uniform3fv(uniforms.color3, prismParams.color3);
      gl.uniform1f(uniforms.scale, prismParams.scale);
      gl.uniform1f(uniforms.rotation, prismParams.rotation);
      gl.uniform1f(uniforms.proportion, prismParams.proportion);
      gl.uniform1f(uniforms.distortion, prismParams.distortion);
      gl.uniform1f(uniforms.swirl, prismParams.swirl);
      gl.uniform1f(uniforms.swirlIterations, prismParams.swirlIterations);
      gl.uniform1f(uniforms.softness, prismParams.softness);
      gl.uniform1f(uniforms.shapeScale, prismParams.shapeScale);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrame = requestAnimationFrame(render);
    };
    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-100"
      style={{ filter: 'contrast(1.3) brightness(1.1)' }}
    />
  );
};

export default LiquidBackground;

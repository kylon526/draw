uniform vec3 backgroundColor;
uniform vec2 translation;

void main() {
  vec2 pos = gl_FragCoord.xy + translation;
  gl_FragColor = vec4(backgroundColor, 1.0);

  if (mod(pos.x, 10.0) <= 1.0) {
    gl_FragColor = vec4(0, 0, 0, 1.0);
  }
}
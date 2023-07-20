uniform vec2 translation;
uniform int cellSize;
uniform vec3 backgroundColor;
uniform vec3 secondaryLineColor;

void main() {
    vec2 pos = gl_FragCoord.xy + translation.xy;
    gl_FragColor = vec4(backgroundColor, 1.0);

    if (int(floor(pos.x)) % cellSize == 0 || int(floor(pos.y)) % cellSize == 0) {
        gl_FragColor = vec4(secondaryLineColor, 1.0);
    }
}
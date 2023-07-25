uniform float cellSize;
uniform float scale;

uniform vec2 mouse;
uniform vec2 origin;
uniform vec2 translation;

uniform vec3 backgroundColor;
uniform vec3 primaryLineColor;
uniform vec3 secondaryLineColor;

void main() {
    vec2 pos = gl_FragCoord.xy + translation;
    gl_FragColor = vec4(backgroundColor, 1.0);

    vec2 offsetOrigin = origin - mouse;

    float scaledCellSize = cellSize * scale;

    float modOffsetX = mod(origin.x, scaledCellSize);
    float modOffsetY = mod(origin.y, scaledCellSize);

    vec4 lineColor2x = vec4(mix(backgroundColor, secondaryLineColor, min(1.0, max(0.0, (scale - 1.0)) / 3.0)), 1.0);
    vec4 lineColor4x = vec4(mix(backgroundColor, secondaryLineColor, min(1.0, max(0.0, (scale - 2.0)) / 6.0)), 1.0);
    vec4 lineColor8x = vec4(mix(backgroundColor, secondaryLineColor, min(1.0, max(0.0, (scale - 4.0)) / 12.0)), 1.0);
    vec4 lineColor16x = vec4(mix(backgroundColor, secondaryLineColor, min(1.0, max(0.0, (scale - 8.0)) / 24.0)), 1.0);
    vec4 lineColor32x = vec4(mix(backgroundColor, secondaryLineColor, min(1.0, max(0.0, (scale - 16.0)) / 48.0)), 1.0);
    vec4 lineColor64x = vec4(mix(backgroundColor, secondaryLineColor, min(1.0, max(0.0, (scale - 32.0)) / 96.0)), 1.0);

    if (mod(pos.x - modOffsetX, scaledCellSize / 64.0) <= 1.0) {
        gl_FragColor = lineColor32x;
    }

    if (mod(pos.y - modOffsetY, scaledCellSize / 64.0) <= 1.0) {
        gl_FragColor = lineColor32x;
    }

    if (mod(pos.x - modOffsetX, scaledCellSize / 32.0) <= 1.0) {
        gl_FragColor = lineColor32x;
    }

    if (mod(pos.y - modOffsetY, scaledCellSize / 32.0) <= 1.0) {
        gl_FragColor = lineColor32x;
    }
    
    if (mod(pos.x - modOffsetX, scaledCellSize / 16.0) <= 1.0) {
        gl_FragColor = lineColor16x;
    }

    if (mod(pos.y - modOffsetY, scaledCellSize / 16.0) <= 1.0) {
        gl_FragColor = lineColor16x;
    }
    
    if (mod(pos.x - modOffsetX, scaledCellSize / 8.0) <= 1.0) {
        gl_FragColor = lineColor8x;
    }

    if (mod(pos.y - modOffsetY, scaledCellSize / 8.0) <= 1.0) {
        gl_FragColor = lineColor8x;
    }

    if (mod(pos.x - modOffsetX, scaledCellSize / 4.0) <= 1.0) {
        gl_FragColor = lineColor4x;
    }

    if (mod(pos.y - modOffsetY, scaledCellSize / 4.0) <= 1.0) {
        gl_FragColor = lineColor4x;
    }

    if (mod(pos.x - modOffsetX, scaledCellSize / 2.0) <= 1.0) {
        gl_FragColor = lineColor2x;
    }

    if (mod(pos.y - modOffsetY, scaledCellSize / 2.0) <= 1.0) {
        gl_FragColor = lineColor2x;
    }

    if (mod(pos.x - modOffsetX, scaledCellSize) < 1.0) {
        gl_FragColor = vec4(primaryLineColor, 1.0);
    }

    if (mod(pos.y - modOffsetY, scaledCellSize) < 1.0) {
        gl_FragColor = vec4(primaryLineColor, 1.0);
    }  

    if (abs(pos.x - origin.x) < 1.0) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    if (abs(pos.y - origin.y) < 1.0) {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    }
}
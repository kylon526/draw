uniform vec2 translation;
uniform float cellSize;
uniform vec3 backgroundColor;
uniform vec3 secondaryLineColor;
uniform vec2 origin;
uniform float scale;
uniform vec2 mouse;

void main() {
    vec2 pos = gl_FragCoord.xy + translation;
    gl_FragColor = vec4(backgroundColor, 1.0);

    vec2 offsetOrigin = origin - mouse;

    float modOffsetX = mod(origin.x, cellSize * scale);
    float modOffsetY = mod(origin.y, cellSize * scale);

    if (mod(pos.x - modOffsetX, cellSize * scale) < 1.0) {
        gl_FragColor = vec4(secondaryLineColor, 1.0);
    }

    if (mod(pos.y - modOffsetY, cellSize * scale) < 1.0) {
        gl_FragColor = vec4(secondaryLineColor, 1.0);
    }

    if (abs(pos.x - origin.x) < 1.0) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    if (abs(pos.y - origin.y) < 1.0) {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    }
}

// gl_FragCoord = (0, 0)
// origin = (100, 100)
// translation = (25, 25)

// coordPos = (125, 125)

// 0,0                100,0


//         50,50



// 0,100              100,100

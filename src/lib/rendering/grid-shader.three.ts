import fragmentShader from './grid.frag.glsl?raw';
import vertexShader from './grid.vert.glsl?raw';
import { ShaderMaterial, Uniform, Vector2, Vector3 } from 'three';

export const gridMaterial = new ShaderMaterial({
    uniforms: {
        cellSize: new Uniform(32.0),
        translation: new Uniform( new Vector2() ),
        backgroundColor: new Uniform( new Vector3(39, 55, 77).divideScalar(255) ),
        secondaryLineColor: new Uniform( new Vector3(82, 109, 130).divideScalar(255) ),
        primaryLineColor: new Uniform( new Vector3(157, 178, 191).divideScalar(255) )
    },
    fragmentShader,
    vertexShader
});
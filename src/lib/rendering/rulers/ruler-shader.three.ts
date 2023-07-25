import { ShaderMaterial, Uniform, Vector2, Vector3 } from 'three';

import horizontalRulerFragmentShader from './horizontal/horizontal.frag.glsl?raw';
import horizontalRulerVertexShader from './horizontal/horizontal.vert.glsl?raw';

import verticalRulerFragmentShader from './vertical/vertical.frag.glsl?raw';
import verticalRulerVertexShader from './vertical/vertical.vert.glsl?raw';

export interface RulerUniforms {
	scale: Uniform<number>;
	translation: Uniform<Vector2>;
	backgroundColor: Uniform<Vector3>;
}

export const horizontalRulerShader = new ShaderMaterial({
	uniforms: {
		scale: new Uniform(1.0),
		translation: new Uniform(new Vector2()),
		backgroundColor: new Uniform(new Vector3(203, 228, 222).divideScalar(255))
	},
	fragmentShader: horizontalRulerFragmentShader,
	vertexShader: horizontalRulerVertexShader
});

export const verticalRulerShader = new ShaderMaterial({
	uniforms: {
		scale: new Uniform(1.0),
		translation: new Uniform(new Vector2()),
		backgroundColor: new Uniform(new Vector3(203, 228, 222).divideScalar(255))
	},
	fragmentShader: verticalRulerFragmentShader,
	vertexShader: verticalRulerVertexShader
});

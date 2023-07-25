import { BufferAttribute, BufferGeometry, Mesh, ShaderMaterial, Uniform } from 'three';
import { Rect } from '../geometry/rect.three';
import {
	horizontalRulerShader,
	verticalRulerShader,
	type RulerUniforms
} from './ruler-shader.three';

export class Ruler {
	private readonly rect: Rect;
	private readonly shaderMaterial: ShaderMaterial;
	private readonly geometry: BufferGeometry = new BufferGeometry();

	constructor(
		readonly left: number,
		readonly top: number,
		readonly right: number,
		readonly bottom: number
	) {
		this.rect = new Rect(left, top, right, bottom);

		if (right > bottom) {
			this.shaderMaterial = horizontalRulerShader;
		} else {
			this.shaderMaterial = verticalRulerShader;
		}
	}

	public create(): Mesh {
		this.geometry.setAttribute('position', new BufferAttribute(this.rect.vertices, 3));
		this.geometry.setIndex(this.rect.indices);
		return new Mesh(this.geometry, this.shaderMaterial);
	}

	public setUniform(name: keyof RulerUniforms, value: Uniform<unknown>) {
		this.shaderMaterial.uniforms[name] = value;
	}
}

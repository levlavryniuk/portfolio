<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	class Ball {
		pos: Vec = Vec.zero();
		vel: Vec = Vec.zero();
		radius: number = BALL_RADIUS;
		index: number;
		mass: number;

		constructor(radius: number, index: number, vel?: Vec, pos?: Vec) {
			this.radius = radius;
			vel && (this.vel = vel);
			pos && (this.pos = pos);
			this.index = index;
		}

		collidesWith(b: Ball): boolean {
			let radiusSum = b.radius + this.radius;

			let center1 = new Vec(this.pos.x + this.radius, this.pos.y + this.radius);

			let center2 = new Vec(b.pos.x + b.radius, b.pos.y + b.radius);

			let distance = center1.subFrom(center2).mag();

			if (distance > radiusSum) {:
				return false;
			} else {
				return true;
			}
		}
	}
	let balls: Ball[] = $state([]);

	function checkCollision() {
		balls.forEach((ball1) => {
			balls.forEach((ball2) => {
				if (ball1.index === ball2.index) return;
				if (ball1.collidesWith(ball2)) {
          const normal = ball1.pos.normal(ball2.pos);
          const newvel = 
				}
			});
		});
	}
	class Vec {
		x: number;
		y: number;
		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
		}

		mag() {
			return Math.abs(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)));
		}

		add(other: Vec) {
			return new Vec(this.x + other.x, this.y + other.y);
		}

		normal(other: Vec) {
			const newvec = this.subFrom(other);
			const mag = newvec.mag();
			return newvec.divideBy(mag);
		}

		subFrom(other: Vec) {
			return new Vec(this.x - other.x, this.y - other.y);
		}
		static zero() {
			return new Vec(0, 0);
		}
		divideBy(divisor: number) {
			const vec = {
				x: this.x / divisor,
				y: this.y / divisor
			};
			return new Vec(vec.x, vec.y);
		}
		multiplyBy(n: number) {
			const vec = {
				x: this.x * n,
				y: this.y * n
			};
			return new Vec(vec.x, vec.y);
		}
	}
	let canvas: HTMLCanvasElement | undefined = $state();
	let ctx: CanvasRenderingContext2D | undefined = $state();
	let pos: Vec = $state(new Vec(100, 100));
	let vel: Vec = $state(new Vec(0, 0));

	const GRAVITY = 0.09;
	const MOMENTUM_LOSS = 0.6;
	const BALL_RADIUS = 10;
	let animationId: number | null = $state(null);
	function applyGravity(enabled: boolean) {
		if (enabled) vel.y += GRAVITY;
	}
	function applyVelocity() {
		pos.y += vel.y;
		pos.x += vel.x;
	}
	function applyAirResistance() {
		vel.x = vel.x * 0.96;
	}

	function getNormal(vec: Vec) {}
	$inspect(pos.y);
	function doo() {
		if (!ctx || !canvas) return;
		ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
		ctx.fillRect(0, 0, 10, 10);
		ctx.beginPath();
		ctx.arc(pos.x, pos.y, BALL_RADIUS, 0, Math.PI * 2);
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.closePath();

		//ctx.strokeRect(pos.x - BALL_RADIUS, pos.y - BALL_RADIUS, BALL_RADIUS * 2, BALL_RADIUS * 2);
		let isAffectedByGravity = pos.y < canvas?.height;
		applyGravity(isAffectedByGravity);
		applyAirResistance();

		const isHorizontalOutlier = pos.x + vel.x + BALL_RADIUS >= canvas.width;

		const a = pos.x + vel.x - BALL_RADIUS <= 0;

		if (isHorizontalOutlier) {
			const newvel = -vel.x * MOMENTUM_LOSS;
			pos.x = canvas.width - BALL_RADIUS;
			vel.x = newvel;
		}
		if (a) {
			const newvel = -vel.x * MOMENTUM_LOSS;
			pos.x = BALL_RADIUS;
			vel.x = newvel;
		}
		const isOutsideOfBounds = pos.y + vel.y + BALL_RADIUS >= canvas.height;
		if (isOutsideOfBounds) {
			const newVel = -vel.y * MOMENTUM_LOSS;
			pos.y = canvas.height - BALL_RADIUS;
			vel.y = newVel;
		}
		applyVelocity();

		animationId = requestAnimationFrame(doo);
	}

	$inspect(vel);
	$inspect(pos);
	onMount(() => {
		if (!canvas) return;
		ctx = canvas.getContext('2d') || undefined;
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		animationId = requestAnimationFrame(doo);
	});
	onDestroy(() => {
		if (animationId) cancelAnimationFrame(animationId);
	});
</script>

<canvas
	onclickcapture={(e) => {
		let direction = new Vec(e.x - pos.x, e.y - pos.y);
		let mag = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2));
		let normal = direction.divideBy(mag).multiplyBy(3);
		vel = normal;
	}}
	width="400"
	height="300"
	class="bg-secondary border-2"
	bind:this={canvas}
></canvas>

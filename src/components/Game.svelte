<script lang="ts">
	import { onMount } from 'svelte';

	type PlayerImageState = 'man-stand-right' | 'man-stand-left' | 'man-walk-right' | 'man-walk-left';

	class Player {
		private GRAVITY = 0.7;
		private JUMP_VELOCITY = 4;
		private MAX_FALL_SPEED = 6;
		private JETPACK_ACCELERATION = 0.8;
		private SPEED = 4;
		private activeKeys: Set<string> = new Set();
		imageSrc = $state<PlayerImageState>('man-stand-right');
		velocity: { x: number; y: number } = { x: 0, y: 0 };
		acceleration: { x: number; y: number } = $state({ x: 0, y: 0 });
		position = $state({ x: 50, y: 0 });
		isInAir = $derived(() => {
			return this.position.y > 0;
		});
		isWalking = $derived(() => {
			return this.velocity.x !== 0;
		});
		walkingAnimationInterval = $state<null | number>(null);
		interval = $state<number | null>(null);

		handleKeysDown(event: KeyboardEvent) {
			this.activeKeys.add(event.key);
			this.updateMovement();
		}

		toggleWalkingState() {
			if (this.isInAir()) {
				this.velocity.x > 0
					? (this.imageSrc = 'man-walk-right')
					: (this.imageSrc = 'man-walk-left');
				return;
			}
			if (this.velocity.x < 0) {
				this.imageSrc = this.imageSrc === 'man-stand-left' ? 'man-walk-left' : 'man-stand-left';
			} else if (this.velocity.x > 0) {
				this.imageSrc = this.imageSrc === 'man-stand-right' ? 'man-walk-right' : 'man-stand-right';
			}
		}
		applyPhysics() {
			if (!this.isInAir()) {
				this.velocity.y = 0;
			} else {
				this.velocity.y = Math.max(-this.MAX_FALL_SPEED, this.velocity.y - this.GRAVITY);
			}

			if (this.activeKeys.has(' ') && !this.isInAir()) {
				this.velocity.y = this.JUMP_VELOCITY;
			}

			if (this.activeKeys.has(' ') && this.isInAir()) {
				this.velocity.y += this.JETPACK_ACCELERATION;
			}

			this.position.y += this.velocity.y;
		}

		walk() {
			if (!this.walkingAnimationInterval) {
				this.walkingAnimationInterval = setInterval(() => this.toggleWalkingState(), 150);
			}
		}

		handleKeysUp(event: KeyboardEvent) {
			this.activeKeys.delete(event.key);
			if (this.activeKeys.size === 0) {
				if (this.walkingAnimationInterval) {
					clearInterval(this.walkingAnimationInterval);
					this.walkingAnimationInterval = null;
				}
				if (this.isInAir())
					this.imageSrc = this.velocity.x < 0 ? 'man-walk-left' : 'man-walk-right';
			}
			this.updateMovement();
		}

		applyGravity() {
			if (this.isInAir()) {
				this.acceleration.y = -this.GRAVITY;
			} else {
				this.acceleration.y = 0;
			}
		}

		updateMovement() {
			this.velocity.x = 0;
			if (this.activeKeys.has('a')) {
				this.walk();
				this.velocity.x = -this.SPEED;
			}
			if (this.activeKeys.has('d')) {
				this.walk();
				this.velocity.x = this.SPEED;
			}

			if (this.activeKeys.has('o')) {
				this.acceleration.y += 10;
			} else {
				this.acceleration.y = -this.GRAVITY;
			}
		}

		applyVelocity() {
			this.position.x += this.velocity.x;
			if (this.position.y + this.velocity.y <= 0) {
				this.position.y = 0;
			} else {
				this.position.y += this.velocity.y;
			}
		}

		applyAcceleration() {
			this.velocity.x += this.acceleration.x;
			let newVel = Math.min(5, this.velocity.y + this.acceleration.y);
			this.velocity.y = newVel;
		}

		public gameLoop() {
			this.interval = setInterval(() => {
				this.applyPhysics();
				//this.applyAcceleration();
				this.applyVelocity();
			}, 1000 / 60);
		}
	}

	let player = new Player();

	onMount(() => {
		player.gameLoop();
	});
</script>

<svelte:window
	onkeyupcapture={(e) => player.handleKeysUp(e)}
	onkeydown={(e) => player.handleKeysDown(e)}
/>

<div class="relative flex h-60 flex-col justify-end">
	<div
		class={`absolute left-0 top-0 size-10 `}
		class:bg-red-400={player.isInAir()}
		class:bg-emerald-400={!player.isInAir()}
	></div>
	<div
		class={`absolute left-20 top-0 size-10 `}
		class:bg-red-400={player.isWalking()}
		class:bg-emerald-400={!player.isWalking()}
	></div>
	<img
		src={`/images/${player.imageSrc}.png`}
		alt="player"
		style:bottom={player.position.y + 16 * 3 + 'px'}
		style:left={player.position.x + 'px'}
		class="absolute left-16 z-50 h-32 w-16"
	/>
	<div class="absolute left-0 flex h-16 w-screen bg-[url('/images/grass.png')] bg-contain"></div>
</div>

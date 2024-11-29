<script lang="ts">
	import { onMount } from 'svelte';

	type PlayerImageState = 'man-stand-right' | 'man-stand-left' | 'man-walk-right' | 'man-walk-left';

	class Player {
		private GRAVITY = 0.7;
		private SPEED = 4;
		private activeKeys: Set<string> = new Set();

		imageSrc = $state<PlayerImageState>('man-stand-right');
		velocity: { x: number; y: number } = { x: 0, y: 0 };
		acceleration: { x: number; y: number } = $state({ x: 0, y: -this.GRAVITY });
		position = $state({ x: 50, y: 0 });
		isInAir = $derived(() => {
			return this.velocity.y > 0;
		});
		isWalking = $state(false);
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

		walk() {
			if (!this.walkingAnimationInterval) {
				this.walkingAnimationInterval = setInterval(() => this.toggleWalkingState(), 150);
			}
		}

		handleKeysUp(event: KeyboardEvent) {
			this.activeKeys.delete(event.key);
			if (this.activeKeys.size === 0) {
				this.isWalking = false;
				if (this.walkingAnimationInterval) {
					clearInterval(this.walkingAnimationInterval);
					this.walkingAnimationInterval = null;
				}
				if (!this.isInAir) this.imageSrc = this.velocity.x < 0 ? 'man-walk-left' : 'man-walk-right';
			}
			this.updateMovement();
		}

		updateMovement() {
			this.velocity.x = 0;
			if (this.activeKeys.has('a')) {
				this.isWalking = true;
				this.walk();
				this.velocity.x = -this.SPEED;
			}
			if (this.activeKeys.has('d')) {
				this.isWalking = true;
				this.walk();
				this.velocity.x = this.SPEED;
			}
			if (this.activeKeys.has(' ') && !this.isInAir()) {
				this.velocity.y = 10;
			}

			if (this.activeKeys.has('') && this.isInAir()) {
				//this.velocity.y = 400;
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
			if (this.isInAir()) this.velocity.y += this.acceleration.y;
		}

		public gameLoop() {
			this.interval = setInterval(() => {
				this.applyAcceleration();
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
	<img
		src={`/images/${player.imageSrc}.png`}
		alt="player"
		style:bottom={player.position.y + 16 * 3 + 'px'}
		style:left={player.position.x + 'px'}
		class="absolute left-16 z-50 h-32 w-16"
	/>
	<div class="absolute left-0 flex h-16 w-screen bg-[url('/images/grass.png')] bg-contain"></div>
</div>

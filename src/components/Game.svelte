<script lang="ts">
	import { onMount } from 'svelte';
	import Particles from './Particles.svelte';

	type PlayerImageState =
		| 'man-stand-right'
		| 'man-stand-left'
		| 'man-walk-right'
		| 'man-walk-left'
		| 'man-jetpack-left'
		| 'man-jetpack-right';
	class Game {
		private GRAVITY = 0.4;
		private JUMP_VELOCITY = 7;
		private MAX_FALL_SPEED = 12;
		private JETPACK_ACCELERATION = 0.5;
		private SPEED = 4;

		private canJetpack = false;
		private spaceHitCount = 0;

		isJetpacking = $state(false);
		activeKeys: Set<string> = new Set();
		imageSrc = $state<PlayerImageState>('man-stand-right');
		velocity: { x: number; y: number } = { x: 0, y: 0 };
		acceleration: { x: number; y: number } = $state({ x: 0, y: 0 });
		position = $state({ x: 50, y: 0 });
		isInAir = $derived(() => {
			return this.position.y > 0;
		});
		isWalking = $derived(() => {
			if (this.isInAir()) return false;
			return this.velocity.x !== 0;
		});
		walkingAnimationInterval = $state<null | number>(null);
		interval = $state<number | null>(null);

		private updateImageState() {
			if (this.isJetpacking) {
				if (this.velocity.x !== 0)
					this.imageSrc = this.velocity.x > 0 ? 'man-jetpack-right' : 'man-jetpack-left';
				return;
			}

			if (this.isInAir()) {
				if (this.velocity.x !== 0)
					this.imageSrc = this.velocity.x >= 0 ? 'man-walk-right' : 'man-walk-left';
				return;
			}
			if (this.isWalking()) {
				return;
			}
			//if (this.velocity.x < 0) {
			//	this.imageSrc = this.imageSrc === 'man-stand-left' ? 'man-walk-left' : 'man-stand-left';
			//} else if (this.velocity.x > 0) {
			//	this.imageSrc = this.imageSrc === 'man-stand-right' ? 'man-walk-right' : 'man-stand-right';
			//}
		}
		handleKeysDown(event: KeyboardEvent) {
			this.activeKeys.add(event.key);

			if (event.key === 'w') {
				this.spaceHitCount++;
			}

			if (this.spaceHitCount === 1) {
				this.canJetpack = true;
			}

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
				this.canJetpack = false;
				this.spaceHitCount = 0;
			} else {
				this.velocity.y = Math.max(-this.MAX_FALL_SPEED, this.velocity.y - this.GRAVITY);
			}

			if (this.activeKeys.has('w') && !this.isInAir() && !this.isJetpacking) {
				this.isJetpacking = false;
				this.canJetpack = false;
				this.spaceHitCount = 0;
				this.velocity.y = this.JUMP_VELOCITY;
			}
			if (this.activeKeys.has('w') && this.isInAir() && this.canJetpack) {
				this.velocity.y += this.JETPACK_ACCELERATION;
				this.isJetpacking = true;
			} else {
				this.isJetpacking = false;
			}

			if (this.position.y > 600) {
				this.velocity.y = -this.GRAVITY;
				this.acceleration.y = -this.GRAVITY;
			}
			this.position.y += this.velocity.y;
			this.updateImageState();
		}

		standStillIfIdle() {
			if (this.isInAir() || this.activeKeys.size !== 0 || this.velocity.x !== 0) return;
			if (this.imageSrc === 'man-walk-right') {
				this.imageSrc = 'man-stand-right';
			}
			if (this.imageSrc === 'man-walk-left') {
				this.imageSrc = 'man-stand-left';
			}
		}
		walk() {
			if (!this.walkingAnimationInterval) {
				this.walkingAnimationInterval = setInterval(() => this.toggleWalkingState(), 150);
			}
		}

		handleKeysUp(event: KeyboardEvent) {
			this.activeKeys.delete(event.key);

			if (event.key === 'w' && this.activeKeys.size === 0) {
				this.spaceHitCount = 0;
				this.canJetpack = false;
			}
			if (this.activeKeys.size === 0) {
				if (this.walkingAnimationInterval) {
					clearInterval(this.walkingAnimationInterval);
					this.walkingAnimationInterval = null;
				}
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

		public isKeyPressed = $derived((k: string) => {
			return this.activeKeys.has(k);
		});

		updateMovement() {
			this.velocity.x = 0;
			if (this.activeKeys.has('a')) {
				this.velocity.x = -this.SPEED;
				this.walk();
			}
			if (this.activeKeys.has('d')) {
				this.velocity.x = this.SPEED;
				this.walk();
			}

			if (this.activeKeys.has('o')) {
				this.acceleration.y += 10;
			} else {
				this.acceleration.y = -this.GRAVITY;
			}
		}
		applyHorizontalVelocity() {
			const minBoundary = window.innerWidth <= 768 ? 50 : 150;
			const maxBoundary = window.innerWidth - minBoundary;

			let newPos = Math.max(Math.min(maxBoundary, this.position.x + this.velocity.x), minBoundary);
			this.position.x = newPos;
		}

		public gameLoop() {
			this.interval = setInterval(() => {
				this.applyPhysics();
				this.applyHorizontalVelocity();
				this.standStillIfIdle();
			}, 1000 / 60);
		}
	}
	let game = new Game();

	onMount(() => {
		game.gameLoop();
	});
	let facingDirection = $derived(() => {
		if (game.imageSrc === 'man-jetpack-right') {
			return 'right';
		} else if (game.imageSrc === 'man-jetpack-left') {
			return 'left';
		}
		return 'left';
	});
</script>

<svelte:window
	onkeyupcapture={(e) => game.handleKeysUp(e)}
	onkeydowncapture={(e) => game.handleKeysDown(e)}
/>

<div class="relative flex h-60 flex-col justify-end">
	<div class=" mb-32 flex h-32 w-60 flex-col items-center justify-center gap-2">
		<div class="flex items-center justify-center gap-2">
			<kbd
				class="kbd kbd-lg"
				class:active={game.isKeyPressed(' ')}
				ontouchend={() => {
					game.handleKeysUp({ key: 'w' } as KeyboardEvent);
				}}
				ontouchstart={() => {
					game.handleKeysDown({ key: 'w' } as KeyboardEvent);
				}}>w</kbd
			>
		</div>
		<div class="flex items-center justify-center gap-2">
			<kbd
				class="kbd kbd-lg"
				ontouchend={() => {
					game.handleKeysUp({ key: 'a' } as KeyboardEvent);
				}}
				ontouchstart={() => {
					game.handleKeysDown({ key: 'a' } as KeyboardEvent);
				}}
				class:active={game.isKeyPressed('a')}>a</kbd
			>
			<kbd class="kbd" class:active={game.isKeyPressed(' ')}>{' '}</kbd>
			<kbd
				class="kbd kbd-lg"
				ontouchend={() => {
					game.handleKeysUp({ key: 'd' } as KeyboardEvent);
				}}
				ontouchstart={() => {
					game.handleKeysDown({ key: 'd' } as KeyboardEvent);
				}}
				style:backgroundColor={game.isKeyPressed('d') ? 'white' : 'white'}>d</kbd
			>
		</div>
		<div class="flex w-full items-center justify-center text-base-content/30">
			<p class="text-xs">
				Hint: Press <kbd class="kbd kbd-xs mx-2">w</kbd> to activate jetpack
			</p>
		</div>
	</div>
	<img
		src={`/images/${game.imageSrc}.png`}
		alt="player"
		style:bottom={game.position.y + 16 * 3 + 'px'}
		style:left={game.position.x + 'px'}
		class="absolute left-16 z-50 h-32 w-16"
	/>
	<Particles {facingDirection} bind:enabled={game.isJetpacking} bind:position={game.position} />
	<div
		class="absolute -left-4 flex h-16 w-screen bg-[url('/images/grass.png')] bg-cover md:bg-contain"
	></div>
</div>

<style>
	.active {
		@apply bg-primary;
	}
</style>

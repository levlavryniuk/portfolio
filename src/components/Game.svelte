<script lang="ts">
	import { onMount } from 'svelte';

	class Player {
		private GRAVITY = 0.4;
		velocity: { x: number; y: number } = { x: 0, y: 0 };
		acceleration: { x: number; y: number } = { x: 0, y: -this.GRAVITY };
		position = $state({ x: 0, y: 0 });
		isInAir = $state(false);

		private activeKeys: Set<string> = new Set();

		handleKeysDown(event: KeyboardEvent) {
			this.activeKeys.add(event.key);
			this.updateMovement();
		}

		handleKeysUp(event: KeyboardEvent) {
			this.activeKeys.delete(event.key);
			this.updateMovement();
		}

		updateMovement() {
			this.velocity.x = 0;
			if (this.activeKeys.has('a')) {
				this.velocity.x = -2;
			}
			if (this.activeKeys.has('d')) {
				this.velocity.x = 2;
			}
			if (this.activeKeys.has(' ') && !this.isInAir) {
				this.isInAir = true;
				this.velocity.y = 10;
			}
		}

		applyVelocity() {
			this.position.x += this.velocity.x;

			if (this.position.y + this.velocity.y <= 0) {
				this.position.y = 0;
				this.isInAir = false;
			} else {
				this.position.y += this.velocity.y;
			}
		}

		applyAcceleration() {
			this.velocity.x += this.acceleration.x;
			if (this.isInAir) this.velocity.y += this.acceleration.y;
		}

		interval = $state<number | null>(null);

		public gameLoop() {
			this.interval = setInterval(() => {
				this.applyAcceleration();
				this.applyVelocity();
			}, 10);
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

<div class="relative flex h-40 flex-col justify-end border">
	<div
		style:bottom={player.position.y + 16 + 'px'}
		style:left={player.position.x + 'px'}
		class="absolute bottom-4 h-12 w-6 bg-primary"
	></div>
	<div class="flex h-4 w-screen bg-accent"></div>
</div>


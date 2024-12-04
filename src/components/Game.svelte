<script lang="ts">
	import { onMount } from 'svelte';
	import Particles from './Particles.svelte';
	import Game from '$lib/game.svelte';

	let game = new Game();
	let value = $state(0);

	$effect(() => {
		game.setJetpackAcceleration(value / 1000);
	});
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
	ondeviceorientationabsolute={(e) => game.handleOrientation(e)}
/>

<div class="relative flex h-60 flex-col justify-end">
	<div class=" mb-60 flex h-32 w-60 flex-col items-center justify-center gap-2">
		<div class="-top-10 left-0 md:hidden">
			<label for="acceleration" class="block w-full text-center text-base-content/60"
				>Jetpack acceleration</label
			>
			<input id="acceleration" type="range" bind:value min="0" max="100" class="range" />
		</div>
		<div class="flex items-center justify-center gap-2 max-lg:hidden">
			<kbd
				class="kbd kbd-lg select-none"
				ontouchend={() => {
					game.handleKeysUp({ key: 'a' } as KeyboardEvent);
				}}
				ontouchstart={() => {
					game.handleKeysDown({ key: 'a' } as KeyboardEvent);
				}}>a</kbd
			>
			<kbd class="kbd kbd-lg">{' '}</kbd>
			<kbd
				class="kbd kbd-lg select-none"
				ontouchend={() => {
					game.handleKeysUp({ key: 'd' } as KeyboardEvent);
				}}
				ontouchstart={() => {
					game.handleKeysDown({ key: 'd' } as KeyboardEvent);
				}}>d</kbd
			>
		</div>
	</div>
	<img
		src={`/images/${game.imageSrc}.png`}
		alt="player"
		style:bottom={game.position.y + 16 * 3 + 'px'}
		style:left={game.position.x + 'px'}
		class="absolute left-16 z-50 h-32 w-16"
	/>
	<Particles
		{facingDirection}
		enabled={game.isJetpacking}
		power={value / 100}
		position={game.position}
	/>
	<div
		class="absolute -left-4 flex h-16 w-screen bg-[url('/images/grass.png')] bg-cover md:bg-contain"
	></div>
</div>

<style>
	.pressed {
		@apply bg-primary;
	}
</style>

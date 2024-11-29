<script lang="ts">
	import { onMount } from 'svelte';
	import Particles from './Particles.svelte';
	import Player from '$lib/player.svelte';

	let player = new Player();

	onMount(() => {
		player.gameLoop();
	});
	let facingDirection = $derived(() => {
		if (player.imageSrc === 'man-jetpack-right') {
			return 'right';
		} else if (player.imageSrc === 'man-jetpack-left') {
			return 'left';
		}
		return 'left';
	});
</script>

<svelte:window
	onkeyupcapture={(e) => player.handleKeysUp(e)}
	onkeydowncapture={(e) => player.handleKeysDown(e)}
/>

<div class="relative flex h-60 flex-col justify-end">
	<img
		src={`/images/${player.imageSrc}.png`}
		alt="player"
		style:bottom={player.position.y + 16 * 3 + 'px'}
		style:left={player.position.x + 'px'}
		class="absolute left-16 z-50 h-32 w-16"
	/>
	<Particles {facingDirection} bind:enabled={player.isJetpacking} bind:position={player.position} />
	<div class="absolute left-0 flex h-16 w-screen bg-[url('/images/grass.png')] bg-contain"></div>
</div>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let show = $state(false);

	let interval = $state<null | number>(null);
	onMount(
		() =>
			(interval = setInterval(() => {
				show = !show;
				setTimeout(() => (show = !show), 55);
				if (interval) clearInterval(interval);
			}, 9000))
	);

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

{#if show}
	<div class="fixed left-0 top-0 flex h-screen w-screen items-end justify-start">
		<img src="/images/tyler.png" alt="Tyler Durden" />
	</div>
{/if}

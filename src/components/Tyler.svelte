<script lang="ts">
	import { onMount } from 'svelte';

	let show = $state(false);

	onMount(() =>
		setTimeout(() => {
			show = !show;
			setTimeout(() => (show = !show), 55);
		}, 9000)
	);
</script>

{#if show}
	<div class="fixed left-0 top-0 flex h-screen w-screen items-end justify-start">
		<img src="/images/tyler.png" alt="Tyler Durden" />
	</div>
{/if}

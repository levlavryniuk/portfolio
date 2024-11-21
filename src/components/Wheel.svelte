<script lang="ts">
	import { calculateRotationForIndex, type Project } from '$lib/wheel';
	import Icon from '@iconify/svelte';

	let {
		wheel = $bindable(),
		active,
		hasSpinned,
		isSpinning
	}: {
		isSpinning: boolean;
		hasSpinned: boolean;
		active: Project[];
		wheel?: HTMLDivElement;
	} = $props();
	$effect(() => {
		console.log(isSpinning);
	});
</script>

{#snippet Cover()}
	<div class="absolute z-50 size-full overflow-hidden rounded-full border-b-2 border-b-secondary">
		<div
			class="absolute -right-36 top-20 z-50 size-[300px] rotate-45 rounded-l-full border border-secondary bg-base-100"
		></div>
		<div
			class="absolute -left-36 top-20 z-50 size-[300px] rotate-45 rounded-t-full border border-secondary bg-base-100"
		></div>
		<div
			class=" absolute top-[45%] z-50 flex h-3/4 w-full items-center
justify-center gap-2 bg-gradient-to-t from-base-300 to-base-100"
		></div>
	</div>
{/snippet}
<div class="relative box-border size-[500px] rounded-full  border-base-200 shadow-lg">
	{@render Cover()}
	<div
		style:height={(hasSpinned ? (isSpinning ? 0 : 160) : 0) + 'px'}
		class="absolute left-1/2 top-1/3 z-10 w-32 -translate-x-1/2 self-center bg-red-400/60 blur-3xl transition-all duration-1000"
	></div>
	<div
		bind:this={wheel}
		style="transition-duration: 100ms;"
		class="absolute size-full rounded-full bg-base-200 transition-all duration-500"
	>
		{#each active as project, index (project.id)}
			{@const riseup = index === 0 && !isSpinning ? 'scale(1.5) translateY(80px)' : 'scale(1)'}

			<div
				class="absolute top-0 z-10 flex size-full flex-col items-center rounded-b-full rounded-t-full p-2 px-6 py-4 pt-8 transition-all duration-700"
				style={`transform: ${riseup} rotate(${calculateRotationForIndex(index)}deg)`}
			>
				<div class="text-md mb-6 flex items-center gap-2 text-center text-base-content/60">
					{#if hasSpinned}
						<span class="text-base-content">{project.name}</span>
					{:else}
						<p>Pull the lever!</p>
						<Icon icon="mdi:arrow-right"></Icon>
					{/if}
				</div>
				{#if project.logoUrl && hasSpinned}
					<img class=" size-10 rounded-full" src={project.logoUrl} alt={project.name} />
				{:else if hasSpinned}
					<div class=" size-10 rounded-full bg-primary"></div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.rise-up {
		@apply -translate-y-10 scale-125 bg-black;
	}
</style>

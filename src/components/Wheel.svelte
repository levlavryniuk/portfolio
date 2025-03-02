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
</script>

{#snippet Cover()}
	<div class="border-b-secondary absolute z-50 size-full overflow-hidden rounded-full border-b-2">
		<div
			class="border-secondary bg-base-300 absolute top-20 -right-36 z-50 size-[300px] rotate-45 rounded-l-full border"
		></div>
		<div
			class="border-secondary bg-base-300 absolute top-20 -left-36 z-50 size-[300px] rotate-45 rounded-t-full border"
		></div>
		<div
			class=" from-base-100 to-base-300 absolute top-[45%] z-50 flex h-3/4
w-full items-center justify-center gap-2 bg-gradient-to-t"
		></div>
	</div>
{/snippet}

<div class="border-base-200 relative box-border size-80 rounded-full shadow-lg md:size-[500px]">
	{@render Cover()}
	<div
		style:height={(hasSpinned ? (isSpinning ? 0 : 160) : 0) + 'px'}
		class="absolute top-1/3 left-1/2 z-10 w-32 -translate-x-1/2 self-center bg-red-400/60 blur-3xl transition-all duration-1000"
	></div>
	<div
		bind:this={wheel}
		style="transition-duration: 100ms;"
		class="bg-base-200 absolute size-full rounded-full transition-all duration-500"
	>
		{#each active as project, index (project.id)}
			{@const riseup = index === 0 && !isSpinning ? 'scale(1.5) translateY(80px)' : 'scale(1)'}

			<div
				class="absolute top-0 z-10 flex size-full flex-col items-center rounded-t-full rounded-b-full px-6 pb-8 transition-all duration-700 md:py-4 md:pt-8"
				style={`transform: ${riseup} rotate(${calculateRotationForIndex(index)}deg)`}
				class:hidden={!isSpinning && index !== 0}
				class:riseup-mobile={!isSpinning && index === 0}
				class:risedown-mobile={isSpinning}
			>
				<div class="text-md text-base-content/60 mb-6 flex items-center gap-2 text-center">
					{#if hasSpinned}
						<span class="text-base-content text-xs md:text-base">{project.name}</span>
					{:else}
						<p>Pull the lever!</p>
						<Icon icon="mdi:arrow-right"></Icon>
					{/if}
				</div>
				{#if project.logoUrl && hasSpinned}
					<img class="size-6 rounded-full md:size-10" src={project.logoUrl} alt={project.name} />
				{:else if hasSpinned}
					<div class=" bg-primary size-6 rounded-full md:size-10"></div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	@reference "../app.css"

	.riseup-mobile {
		@apply max-md:-top-4;
	}
	.risedown-mobile {
		@apply pt-8;
	}
</style>

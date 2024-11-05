<script lang="ts">
	import Icon from '@iconify/svelte';
	import Lamp from '../components/Lamp.svelte';
	import ProjectsSection from '../components/ProjectsSection.svelte';

	let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />
<div class="flex h-screen items-center justify-center">
	<Lamp />
	<h1
		style:filter={scrollY > 200 ? `blur(${(scrollY - 200) / 5}px)` : ''}
		style:transform={`translateY(${-scrollY}px)`}
		class="text-6xl"
	>
		I create stuff using code
	</h1>
	{#if scrollY / 20 < 20}
		<div
			style:filter={`blur(${scrollY / 20}px)`}
			class="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center"
		>
			<p>Scroll down</p>
			<Icon icon="mdi:arrow-down"></Icon>
		</div>
	{/if}
</div>
<div class="flex h-[50vh] items-center justify-center">
	<h1
		style:filter={scrollY > 700 ? `blur(${(scrollY - 700) / 10}px)` : ''}
		style:transform={`translateY(${-scrollY / 2}px)`}
		class="absolute mx-auto w-full text-center text-6xl"
	>
		I specialize on creating bullet-proof web applications
	</h1>
</div>
<ProjectsSection></ProjectsSection>

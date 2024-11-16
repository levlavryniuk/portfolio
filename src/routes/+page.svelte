<script lang="ts">
	import Icon from '@iconify/svelte';
	import Lamp from '../components/Lamp.svelte';

	function blurAfter(y: number): string {
		return scrollY > y ? `blur(${(scrollY - y) / 15}px) ` : '';
	}

	function moveTopDividedBy(modifier: number): string {
		return `translateY(-${scrollY / modifier}px) `;
	}

	let scrollY = $state(0);
	const username = '0x4c656f';

	const topLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=radical&layout=compact`;
	$effect(() => console.log(scrollY));
</script>

<svelte:window bind:scrollY />
<div class="flex h-screen items-center justify-center">
	<Lamp />
	<h1
		style:filter={blurAfter(100)}
		style:transform={moveTopDividedBy(1)}
		class="text-center text-6xl"
	>
		Hi there! My name is Leo.<br /> I am a programmer
	</h1>
	{#if scrollY / 20 < 20}
		<div
			style:filter={blurAfter(150)}
			class="absolute bottom-20 left-1/2 flex -translate-x-1/2 flex-col items-center"
		>
			<p>Scroll down</p>
			<Icon icon="mdi:arrow-down"></Icon>
		</div>
	{/if}
</div>

<div class="mt-40 flex h-screen w-screen flex-col items-center">
	<div
		class="flex w-full flex-col items-center justify-center gap-10"
		style:transform={moveTopDividedBy(2)}
	>
		<h2 style:filter={blurAfter(720)} class="relative max-w-[50%] text-center text-6xl">
			I specialize on creating bullet-proof web applications using<br />
			<span class="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent"
				>Typescript</span
			>
			and
			<span class="bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent"
				>Rust</span
			>
			<span
				class:opacity-100={scrollY > 540}
				class:opacity-0={scrollY < 540}
				class="absolute left-1/2 top-[120%] -z-10 h-16 w-48 -translate-x-1/2 bg-primary blur-3xl transition-opacity duration-1000"
			></span>
		</h2>
		<img
			src={topLangsUrl}
			alt="Top Languages"
			class=" relative w-96 overflow-x-hidden text-center"
			style:filter={blurAfter(890)}
		/>
	</div>
	<h2 class="mt-40 flex h-screen flex-col text-6xl">Here are 10 facts about me</h2>
</div>
<!-- <ProjectsSection></ProjectsSection> -->

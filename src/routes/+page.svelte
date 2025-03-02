<script lang="ts">
	import Icon from '@iconify/svelte';
	import Facts from '../components/Facts.svelte';
	import Game from '../components/Game.svelte';
	import ProjectsSection from '../components/ProjectsSection.svelte';
	import Tyler from '../components/Tyler.svelte';
	import CanvasTest from '../components/CanvasTest.svelte';

	function blurAfter(y: number, maxBlur: number = 10) {
		if (scrollY <= y) return '';

		const blurAmount = Math.min(((scrollY - y) / (window.innerHeight - y)) * maxBlur, maxBlur);
		return `blur(${blurAmount}px)`;
	}

	function moveTopDividedBy(modifier: number) {
		return `translateY(-${scrollY / modifier}px) `;
	}

	let scrollY = $state(0);
	const username = 'levlavryniuk';

	const topLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=radical&layout=compact`;
</script>

<svelte:window bind:scrollY />

<div class="flex flex-col overflow-x-hidden px-4">
	<CanvasTest></CanvasTest>
	<div class="bg-base-100 flex min-h-screen items-center justify-center">
		<Tyler></Tyler>
		<h1 class="max-md:text-2xl">
			Hi there! My name is Leo.<br /> I am a programmer
		</h1>
		{#if scrollY / 20 < 20}
			<div
				style:filter={blurAfter(0)}
				style:transform={'translateX(-50%) ' + moveTopDividedBy(4)}
				class="absolute bottom-20 left-1/2 flex flex-col items-center"
			>
				<p>Scroll down</p>
				<Icon icon="mdi:arrow-down"></Icon>
			</div>
		{/if}
	</div>

	<div class="bg-base-100 flex h-screen w-full flex-col items-center justify-center">
		<div class="flex w-full flex-col-reverse items-center justify-center gap-10">
			<h2 class="relative w-full text-center md:w-fit md:max-w-[50%] lg:text-left">
				I specialize on creating bullet-proof<br class="max-lg:hidden" /> web applications using<br
				/>
				<span class="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent"
					>Typescript</span
				>
				and
				<span class="bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent"
					>Rust</span
				>
			</h2>
			<img
				src={topLangsUrl}
				alt="Top Languages"
				class=" relative w-96 overflow-x-hidden text-center"
			/>
		</div>
	</div>

	<Game />
</div>

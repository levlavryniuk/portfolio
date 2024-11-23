<script lang="ts">
	import Icon from '@iconify/svelte';
  import Game from "../components/Game.svelte"
	import Facts1 from '../components/Facts1.svelte';
	import Lamp from '../components/Lamp.svelte';
	import ProjectsSection from '../components/ProjectsSection.svelte';
	import Tyler from '../components/Tyler.svelte';
	const facts: string[] = [
		'I started programming when I was 12 years old',
		'I use vim, btw',
		'I am really bad at designing things, this website is a proof',
		'I really really enjoy writing Rust code',
		'I am from Kyiv, Ukraine',
		'I study at American University Kyiv',
		'I am interested in game dev',
		'I like physics and math',
		'I forgot to put 10th fact there'
	];

	function getRandomColor() {
		const colors = [
			'#450a0a', // Red-950
			'#431407', // Orange-950
			'#451a03', // Amber-950
			'#422006', // Yellow-950
			'#1a2e05', // Lime-950
			'#052e16', // Green-950
			'#022c22', // Emerald-950
			'#042f2e', // Teal-950
			'#083344', // Cyan-950
			'#082f49', // Sky-950
			'#172554', // Blue-950
			'#1e1b4b', // Indigo-950
			'#2e1065', // Violet-950
			'#3b0764', // Purple-950
			'#4a044e', // Fuchsia-950
			'#500724', // Pink-950
			'#4c0519' // Rose-950
		];
		const index = Math.floor(Math.random() * 7);
		return colors[index];
	}
	function blurAfter(y: number, maxBlur: number = 10) {
		if (scrollY <= y) return '';

		const blurAmount = Math.min(((scrollY - y) / (window.innerHeight - y)) * maxBlur, maxBlur);
		return `blur(${blurAmount}px)`;
	}

	function moveTopDividedBy(modifier: number) {
		return `translateY(-${scrollY / modifier}px) `;
	}

	let scrollY = $state(0);
	const username = '0x4c656f';

	const topLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=radical&layout=compact`;
	$effect(() => console.log(scrollY));
</script>

<svelte:window bind:scrollY />

<div class="flex h-screen items-center justify-center">
	<Tyler></Tyler>
	<Lamp />
	<h1 style:filter={blurAfter(10)} style:transform={moveTopDividedBy(1)}>
		Hi there! My name is Leo.<br /> I am a programmer
	</h1>
	{#if scrollY / 20 < 20}
		<div
			style:filter={blurAfter(0)}
			class="absolute bottom-20 left-1/2 flex -translate-x-1/2 flex-col items-center"
		>
			<p>Scroll down</p>
			<Icon icon="mdi:arrow-down"></Icon>
		</div>
	{/if}
</div>

<div class="absolute my-40 flex h-fit w-screen flex-col items-center">
	<div
		class="flex w-full flex-row-reverse items-center justify-center gap-10"
		style:transform={moveTopDividedBy(1.7)}
	>
		<h2 style:filter={blurAfter(720)} class="relative  text-left max-w-[50%]">
			I specialize on creating bullet-proof<br /> web applications using<br />
			<span class="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent"
				>Typescript</span
			>
			and
			<span class="bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent"
				>Rust</span
			>
			<span
				class:opacity-100={scrollY > 500}
				class:opacity-0={scrollY < 500}
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
</div>
<div
	style:transform={moveTopDividedBy(25)}
	class="my-40 mb-60 flex h-screen px-4 w-screen  items-center justify-center  pt-80 gap-10"
>
	<h2 class="w-min text-base-content/30 text-7xl text-right">Here are 9 facts about me</h2>
	<Facts1 />
</div>

<ProjectsSection />

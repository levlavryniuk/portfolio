<script lang="ts">
	import Icon from '@iconify/svelte';
	import Facts from '../components/Facts.svelte';
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

<div class="flex flex-col gap-20 px-4">
	<div class="flex h-screen items-center justify-center bg-base-100">
		<Tyler></Tyler>
		<Lamp />
		<h1>
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

	<div class="flex h-screen w-screen flex-col items-center bg-base-100">
		<div class="flex w-full flex-row-reverse items-center justify-center gap-10">
			<h2 class="relative max-w-[50%] text-left">
				I specialize on creating bullet-proof<br /> web applications using<br />
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

	<ProjectsSection />

	<div class=" flex h-screen w-screen items-center justify-center gap-10">
		<h2 class="w-min text-right text-7xl text-base-content/30">9 facts about me</h2>
		<Facts />
	</div>
</div>

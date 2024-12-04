<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let {
		enabled,
		position,
		facingDirection,
		power
	}: {
		enabled: boolean;
		facingDirection: () => 'left' | 'right';
		position: { x: number; y: number };
		power: number;
	} = $props();

	interface Particle {
		x: number;
		y: number;
		opacity: number;
		size: number;
		velocityX: number;
		velocityY: number;
		color: string;
	}

	let particles = $state<Particle[]>([]);
	let intervalId: number;

	const createExhaustParticle = (x: number, y: number): Particle => ({
		x: x + (facingDirection() === 'right' ? 0 : 50),
		y,
		opacity: 1,
		size: Math.random() * 6 + 16 * power,
		velocityX: Math.random() * 2 - 1,
		velocityY: Math.random() * 2 - 1,
		color: `rgba(200, 200, 200, ${Math.random() * 0.8 * power})`
	});

	const updateParticles = () => {
		particles = particles
			.map((p) => ({
				...p,
				x: p.x + p.velocityX,
				y: p.y + p.velocityY,
				opacity: p.opacity - 0.03,
				size: p.size * 1.01
			}))
			.filter((p) => p.opacity > 0);
	};

	onMount(() => {
		intervalId = setInterval(() => {
			updateParticles();
			if (!enabled) return;

			particles.push(createExhaustParticle(position.x, position.y));
		}, 1000 / 60);
	});

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});
</script>

{#each particles as particle}
	<div
		class="absolute rounded-full blur-sm"
		style:left={particle.x + 'px'}
		style:bottom={particle.y + 56 + 'px'}
		style:width={particle.size + 'px'}
		style:height={particle.size + 'px'}
		style:background-color={particle.color}
		style:opacity={particle.opacity}
	></div>
{/each}

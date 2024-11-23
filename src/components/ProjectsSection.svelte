<script lang="ts">
	import { type Project, projects } from '$lib/wheel';
	import { inview } from 'svelte-inview';
	import ProjectDisplay from './ProjectDisplay.svelte';
	import Wheel from './Wheel.svelte';

	let isSpinning = $state(false);
	let wheel = $state<HTMLDivElement>();
	let active: Project[] = $state(projects.slice(0, 4));
	let reserved: Project[] = $state(projects.slice(4));
	let spinCount = $state(0);

	let ontrigger = () => {
		rotate(16);
		setTimeout(() => {
			updateActiveAndReserved();
		}, 1000);
	};

	function updateActiveAndReserved() {
		const movedProject = active.shift() as Project;
		reserved.push(movedProject);

		const newProject = reserved.shift();
		if (newProject) {
			active.push(newProject);
		}
	}

	async function rotate(times: number) {
		isSpinning = true;
		spinCount++;
		setTimeout(() => {
			isSpinning = false;
		}, 200 * 16);
		if (wheel) wheel.style.transitionDuration = '0ms';
		for (let i = 0; i < times; i++) {
			if (wheel) {
				let currentDeg = Number(wheel.style.rotate.replace('deg', '')) || 0;
				let currentSpeed = Number(wheel.style.transitionDuration.replace('ms', '')) || 100;

				let newSpeed = currentSpeed + 200;
				wheel.style.transitionDuration = `${newSpeed}ms`;

				let newRotate = `${currentDeg + 90}deg`;
				wheel.style.rotate = newRotate;
			}
		}
	}
</script>

<div class="my-20 flex h-screen flex-col items-center justify-center gap-20 bg-base-200">
	<h2 class="text-center">Some of the things i did</h2>

	<div
		use:inview={{ unobserveOnEnter: true }}
		oninview_enter={ontrigger}
		class="flex h-auto w-fit flex-grow items-start justify-center gap-20"
	>
		<Wheel {isSpinning} {active} bind:wheel hasSpinned={spinCount !== 0} />
		<ProjectDisplay {isSpinning} {ontrigger} {spinCount} project={active[0]} />
	</div>
</div>

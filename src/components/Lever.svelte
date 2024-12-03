<script lang="ts">
	import Icon from '@iconify/svelte';

	let isDragging = $state(false);
	let lever = $state<HTMLDivElement>();
	let intervalId = $state<number | null>(null);
	let {
		ontrigger,
		text,
		disabled 
	}: { ontrigger: () => void; text?: string; disabled: boolean } = $props();

	function handleMouseMove(e: MouseEvent) {
		if (isDragging && lever) {
			if (intervalId !== null) {
				clearInterval(intervalId);
				intervalId = null;
			}
			if (disabled) {
				return;
			}

			const rect = lever.parentElement?.getBoundingClientRect();
			if (!rect) return;

			const centerY = rect.top + rect.height / 2;
			const mouseY = e.clientY - centerY;
			const angle = 90 + (mouseY / rect.height) * 90;
			const clampedAngle = Math.min(135, Math.max(45, angle));

			lever.style.rotate = `${clampedAngle}deg`;
		} else {
			let angle = Number(lever?.style.rotate.replace('deg', ''));

			if (intervalId === null && lever) {
				intervalId = setInterval(() => {
					if (lever) {
						const angle = Number(lever.style.rotate.replace('deg', ''));
						if (angle <= 45) {
							intervalId && clearInterval(intervalId);
							intervalId = null;
							return;
						}
						const newAngle = angle - 1;
						lever.style.rotate = `${Math.max(45, newAngle)}deg`;
					}
				}, 10);
				if (angle >= 135) {
					ontrigger();
				}
			}
		}
	}

	$effect(() => {
		return () => {
			if (intervalId !== null) {
				clearInterval(intervalId);
				intervalId = null;
			}
		};
	});
</script>

<svelte:window
	onmousemove={handleMouseMove}
	onmouseupcapture={() => {
		isDragging = false;
	}}
/>
<div class=" hidden lg:flex  w-32 flex-col left-full border-red-400 absolute gap-6  ">
	<div
		class={`relative z-[200] box-border flex h-32 w-16 items-center justify-center rounded-r-full border-l-0 border-base-content/30  shadow-md ${disabled
			? 'bg-base-300/90'
			: 'bg-secondary/20'}`}
		
	>
		<div
			bind:this={lever}
			style="rotate: 45deg;"
			class=" absolute -top-[75px] left-1/2 z-50 box-border h-36 w-2 origin-bottom-left -translate-x-1.5 bg-base-content transition-all"
		>
			<div
				onmousedowncapture={() => {
					isDragging = true;
				}}
				class:cursor-not-allowed={disabled}
				class="border-l-2-950 cursor- absolute -top-5 left-1/2 size-8 -translate-x-1/2 cursor-move rounded-full border-b border-l border-r border-t-2 border-b-red-800 border-l-red-800 border-r-red-800 border-t-red-400 bg-red-500"
			></div>
		</div>
		<div
			class="absolute left-1/2 top-1/2 h-1/3 w-1/2 -translate-x-1/2 -translate-y-1/2 bg-base-100/40"
		></div>
		<div
			class="absolute left-1/3 top-1/2 z-50 h-1/4 w-2 -translate-y-1/2 translate-x-1.5 bg-black"
		></div>
		<div
			class="absolute left-1/3 top-1/2 z-10 h-1/4 w-2 -translate-y-1/2 translate-x-2 bg-black"
		></div>
	</div>
	<div class="ml-2 flex animate-bounce items-center gap-2 text-lg text-base-content/60">
		{#if text}
			<Icon icon="mdi:info" class="text-base-content/60" />
			<p class="font-semibold text-base-content/60">{text}</p>
		{/if}
	</div>
</div>

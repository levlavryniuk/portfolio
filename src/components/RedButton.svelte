<script lang="ts">
	let isPressed = $state(false);
	let { ontrigger, disabled = false }: { ontrigger: () => void; disabled?: boolean } = $props();

	function handleTouchStart() {
		if (!disabled) {
			isPressed = true;
		}
	}

	function handleTouchEnd() {
		if (!disabled && isPressed) {
			isPressed = false;
			ontrigger();
		}
	}
</script>

<div
	class="flex size-24 -scale-y-[75%] items-center justify-center rounded-full bg-secondary/30 md:hidden"
>
	<div class="relative size-14">
		<button
			aria-label="Wheel trigger button"
			class="peer relative z-10 size-14 translate-y-4 -scale-y-[80%] cursor-pointer rounded-full bg-accent/70 transition-all active:translate-y-0"
			ontouchstart={handleTouchStart}
			ontouchend={handleTouchEnd}
			onmousedown={handleTouchStart}
			onmouseup={handleTouchEnd}
			{disabled}
		>
		</button>
		<span
			class="absolute -top-1 left-0 -z-10 h-[72px] w-14 scale-y-[-80%] rounded-full bg-accent-content/60 transition-all peer-active:h-14"
		></span>
	</div>
</div>

<style>
</style>

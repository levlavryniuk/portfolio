<script lang="ts">
	let { facts = [] }: { facts: string[] } = $props();

	let currentIndex = $state(0);
	let isFlipped = $state(false);

	function nextFact() {
		isFlipped = true;
		setTimeout(() => {
			currentIndex = (currentIndex + 1) % facts.length;
			isFlipped = false;
		}, 300);
	}

	function previousFact() {
		isFlipped = true;
		setTimeout(() => {
			currentIndex = (currentIndex - 1 + facts.length) % facts.length;
			isFlipped = false;
		}, 300);
	}

	let progress = $derived(() => ((currentIndex + 1) / facts.length) * 100);
</script>

<div class="flex w-full flex-col items-center justify-center p-4">
	<div class="w-full max-w-2xl">
		<div class="card w-full bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
			<div class="card-body">
				<progress
					class="progress progress-primary mb-4 w-full transition-all"
					value={progress()}
					max="100"
				></progress>

				<div class="mb-2 text-right text-sm opacity-60">
					Fact {currentIndex + 1} of {facts.length}
				</div>

				<div
					class="flex min-h-[200px] items-center justify-center p-6 text-center"
					class:flip-out={isFlipped}
				>
					<h2 class="text-2xl font-bold leading-relaxed">
						{facts[currentIndex]}
					</h2>
				</div>

				<div class="card-actions mt-6 justify-between">
					<button class="btn btn-outline btn-primary" onclick={previousFact}> Previous </button>
					<button class="btn btn-primary" onclick={nextFact}> Next </button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.flip-out {
		animation: flip-out 0.3s ease-out;
	}

	@keyframes flip-out {
		0% {
			transform: perspective(400px) rotateX(0);
			opacity: 1;
		}
		100% {
			transform: perspective(400px) rotateX(-90deg);
			opacity: 0;
		}
	}
</style>

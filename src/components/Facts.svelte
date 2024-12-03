<script>
	const facts = [
		'I started programming when I was 12 years old',
		'I use vim, btw',
		'I am really bad at designing things, this website is a proof',
		'I really really enjoy writing Rust code',
		'I am from Kyiv, Ukraine',
		'I study at American University Kyiv',
		'I am interested in game dev',
		'I like physics and math',
		'I can`t count to 10'
	];
</script>

<div
	class=" flex h-screen w-full items-center justify-center gap-10 overflow-hidden max-md:flex-col"
>
	<h2
		class="text-center text-base-content md:w-min md:text-right md:text-7xl md:text-base-content/30"
	>
		9 facts about me
	</h2>
	<div class="flex flex-col items-center justify-center p-4">
		<ul class="flex max-w-2xl flex-col items-start gap-1 text-base-content/70 md:w-max md:gap-3">
			{#each facts as fact, i}
				<li class="text-lg md:text-xl lg:text-2xl">{i + 1}. {fact}</li>
			{/each}
		</ul>
	</div>
</div>

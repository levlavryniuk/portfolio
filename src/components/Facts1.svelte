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
		'I forgot to put 10th fact there'
	];
</script>

<div class="flex w-full flex-col items-center justify-center p-4">
	<ol class="flex w-max max-w-2xl list-decimal flex-col items-start gap-3">
		{#each facts as fact}
			<li class="ml-20 text-lg">{fact}</li>
		{/each}
	</ol>
</div>

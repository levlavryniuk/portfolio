<script lang="ts">
	import '../app.css';
	import Car from '../components/Car.svelte';
	let { children } = $props();
	console.log(
		'If anyone is reading this, note, thaat this is the messiest styling i have ever done'
	);
</script>

<Car />
{@render children()}

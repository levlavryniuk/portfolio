<script lang="ts">
	import '../app.css';
	import Car from '../components/Car.svelte';
	let { children } = $props();
</script>

<Car />
{@render children()}

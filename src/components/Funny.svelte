<script lang="ts">
	let gamma = $state(0);

	function handleOrientation(event?: DeviceOrientationEvent) {
		if (event !== null) {
			gamma = event!.gamma ?? 0;
		}
	}
</script>

<svelte:window
	ondeviceorientationabsolute={(e) => {
		console.log(e);
		handleOrientation(e);
	}}
/>
<div class="orientation-data">
	<p>Gamma (Y-axis tilt): {gamma.toFixed(2)}°</p>
</div>

<style>
	.orientation-data {
		font-family: Arial, sans-serif;
		margin: 20px;
	}
</style>

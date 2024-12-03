<script lang="ts">
	let alpha = $state(0);
	let beta = $state(0);
	let gamma = $state(0);
	let e = $state<unknown>();

	// Function to handle device orientation events
	function handleOrientation(event?: DeviceOrientationEvent) {
		e = event;
		if (event !== null) {
			alpha = event!.alpha ?? 0;
			beta = event!.beta ?? 0;
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
	<p>Alpha (Z-axis rotation): {alpha.toFixed(2)}°</p>
	<p>Beta (X-axis tilt): {beta.toFixed(2)}°</p>
	<p>Gamma (Y-axis tilt): {gamma.toFixed(2)}°</p>
	<p>This balls {e}</p>
</div>

<style>
	.orientation-data {
		font-family: Arial, sans-serif;
		margin: 20px;
	}
</style>

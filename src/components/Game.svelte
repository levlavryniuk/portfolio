<script lang='ts'>
  
let platform= $state<null | HTMLDivElement>(null)
let object = $state<null | HTMLDivElement>(null)
</script>

<div bind:this={platform} class="w-screen h-4 flex bg-accent"></div>
<div bind:this={object} class="size-10 bg-primary rounded-full"></div>



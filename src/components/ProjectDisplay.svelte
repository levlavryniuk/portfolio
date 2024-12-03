<script lang="ts">
	import type { Project } from '$lib/wheel';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import Lever from './Lever.svelte';
	import RedButton from './RedButton.svelte';

	let {
		project,
		ontrigger,
		spinCount,
		isSpinning
	}: { project: Project; isSpinning: boolean; spinCount: number; ontrigger: () => void } = $props();
</script>

<div class="relative mx-auto flex w-80 flex-col max-lg:items-center lg:flex-row">
	<div
		class=" card w-full overflow-hidden rounded-2xl border-base-content/30 border-blue-200 bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl lg:w-96 lg:rounded-tr-none"
	>
		<!-- Header Section -->
		<div class="relative">
			{#if isSpinning}
				<div
					class="absolute inset-0 z-10 flex items-center justify-center bg-base-300/80 backdrop-blur-sm"
				>
					<div class="loading loading-spinner loading-lg text-primary"></div>
				</div>
			{/if}

			<figure class="relative h-32 bg-gradient-to-r from-primary/20 to-secondary/20">
				{#if project.logoUrl}
					<img
						src={project.logoUrl}
						alt={project.name}
						class="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-base-100 bg-base-100 object-cover shadow-lg"
					/>
				{:else}
					<div
						class="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-base-100 bg-primary shadow-lg"
					>
						<Icon
							icon="lucide:folder"
							class="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 text-primary-content"
						/>
					</div>
				{/if}
			</figure>
		</div>

		<!-- Content Section -->
		<div class="card-body bg-gradient-to-t from-base-300 to-base-100 max-md:px-3">
			<div class="badge badge-secondary lg:hidden">{project.status}</div>
			<h2 class="card-title justify-start">
				{project.name}
				<div class="badge badge-secondary max-lg:hidden">{project.status}</div>
			</h2>

			<p class="text-left text-base-content/80">{project.description}</p>

			<!-- Technologies -->
			<div class="mt-4">
				<h3 class="mb-2 text-sm font-semibold uppercase text-base-content/60">Technologies</h3>
				<div class="flex flex-wrap gap-2">
					{#each project.technologies as tech}
						<span class=" badge badge-accent badge-outline">{tech}</span>
					{/each}
				</div>
			</div>

			<!-- Features -->
			{#if project.features && project.features.length > 0}
				<div class="collapse collapse-arrow bg-base-200" transition:fade>
					<input type="checkbox" />
					<div class="collapse-title pl-0 text-sm font-semibold uppercase text-base-content/60">
						Features
					</div>
					<div class="collapse-content">
						<ul class="list-inside list-disc space-y-1">
							{#each project.features as feature}
								<li class="text-sm text-base-content/80">{feature}</li>
							{/each}
						</ul>
					</div>
				</div>
			{/if}

			<!-- Links -->
			<div class="card-actions mt-4 justify-start">
				{#if project.websiteUrl}
					<a
						href={project.websiteUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-accent"
					>
						<Icon icon="lucide:globe" class="size-5" />
						Website
					</a>
				{/if}

				{#if project.repositoryUrls && project.repositoryUrls.length > 0}
					{#each project.repositoryUrls as repoUrl}
						<a href={repoUrl} target="_blank" rel="noopener noreferrer" class="btn btn-outline">
							<Icon icon="lucide:github" class="size-5" />
							Repository
						</a>
					{/each}
				{/if}
			</div>
		</div>
	</div>

	<Lever {ontrigger} disabled={isSpinning} text={!isSpinning && spinCount < 2 ? 'Pull me!' : ''} />
	<RedButton {ontrigger} />
</div>

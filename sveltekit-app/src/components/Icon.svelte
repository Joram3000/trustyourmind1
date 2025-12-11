<script lang="ts">
	import type { ComponentType } from 'svelte';
	import * as icons from 'lucide-svelte';

	const iconRegistry = icons as unknown as Record<string, ComponentType | undefined>;

	export let name: string | null | undefined;

	const toPascal = (value: string | null | undefined): string | null => {
		const result = String(value ?? '')
			.replace(/[_-]+/g, ' ')
			.split(' ')
			.filter(Boolean)
			.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
			.join('');
		return result || null;
	};

	const fallbackIcon: ComponentType | null = iconRegistry.AlertCircle ?? null;

	$: componentName = toPascal(name);
	$: IconComponent = (() => {
		if (componentName) {
			const candidate = iconRegistry[componentName];
			if (candidate) {
				return candidate;
			}
		}
		return fallbackIcon;
	})();
</script>

{#if IconComponent}
	<svelte:component this={IconComponent} {...$$props} />
{/if}

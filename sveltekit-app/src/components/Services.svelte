<script lang="ts">
	import { Users, Navigation, Shield, Sparkles } from 'lucide-svelte';
</script>

<div class="container">
	<div class="inner">
		<h2>Our servives</h2>
		<p>
			Comprehensive mental health services designed to support your well-being and foster lasting
			change
		</p>
		<ul>
			<li class="card">
				<Users color="var(--red)" />

				<h3>Individual Therapy</h3>
				<p>
					One-on-one sessions tailored to your specific needs, utilizing cognitive-behavioral
					therapy, psychodynamic approaches, and mindfulness-based techniques.
				</p>
			</li>
			<li class="card">
				<Navigation color="var(--red)" />
				<h3>Life Transitions</h3>
				<p>
					Support through major life changes including career shifts, relationship changes, loss,
					and identity exploration.
				</p>
			</li>
			<li class="card">
				<Shield color="var(--red)" />
				<h3>Anxiety & Depression</h3>
				<p>
					Evidence-based treatment for managing anxiety disorders, depression, and related mood
					concerns with compassionate, practical strategies.
				</p>
			</li>
			<li class="card">
				<Sparkles color="var(--red)" />
				<h3>Personal Growth</h3>
				<p>
					Guidance for self-discovery, building resilience, improving relationships, and achieving
					your full potential.
				</p>
			</li>
		</ul>
	</div>
</div>

<style>
	.container {
		background-color: var(--darkbrown);
		display: flex;
		justify-content: center;
	}

	.inner {
		max-width: var(--max-width-1);
	}

	.inner h2 {
		text-align: center;
	}

	.inner ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
		padding: 1.5rem 0;
		list-style: none;
	}

	.card {
		background: rgba(255, 255, 255, 0.04);
		border-radius: 0.75rem;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
</style>

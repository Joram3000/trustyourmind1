<script lang="ts">
	import { Brain, GraduationCap, Heart } from 'lucide-svelte';
</script>

<div class="container">
	<div class="inner">
		<h2>About the practice</h2>
		<ul>
			<li class="card">
				<GraduationCap color="var(--red)" />
				<h3>Expert Training</h3>
				<p>
					Master's degree in Clinical Psychology with specialized training in evidence-based
					therapies
				</p>
			</li>
			<li class="card">
				<Heart color="var(--red)" />
				<h3>Compassionate Care</h3>
				<p>A warm, non-judgmental space where you can explore your thoughts and feelings safely</p>
			</li>
			<li class="card">
				<Brain color="var(--red)" />
				<h3>Personalized Approach</h3>
				<p>Tailored treatment plans that honor your unique experiences and goals</p>
			</li>
		</ul>

		<p>
			At Trust Your Mind, we believe that seeking help is a sign of strength, not weakness. Our
			practice is founded on the principle that everyone deserves access to quality mental health
			care in an environment that feels safe, respectful, and conducive to healing.
		</p>

		<p>
			With advanced training in clinical psychology and a commitment to ongoing professional
			development, we integrate the latest research with time-tested therapeutic approaches. Whether
			you're navigating life transitions, managing anxiety or depression, or seeking personal
			growth, we're here to support your journey toward wellness.
		</p>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--brown);
		padding: 1rem;
	}

	.inner {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: var(--max-width-1);
	}

	.inner h2 {
		text-align: center;
	}

	.inner ul {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 1rem 0;
		list-style: none;
	}

	.card {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	@media (max-width: 767px) {
		.inner ul {
			flex-direction: column;
		}
	}
</style>

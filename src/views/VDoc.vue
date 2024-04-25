<template>
		<n3-container >
			<n3-row>
				<n3-column :col="3">
					<n3-nav>
						<n3-sub-nav index="1">
							<template slot="title">TC W1</template>
							<n3-nav-item index="1-1">Story1</n3-nav-item>
							<n3-nav-item index="1-2">Story2</n3-nav-item>
							<n3-nav-item index="1-3">Story3</n3-nav-item>
							<n3-nav-item index="1-4">Story4</n3-nav-item>
							<n3-nav-item index="1-5">Story5</n3-nav-item>
							<n3-nav-item index="1-6">Story6</n3-nav-item>
							<n3-nav-item index="1-7">Story7</n3-nav-item>
						</n3-sub-nav>
						<n3-sub-nav index="2">
							<template slot="title">TC W2</template>
							<n3-nav-item index="2-1">Story1</n3-nav-item>
							<n3-nav-item index="2-2">Story2</n3-nav-item>
							<n3-nav-item index="2-3">Story3</n3-nav-item>
						</n3-sub-nav>
					</n3-nav>
				</n3-column>
				<n3-column :col="9">
					<div>
						<h2> Hook with jira</h2>
						<p>Fetch storyId from jira and auto generate UI</p>
						<p>Contains SD, UX, Testing strategy</p>
					</div>
				</n3-column>
			</n3-row>
		</n3-container>
</template>

<script>
</script>

<style>
</style>
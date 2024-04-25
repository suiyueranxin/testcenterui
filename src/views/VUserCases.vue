<template>
    <n3-container class="container">
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
                <h2>Test Cases</h2>
                <p>A list of test cases</p>
                <p>Link to VDoc</p>
                <p>Manual test cases</p>
                <p>Test cases scripts</p>
            </n3-column>
        </n3-row>
    </n3-container>
</template>

<script>
</script>

<style>
</style>
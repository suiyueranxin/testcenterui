<template>
  <div id="app">
    <n3-container class="header">
      <n3-row>
          <n3-nav :default-active="1" mode="horizontal">
            <n3-nav-item index="1">
              <router-link to="/doc">Doc</router-link>
            </n3-nav-item>
            <n3-nav-item index="2">
              <router-link to="/usercases">User Cases</router-link>
            </n3-nav-item>
            <n3-nav-item index="3">
              <router-link to="/testlabs">Test Labs</router-link>
            </n3-nav-item>
            <n3-nav-item index="4">APIs</n3-nav-item>
            <n3-nav-item index="5">Analytics</n3-nav-item>
            <n3-nav-item index="6">Coverage</n3-nav-item>
            <n3-nav-item index="7">PNR</n3-nav-item>
            <n3-nav-item index="8">
              <router-link to="/report">Report</router-link>
            </n3-nav-item>
            <n3-nav-item index="8">Test pages</n3-nav-item>
          </n3-nav>
      </n3-row>
    </n3-container>
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style>
.header {
  border-bottom: 2px solid #d2d2d2;
}
</style>

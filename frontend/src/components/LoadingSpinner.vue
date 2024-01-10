<template>
  <div v-if="loadingStore.isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { loadingStore } from "../stores/loadingStore.js";
</script>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 9999;
}

.spinner {
  border: 5px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

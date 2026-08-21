<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { setToken } from '@mvp/auth';

const route = useRoute();
const router = useRouter();
const username = ref('');

function login() {
  // Prototype: no real backend — any non-empty username signs you in.
  setToken(`demo-token-${Date.now()}`);
  const next = typeof route.query.next === 'string' ? route.query.next : '/';
  router.replace(next);
}
</script>

<template>
  <main class="login">
    <div class="login__card">
      <h1>Sign in</h1>
      <p class="login__hint">Prototype login — any username signs you in.</p>
      <input
        v-model="username"
        class="login__input"
        type="text"
        placeholder="Username"
        @keyup.enter="login"
      />
      <button type="button" class="login__button" :disabled="!username" @click="login">Log in</button>
    </div>
  </main>
</template>

<style scoped>
.login {
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  display: flex;
}
.login__card {
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  width: 100%;
  max-width: 320px;
  padding: 2rem;
  text-align: center;
}
.login__hint {
  color: #909399;
  font-size: 0.85rem;
}
.login__input {
  box-sizing: border-box;
  width: 100%;
  margin-top: 1rem;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}
.login__button {
  color: #fff;
  cursor: pointer;
  background: #409eff;
  border: none;
  border-radius: 4px;
  width: 100%;
  margin-top: 1rem;
  padding: 10px;
  font-size: 14px;
}
.login__button:disabled {
  background: #a0cfff;
  cursor: not-allowed;
}
</style>

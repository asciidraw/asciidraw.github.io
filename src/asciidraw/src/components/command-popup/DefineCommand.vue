<script setup lang="ts">
import { defineCommand } from "./defineCommand.ts";

const props = defineProps<Parameters<typeof defineCommand>[0]>();
defineCommand(props);
</script>

<template>
</template>

<script setup lang="ts">
import { registerCommand, type RegisterCommandOptions } from "./registerCommand.ts";

const props = defineProps<RegisterCommandOptions>();
registerCommand(props);
</script>

<template>
</template>

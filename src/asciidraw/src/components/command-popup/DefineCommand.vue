<script setup lang="ts">
import { defineCommand, type DefineCommandOptions } from "./defineCommand.ts";

const props = defineProps<DefineCommandOptions>();
defineCommand(props);
</script>

<template>
</template>

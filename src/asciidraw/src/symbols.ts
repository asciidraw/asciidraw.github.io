import type { InjectionKey, Ref } from "vue";
import type { AppContext, ElementRenderer, Project } from "@/types";

export const INJECTION_KEY_APP: InjectionKey<Ref<AppContext>> = Symbol("injection-key-app");
export const INJECTION_KEY_PROJECT: InjectionKey<Ref<Project>> = Symbol("injection-key-project");
export const INJECTION_KEY_RENDERER_MAP: InjectionKey<Record<string, ElementRenderer>> = Symbol("injection-key-renderer-map");

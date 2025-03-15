import type { InjectionKey, Ref } from "vue";
import type { WorkspaceContext, DrawContext, ElementRenderer, Project } from "@/types";

export const INJECTION_KEY_WORKSPACE: InjectionKey<Ref<WorkspaceContext>> = Symbol("injection-key-workspace");
export const INJECTION_KEY_PROJECT: InjectionKey<Ref<Project>> = Symbol("injection-key-project");
export const INJECTION_KEY_DRAW_CONTEXT: InjectionKey<Ref<DrawContext>> = Symbol("injection-key-draw-context");
export const INJECTION_KEY_RENDERER_MAP: InjectionKey<Record<string, ElementRenderer>> = Symbol("injection-key-renderer-map");

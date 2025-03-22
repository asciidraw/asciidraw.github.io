import type { InjectionKey, Ref } from "vue";
import type { DrawContext, Project, WorkspaceContext } from "@/types";

export const INJECTION_KEY_WORKSPACE: InjectionKey<Ref<WorkspaceContext>> = Symbol("injection-key-workspace");
export const INJECTION_KEY_PROJECT: InjectionKey<Ref<Project>> = Symbol("injection-key-project");
export const INJECTION_KEY_DRAW_CONTEXT: InjectionKey<Ref<DrawContext>> = Symbol("injection-key-draw-context");

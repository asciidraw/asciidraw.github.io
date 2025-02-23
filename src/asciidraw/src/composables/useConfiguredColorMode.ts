import {
  LucideCassetteTape,
  type LucideIcon,
  LucideSailboat,
  LucideShell, LucideSnowflake, LucideSprout,
  LucideSunMoon,
  LucideWind
} from "lucide-vue-next";
import { useColorMode } from "@vueuse/core";

type ColorMode = {
  id: string
  classNames: string
  icon: LucideIcon
}

export const colorModes: ColorMode[] = [
  { id: "light", classNames: "light theme-light", icon: LucideSunMoon },
  { id: "dark", classNames: "dark theme-dark", icon: LucideSunMoon },
  { id: "light-bubblegum-pop", classNames: "light bubblegum-pop", icon: LucideShell },
  { id: "dark-bubblegum-pop", classNames: "dark bubblegum-pop", icon: LucideShell },
  { id: "light-steampunk-cogs", classNames: "light steampunk-cogs", icon: LucideWind },
  { id: "dark-steampunk-cogs", classNames: "dark steampunk-cogs", icon: LucideWind },
  { id: "light-vintage-vinyl", classNames: "light vintage-vinyl", icon: LucideCassetteTape },
  { id: "dark-vintage-vinyl", classNames: "dark vintage-vinyl", icon: LucideCassetteTape },
  { id: "light-misty-harbor", classNames: "light misty-harbor", icon: LucideSailboat },
  { id: "dark-misty-harbor", classNames: "dark misty-harbor", icon: LucideSailboat },
  { id: "light-zen-garden", classNames: "light zen-garden", icon: LucideSprout },
  { id: "dark-zen-garden", classNames: "dark zen-garden", icon: LucideSprout },
  { id: "light-winter", classNames: "light winter", icon: LucideSnowflake },
  { id: "dark-winter", classNames: "dark winter", icon: LucideSnowflake },
];

type ColorModeName = (typeof colorModes)[number]['classNames'];

export function useConfiguredColorMode() {
  return useColorMode<ColorModeName>({
    initialValue: "auto",
    modes: Object.fromEntries(colorModes.map(e => [e.id, e.classNames])),
  });
}

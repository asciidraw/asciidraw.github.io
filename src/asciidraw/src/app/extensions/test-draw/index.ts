import {defineExtension, Vector} from "@/lib";

export default defineExtension({
  on: {
    render(app) {
      const x = -10;
      let y = 0;

      // origin
      app.canvas!.highlight(new Vector(0, 0), new Vector(1, 1), '#f009')
      // test-highlight
      app.canvas!.highlight(new Vector(-5, -10), new Vector(5, -2));

      app.canvas!.drawText({ x, y: y++ }, "/------------\\  +------------+  ,------------.");
      app.canvas!.drawText({ x, y: y++ }, "|Hello World!|  |Hello World!|  |Hello World!|");
      app.canvas!.drawText({ x, y: y++ }, "\\------------/  +------------+  `------------´");

      app.canvas!.drawText({ x, y: y++ }, "┌────────────┐  ┌╌╌╌╌╌╌╌╌╌╌╌╌┐  ┌┄┄┄┄┄┄┄┄┄┄┄┄┐  ┌┈┈┈┈┈┈┈┈┈┈┈┈┐");
      app.canvas!.drawText({ x, y: y++ }, "│Hello World!│  ╎Hello World!╎  ┆Hello World!┆  ┊Hello World!┊");
      app.canvas!.drawText({ x, y: y++ }, "└────────────┘  └╌╌╌╌╌╌╌╌╌╌╌╌┘  └┄┄┄┄┄┄┄┄┄┄┄┄┘  └┈┈┈┈┈┈┈┈┈┈┈┈┘");

      app.canvas!.drawText({ x, y: y++ }, "╭────────────╮");
      app.canvas!.drawText({ x, y: y++ }, "│Hello World!│");
      app.canvas!.drawText({ x, y: y++ }, "╰────────────╯");

      app.canvas!.drawText({ x, y: y++ }, "╔════════════╗  ╔════════════╦════════════╗");
      app.canvas!.drawText({ x, y: y++ }, "║Hello World!║  ║Hello World!║Hello World!║");
      app.canvas!.drawText({ x, y: y++ }, "╚════════════╝  ╚════════════╩════════════╝");
    },
  },
});

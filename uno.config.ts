import extractorArbitrary from "@unocss/extractor-arbitrary-variants";
import { defineConfig, presetIcons, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from "unocss";
import { presetUseful } from "unocss-preset-useful";

export default defineConfig({
    presets: [
        presetUno(),
        presetWebFonts({
            fonts: {
                sans: { name: "Inter", weights: ["400", "500", "600", "700", "800", "900"], italic: true },
                mono: { name: "JetBrains Mono", weights: ["400", "500", "600", "700"] },
            },
        }),
        presetIcons(),
        presetUseful({
            scrollbar: true,
            enableMagicAnimations: true,
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
    extractors: [
        extractorArbitrary,
    ],
});

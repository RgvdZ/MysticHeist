import { antfu } from "@antfu/eslint-config";
import react from "eslint-plugin-react";

export default antfu({
    plugins: {
        "react-jsx": react,
    },
    stylistic: {
        indent: 4,
        semi: true,
        jsx: true,
        quotes: "double",
    },
    react: true,
    unocss: true,
    rules: {
        "import/order": [
            "error",
            {
                "groups": [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                ],
                "alphabetize": { order: "asc" },
                "newlines-between": "always",
            },
        ],
        "react-jsx/self-closing-comp": [
            "error",
            {
                component: true,
                html: true,
            },
        ],
    },
});

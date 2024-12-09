import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main, // خروجی CommonJS
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module, // خروجی ESModule
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(), // حذف وابستگی‌های هم‌سطح
      resolve(), // پشتیبانی از ایمپورت ماژول‌ها
      commonjs(), // تبدیل ماژول‌های CommonJS به ESModule
      typescript({ tsconfig: "./tsconfig.json" }), // تبدیل TypeScript به JavaScript
      postcss(), // پردازش CSS
    ],
    external: [
      "react", 
      "react-dom",
      /@some-scope\/.*/, // در صورت وجود وابستگی‌های دیگر
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: packageJson.types, format: "esm" }],
    plugins: [
      dts.default(), // تولید فایل‌های تعریف تایپ
    ],
    external: [/\.css$/], // حذف فایل‌های CSS از خروجی تایپ‌ها
  },
];

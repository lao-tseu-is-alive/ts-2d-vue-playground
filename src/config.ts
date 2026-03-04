import { levelLog, Log } from "cgil-log"

export const APP = "ts-2d-vue-playground"
export const APP_TITLE = "cgil-draw"
export const VERSION = "0.0.1"
export const BUILD_DATE = "2026-03-04"
//import.meta.env.DEV is a boolean that Vite provides out of the box — it's true in dev mode and false in production builds
export const DEV = import.meta.env.DEV
export const getLog = (ModuleName: string, verbosityDev: levelLog, verbosityProd: levelLog) =>
  DEV ? new Log(ModuleName, verbosityDev) : new Log(ModuleName, verbosityProd)
/*
export const HOME = DEV ? "http://localhost:3000/" : "/"
const url = new URL(location.toString())
export const BACKEND_URL = DEV ? "http://localhost:9393" : url.origin

export const defaultAxiosTimeout = 10000 // 10 sec
 */

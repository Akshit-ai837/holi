import { Hono } from "hono";

// Define worker binding types (if any) here. Keep empty if not used.
interface Env {}

const app = new Hono<{ Bindings: Env }>();

export default app;

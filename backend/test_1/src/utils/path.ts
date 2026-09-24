import path from "path";

const resolveFromRoot = (...segments: string[]) => {
    return path.join(import.meta.dirname, ...segments)
}

export { resolveFromRoot }
import path from "path";

export function resolveFromRoot(...segments: string[]) {
    return path.join(process.cwd(), ...segments);
}

declare global {
    var emailTokenMap: Map<string, string> | undefined;
}

export const emailTokenMap =
    global.emailTokenMap ||
    new Map<string, string>();

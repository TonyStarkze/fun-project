/**
 * Returns a port number by parsing string but if arg is not valid numeric string
 * it returns default port passed as second argument.
 * @param arg string to parse as port number
 * @param def default port number
 */
export declare function parsePort(arg: string | undefined, def: number): number;
type Minutes = number;
/**
 * Returns expiry datetime epoh by adding given number of minutes to current time.
 * @param expiringIn number of minutes from now
 */
export declare function getExpiryDate(expiringIn: Minutes): number;
export {};
//# sourceMappingURL=utils.d.ts.map
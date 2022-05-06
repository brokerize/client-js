// stripped-down version of https://github.com/microsoft/TypeScript/blob/master/lib/lib.dom.d.ts (reduced to the parts we actually use).

import { AbortSignal } from './abortSignal';

/** A controller object that allows you to abort one or more DOM requests as and when desired. */
export declare interface AbortController {
    /**
     * Returns the AbortSignal object associated with this object.
     */
    readonly signal: AbortSignal;
    /**
     * Invoking this method will set this object's AbortSignal's aborted flag and signal to any observers that the associated activity is to be aborted.
     */
    abort(): void;
}

export type WhatWgAbortController = {
    prototype: AbortController;
    new (): AbortController;
};

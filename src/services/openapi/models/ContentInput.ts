/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ContentInput = {
    name?: string;
    contentType?: ContentInput.contentType;
    url?: string;
};
export namespace ContentInput {
    export enum contentType {
        SPOTIFY = 'SPOTIFY',
        PATREON = 'PATREON',
        YOUTUBE = 'YOUTUBE',
    }
}


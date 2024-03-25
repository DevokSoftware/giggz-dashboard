/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventComedianResponse } from './EventComedianResponse';
import type { Location } from './Location';
export type EventResponse = {
    id: string;
    name: string;
    date?: string;
    description?: string;
    poster?: string;
    price?: number;
    url?: string;
    location?: Location;
    comedians?: Array<EventComedianResponse>;
};


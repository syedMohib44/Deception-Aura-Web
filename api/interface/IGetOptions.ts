import { PaginateOptions } from 'mongoose';

export interface IGetOptions {
    /**
  * Search for any term like ?q=<anything>
  */
    q?: string;
    /**
     * Search for specific terms like ?firstName=<string>&lastName=<string>
     */
    search?: any;
    [key: string]: any;
}

export interface IGetOptionsWithPaginate extends IGetOptions, PaginateOptions {
}
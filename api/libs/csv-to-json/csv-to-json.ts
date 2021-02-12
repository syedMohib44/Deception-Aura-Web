import { parse, ParseConfig } from 'papaparse';

interface CustomParseConfig {
    header?: boolean; // default: false
    skipEmptyLines?: boolean; // default: false
}

export const csvToJSON = (csv: string | File | NodeJS.ReadableStream, options?: CustomParseConfig | undefined): any[] => {
    const json = parse(csv, options);
    return json.data;
};

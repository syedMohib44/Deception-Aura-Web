import { csvToJSON } from './csv-to-json';

describe('CSV To JSON test', () => {
    const csv = 'name,age\njack,bill';

    it('should be an array', () => {
        const json = csvToJSON(csv);
        expect(json).toEqual(expect.any(Array));
    });

    it('should show with header', () => {
        const json = csvToJSON(csv, { header: true });
        expect(Object.keys(json[0])).toEqual(['name', 'age']);
    });

    it('should have correct values w/o header', () => {
        const json = csvToJSON(csv);
        expect(json[1]).toEqual(['jack', 'bill']);
    });

    it('should have correct values with header', () => {
        const json = csvToJSON(csv);
        expect(Object.values(json[1])).toEqual(['jack', 'bill']);
    });
});

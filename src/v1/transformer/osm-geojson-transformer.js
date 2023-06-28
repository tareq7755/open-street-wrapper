import osmtogeojson from 'osmtogeojson';

/**
 * @description uses osmtogeojson to transform osm format to json format
 *
 * @param osmData
 * @returns {Promise<JSON>}
 */
const transform = async (osmData) => osmtogeojson(osmData, {});

export default transform;

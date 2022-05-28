import fs from 'fs';

/** @type {import('/api/enchant-list').RequestHandler}  */
export function get() {
  const jsonObject = JSON.parse(fs.readFileSync('src/json/enchantList.json', 'utf8'));

  if (!jsonObject) return { status: 404, body: [] };

  return {
    status: 200,
    body: jsonObject,
  };
}

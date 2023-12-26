import { Tool } from 'langchain/tools';
import { CogsrchClient } from './cogsrchClient';

export class CogsrchTool extends Tool {
  name = 'culturedeck';
  //description = '株式会社エーピーコミュニケーションズのACSD事業部の採用資料です。インプットは検索クエリ、アウトプットは検索結果です。';
  description = '令和5年厚生労働白書。社会保障を支える人材の現状への理解を深め、今後の医療・福祉サービス提供体制と人材確保について考える資料です。インプットは検索クエリ、アウトプットは検索結果です。';
  constructor() {
    super();
  }

  async _call(input: any) {
    try {
      const client = new CogsrchClient();
      const result = await client.searchVector(input, { top: 1 });
      const arr = result.data.value;
      if (arr.length > 0) {
        const docs = arr.map((item: any) => {
          return item.content;
        });
        return docs.join('\n');
      } else {
        return 'No results found';
      }
    } catch (err) {
      console.log("🚀 ~ file: cogsrchTool.ts:22 ~ CognitiveSearchTool ~ _call ~ err:", err)
    }
  }
}
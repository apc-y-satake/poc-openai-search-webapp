import { Tool } from 'langchain/tools';
import { CogsrchClient } from './cogsrchClient';

export class CogsrchTool extends Tool {
  name = 'culturedeck';
  description = `株式会社エーピーコミュニケーションズのACSD事業部のCulture Deck。エーピーコミュニケーションズの紹介や事業内容、人事制度や採用プロセスが記載されています。インプットは検索クエリ、アウトプットは検索結果です。`;
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
      console.log(
        '🚀 ~ file: cogsrchTool.ts:22 ~ CognitiveSearchTool ~ _call ~ err:',
        err
      );
    }
  }
}

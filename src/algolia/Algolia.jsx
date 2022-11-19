import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-hooks-web";
import { appID, apiKey } from "../config/constants_algolia";

const indexName = "dev_productdata";
const algoliaClient = algoliasearch(appID, apiKey);

/**
 * 初回表示時の実行を制御する
 */
export const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      });
    }
    return algoliaClient.search(requests);
  },
};

/**
 * ヒットした商品を返す
 * @returns ヒットした商品
 */
export const Hit = ({ hit }) => {
  return (
    <article>
      <h1>{hit.title}</h1>
      <p>{hit.category}</p>
      <p>{hit.description}</p>
    </article>
  );
};

/**
 * algolia InstantSearchコンポーネントを返す
 * @param children
 * @returns アルゴリア InstantSearch
 */
const AlgoliaInstantSearch = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
};

export default AlgoliaInstantSearch;

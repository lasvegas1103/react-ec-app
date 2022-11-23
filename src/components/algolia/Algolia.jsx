import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Configure } from "react-instantsearch-hooks-web";
import { appID, apiKey, indexName } from "../../config/constants_algolia";

const algoliaClient = algoliasearch(appID, apiKey);

/**
 * algolia InstantSearchコンポーネントを返す
 * @returns アルゴリア InstantSearch
 */
const AlgoliaInstantSearch = ({ children }) => {
  return (
    <InstantSearch searchClient={algoliaClient} indexName={indexName}>
      <Configure hitsPerPage={10} />
      {children}
    </InstantSearch>
  );
};

export default AlgoliaInstantSearch;

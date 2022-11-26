import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Configure } from "react-instantsearch-hooks-web";
import { appID, apiKey, indexName } from "../../config/constants_algolia";

/**
 * algolia InstantSearchコンポーネントを返す
 * @returns アルゴリア InstantSearch
 */
const AlgoliaInstantSearch = ({ children }) => {
  const algoliaClient = algoliasearch(appID, apiKey);
  return (
    <InstantSearch
      searchClient={algoliaClient}
      indexName={indexName}
      routing={true}
    >
      <Configure hitsPerPage={50} />
      {children}
    </InstantSearch>
  );
};

export default AlgoliaInstantSearch;

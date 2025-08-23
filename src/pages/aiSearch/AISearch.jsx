import { useState } from "react";
import { getToken } from "../../utils/auth";
import { searchWithAI } from "../../api/ai";
import { FaSearch } from "react-icons/fa";
import PropertyCard from "../../components/PropertyCard";
import PropertyListing from "../../components/PropertyListings";

function AISearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchProperties = async () => {
    const token = getToken();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await searchWithAI(token, { query });
      setResults(data);
      setQuery("");
      console.log("[DEBUG] - ", data);
    } catch (error) {
      setResults({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="container py-4">
        <div className="text-center mb-4">
          <h2 className="d-flex justify-content-center gap-4 align-items-center">
            AI Property Search
          </h2>
          <p className="text-muted">Tell AI what you're looking for...</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-10">
            <div className="input-group input-group-lg shadow-sm rounded">
              <input
                type="text"
                className="form-control py-1"
                placeholder="Example: I need a 3-bedroom house under 500k with a big yard..."
                aria-label="Search for properties"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="btn btn-primary px-4"
                type="button"
                onClick={searchProperties}
                disabled={loading || !query.trim()}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm"></span>
                  </>
                ) : (
                  <>
                    <FaSearch />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {!results && (
          <div className="row justify-content-center my-4">
            <div className="col-md-10">
              <div className="card">
                <div className="card-body">
                  <h6 className="mb-3 text-muted">Try these examples:</h6>
                  <div className="d-flex justify-content-between gap-2 flex-wrap">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setQuery("I need a cheap apartment.")}
                    >
                      "I need a cheap apartment."
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setQuery("Show me luxury properties.")}
                    >
                      "Show me luxury properties."
                    </button>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        setQuery("Properties that are close to the ocean.")
                      }
                    >
                      "Close to the ocean."
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setQuery("South Florida Houses")}
                    >
                      "South Florida Houses"
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {results && (
          <div className="row py-4">
            <div className="col-12">
              {results.error ? (
                <>
                  <div className="alert alert-danger">
                    <strong>Error:</strong> {results.error}
                  </div>
                </>
              ) : (
                <>
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5>AI Recommendation:</h5>
                      <p>{results.message}</p>
                      <small className="text-muted">
                        Found: {results.recommended_listings.length} properties.
                      </small>
                    </div>
                  </div>
                  {console.log(
                    "results.recommended_listings.length > 0",
                    results.recommended_listings.length > 0
                  )}
                  {results.recommended_listings.length > 0 ? (
                    <PropertyListing
                      properties={results.recommended_listings}
                    />
                  ) : (
                    <div className="alert alert-info">
                      No properties match your criteria. Try a different search
                      query!
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AISearch;

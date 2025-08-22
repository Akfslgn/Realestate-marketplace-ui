import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="container mb-4">
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="input-group input-group-lg shadow-sm rounded">
            <input 
              type="text" 
              className="form-control py-1" 
              placeholder="Search by address, city, or ZIP code..."
              aria-label="Search for properties"
            />
            <button className="btn btn-primary px-4" type="button">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
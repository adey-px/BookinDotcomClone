import useCount from "../../acustomHooks/useCount";
import "./featuredProp.css";


const FeaturedProp = () => {

  // State variables from usecount function hook
  const {loading, data, error} = useCount("hotel/all-hotels?featured=true&limit=4");

  return (
    <div className="fp"> 

      {loading ? ("Loading please wait...") : (
        <>
        {data.map((item) => (
          <div className="fpItem" key={item._id}>
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
              alt="Featured property"
              className="fpImg"
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">
              Starting from ${item.cheapestPrice}
            </span>

            {item.rating ? 
              <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>
                :
              <div className="fpRating">
                <button>0.0</button>
                <span>No Rating</span>
              </div>  
            }
          </div>
        ))}
        </>
      )}

    </div>
  );
};

export default FeaturedProp;
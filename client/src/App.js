import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import HotelDetail from './pages/hotelDetail/HotelDetail';
import SearchList from './pages/searchPage/SearchPage';
import UserLogin from './pages/userLogin/UserLogin';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<HomePage />}
				/>
				<Route
					path='/login'
					element={<UserLogin />}
				/>
				<Route
					path='hotels/sort-by-city'
					element={<SearchList />}
				/>
				<Route
					path='hotels/unit-hotel/:id'
					element={<HotelDetail />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

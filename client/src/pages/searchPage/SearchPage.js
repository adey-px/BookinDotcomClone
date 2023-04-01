import { useState } from 'react';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import useFetch from '../../hooks/useFetch';

import NavbarComp from '../../components/navbarComp/Navbar';
import HeaderComp from '../../components/headerComp/Header';
import SearchList from '../../components/searchList/SearchList';
import './searchPage.css';

const SearchPage = () => {
	//
	const location = useLocation();

	// State hooks from search bar in header comp
	const [destination, setDestination] = useState(
		location.state.destination
	);
	const [date, setDate] = useState(location.state.date);
	const [openDate, setOpenDate] = useState(false);
	const [option, setOption] = useState(
		location.state.option
	);

	// State hooks for min & max filter
	const [min, setMin] = useState(undefined);
	const [max, setMax] = useState(undefined);

	// State var from useCount function hook. Prefix path taken from app.js/hotelRoute
	const { loading, data, error, sortData } = useFetch(
		`/hotels/get-hotels?city=${destination}&min=${
			min || 0
		}&max=${max || 999}`
	);

	// search button function. Refetch taken from useCount custom hook
	const searchBtn = () => {
		sortData();
	};

	return (
		<div>
			<NavbarComp />
			<HeaderComp type='hotels-list' />

			<div className='listContainer'>
				<div className='listWrapper'>
					<div className='listSearch'>
						<h1 className='lsTitle'>Your Current Search</h1>

						<div className='lsItem'>
							<label>Intended Destination</label>
							<input
								placeholder={destination}
								type='text'
							/>
						</div>

						<div className='lsItem'>
							<label>Length of stay</label>

							<span onClick={() => setOpenDate(!openDate)}>
								{`${format(
									date[0].startDate,
									'MM/dd/yyyy'
								)} to ${format(
									date[0].endDate,
									'MM/dd/yyyy'
								)}`}
							</span>

							{openDate && (
								<DateRange
									onChange={(item) =>
										setDate([item.selection])
									}
									minDate={new Date()}
									ranges={date}
								/>
							)}
						</div>

						<div className='lsItem'>
							<label>Options</label>

							<div className='lsOptions'>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>
										Min price <small>per night</small>
									</span>
									<input
										type='number'
										className='lsOptionInput'
										onChange={(e) => setMin(e.target.value)}
									/>
								</div>

								<div className='lsOptionItem'>
									<span className='lsOptionText'>
										Max price <small>per night</small>
									</span>
									<input
										type='number'
										className='lsOptionInput'
										onChange={(e) => setMax(e.target.value)}
									/>
								</div>

								<div className='lsOptionItem'>
									<span className='lsOptionText'>
										Adult
									</span>
									<input
										type='number'
										min={1}
										className='lsOptionInput'
										placeholder={option.adult}
									/>
								</div>

								<div className='lsOptionItem'>
									<span className='lsOptionText'>
										Children
									</span>
									<input
										type='number'
										min={0}
										className='lsOptionInput'
										placeholder={option.children}
									/>
								</div>

								<div className='lsOptionItem'>
									<span className='lsOptionText'>Room</span>
									<input
										type='number'
										min={1}
										className='lsOptionInput'
										placeholder={option.room}
									/>
								</div>
							</div>
						</div>

						<button onClick={searchBtn}>Search</button>
					</div>

					{/* Search result on right. Pass item to searchList comp */}
					<div className='listResult'>
						{loading ? (
							'Loading please wait...'
						) : (
							<>
								{data.map((item) => (
									<SearchList
										item={item}
										key={item._id}
									/>
								))}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchPage;

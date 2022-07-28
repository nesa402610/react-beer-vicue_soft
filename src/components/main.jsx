import React, {useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Main = () => {
    const [beers, setBeers] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const findBeer = (e) => {
        if (e.key === 'Enter') {
            axios.get(`https://api.punkapi.com/v2/beers?beer_name=${search}&page=${page}&per_page=10`).then(r => setBeers(r.data));
        }
    };
    const nextPage = () => {
        if (beers.length > 0) {
            setPage(page + 1);
            axios.get(`https://api.punkapi.com/v2/beers?beer_name=${search}&page=${page+1}&per_page=10`).then(r => setBeers(r.data));
        }

    };
    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
            axios.get(`https://api.punkapi.com/v2/beers?beer_name=${search}&page=${page-1}&per_page=10`).then(r => setBeers(r.data));
        }
    };
    return (
        <div className={'container m-auto mt-8'}>
            <div className={'flex justify-center mb-8'}>
                <input className={'border px-4 py-2 shadow-lg w-full'}
                       value={search}
                       onChange={e => setSearch(e.target.value)}
                       type="text"
                       placeholder={'IPA...'}
                       onKeyPress={e => findBeer(e)}
                />
            </div>
            <div className={'flex gap-4 justify-center flex-wrap'}>
                {
                    beers.map(beer =>
                        <Link to={'/'+beer.id} key={beer.id} className={'flex flex-col items-center border w-2/5 p-4'}>
                            <img className={'w-20 mb-6'} src={beer.image_url} alt=""/>
                            <div>
                                <div className={'font-bold text-center'}>
                                    {beer.name}
                                </div>
                                <div>
                                    {beer.description}
                                    {beer.description.length > 140 ? (beer.description.substr(0, 140) + '...') : beer.description}
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>
            <div className={'flex gap-4 justify-center'}>
                <div onClick={prevPage}>
                    Back
                </div>
                <div>
                    {page}
                </div>
                <div onClick={nextPage}>
                    Next
                </div>
            </div>
        </div>
    );
};

export default Main;
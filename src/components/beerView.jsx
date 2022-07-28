import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const BeerView = () => {
    const param = useParams();
    console.log(param);
    const [beer, setBeer] = useState({});
    console.log(beer);

    useEffect(() => {
        axios.get('https://api.punkapi.com/v2/beers/' + param.beer).then(r => setBeer(r.data[0]));
    }, [param.beer]);
    return (
        <div className={'container m-auto my-8'}>
            <div className={'flex'}>
                <div className={'border-r border-black px-4'}>
                    <img src={beer.image_url} alt="" style={{maxHeight: '400px'}}/>
                </div>
                <div className={'flex flex-col px-4 w-2/3'}>
                    <div className={'font-bold text-xl'}>
                        {beer.name}
                    </div>
                    <div className={'py-2'}>
                        {beer.description}
                    </div>
                    <div>
                        <span className={'font-bold'}>Tagline:</span> {beer.tagline}
                        <span className={'font-bold'}>ABV:</span> {beer.abv}
                        <div>
                            <div className={'font-bold'}>
                                Food pairing:
                            </div>
                            {beer.food_pairing?.map(item =>
                                <div className={'list-item ml-4'}>
                                    {item}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeerView;
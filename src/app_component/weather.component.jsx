import React from 'react';

const Weather = (para) => {
    return (
        <div className="container text-light">
            <div className="cards pt-4">
                <h1>
                    {para.city}
                </h1>
                <h5 className="py-4">
                    <i className={`wi ${para.weatherIcon} display-1`}></i>
                </h5>
                
                {/** show the temperature, humidity, precipitation*/}
                {temHumPre(para.temp, para.hum, para.pre)}

                <h4 className="py-3">{para.description}</h4>
            </div>
        </div>
    );
};

function temHumPre(tem, hum, pre){
    if(tem || hum || pre) {
        if(!pre)
            pre = 0
        return (
            <h3>
                <span className="px-4">{tem}&deg;</span>
                <span className="px-4">{hum}%</span>
                <span className="px-4">{pre}mm</span>
            </h3>
        )
    }
}

export default Weather;
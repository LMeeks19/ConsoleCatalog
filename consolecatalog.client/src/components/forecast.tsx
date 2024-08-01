import { useEffect, useState } from 'react';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function Forecast() {
    const [forecasts, setForecasts] = useState<Forecast[]>();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th style={{'color':'black'}}>Date</th>
                    <th style={{'color':'black'}}>Temp. (C)</th>
                    <th style={{'color':'black'}}>Temp. (F)</th>
                    <th style={{'color':'black'}}>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td style={{'color':'black'}}>{forecast.date}</td>
                        <td style={{'color':'black'}}>{forecast.temperatureC}</td>
                        <td style={{'color':'black'}}>{forecast.temperatureF}</td>
                        <td style={{'color':'black'}}>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }
}

export default Forecast;
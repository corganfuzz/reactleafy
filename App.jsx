import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Control from 'react-leaflet-control';

const stamenTonerTiles = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [29.7592488, -95.3707675];
const zoomLevel = 12;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { currentZoomLevel: zoomLevel};
        this.handleUpClick = this.handleUpClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleDownClick = this.handleDownClick.bind(this);
    }

    componentDidMount() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.on('zoomend', () => {
           const updatedZoomLevel = leafletMap.getZoom();
           this.handleZoomLevelChange(updatedZoomLevel);
        });
    }

    handleZoomLevelChange (newZoomLevel) {
        this.setState({ currentZoomLevel: newZoomLevel});
    }

    handleUpClick() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.panBy([0, -100]);
        window.console.log('moving up');
    }

    handleRightClick() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.panBy([100, 0])
        window.console.log('moving right');
    }

    handleLeftClick() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.panBy([-100, 0])
        window.console.log('moving left');
    }

    handleDownClick() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.panBy([0, 100])
        window.console.log('moving down');
    }

    render() {
        window.console.log('this.state.currentZoomLevel ->',
        this.state.currentZoomLevel);

        return (
            <div>
                <Map
                    ref={m=> {this.leafletMap = m; }}
                    center={mapCenter}
                    zoom={zoomLevel}
                >
                    <TileLayer
                        attribution={stamenTonerAttr}
                        url={stamenTonerTiles}
                    />
                    <Marker position={mapCenter}>
                        <Popup>
                            <span> EOG Resources <br/> is here</span>
                        </Popup>
                    </Marker>
                    <Control position="bottomleft">
                        <div style={{backgroundColor: 'blue', padding: '5px'}}>

                            <div style={{ marginLeft: '37px'}}>
                                <button onClick={this.handleUpClick}>
                                    Move Up
                                </button>
                            </div>
                            <div>
                                <button onClick={this.handleLeftClick}>
                                    Move Left
                                </button>

                                <button onClick={this.handleRightClick}>
                                    Move Right
                                </button>
                            </div>
                            <div style={{ marginLeft: '34px'}}>
                                <button onClick={this.handleDownClick}>
                                    Move Down
                                </button>
                            </div>
                        </div>
                    </Control>
                </Map>
            </div>
        );
    }
}

render(
    <App />,
    document.getElementById('mount')
);

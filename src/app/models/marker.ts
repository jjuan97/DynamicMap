import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';

interface ILayer {
    generateLayer(): VectorLayer<any>;
}

export class Marker implements ILayer {
    private lon: number;
    private lat: number;

    constructor(lon: number, lat: number) {
        this.lon = lon;
        this.lat = lat;
    }

    getLon(){
        return this.lon;
    }

    getLat(){
        return this.lat;
    }

    generateLayer(): VectorLayer<any> {
        const marker = new Feature({
            geometry: new Point(fromLonLat([this.lon, this.lat])),
            name: 'Point'
        });
        const iconStyle = new Style({
            image: new Icon({
                anchor: [0.5, 35],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: 'assets/marker.png',
            }),
        });

        marker.setStyle(iconStyle);

        const vectorSource = new VectorSource({
            features: [marker],
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
        });

        return vectorLayer;
    }

}
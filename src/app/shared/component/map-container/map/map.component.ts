import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { latLng, MapOptions, Map, tileLayer, Marker, icon, LeafletMouseEvent, marker } from 'leaflet';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../../../../app.constants';

import { MapPoint } from '../../../models/map/map-point';
import { NominatimResponse } from '../../../models/map/nominatim-response.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {


  _mapPointInput: MapPoint;
  get mapPointInput(): MapPoint {
      return this._mapPointInput;
  }

  @Input() set mapPointInput(value: MapPoint) {
     this._mapPointInput = value;
  }

  _setMapCoordinates: MapPoint;
  get setMapCoordinates(): MapPoint {
      return this._setMapCoordinates;
  }
  @Input() set setMapCoordinates(value: MapPoint) {
    if (value){
      this.setPoint(value);
    }

  }
  @Output() public coordinates: EventEmitter<MapPoint> =
    new EventEmitter<MapPoint>();

  map: Map;
  mapPoint: MapPoint;
  options: MapOptions;
  lastLayer: any;
  fullHeight = false;

  results: NominatimResponse[];

  constructor() {
  }

  ngOnInit() {
    this.initializeDefaultMapPoint();
    this.initializeMapOptions();
  }

  ngOnChanges() {
  }

  initializeMap(map: Map) {
    this.map = map;
    const mapName = 'Hello';
    const latitude = DEFAULT_LATITUDE;
    const longitude = DEFAULT_LONGITUDE;
    if (this.mapPointInput.latitude && this.mapPointInput.longitude){
      this.createMarker(mapName, this.mapPointInput.latitude, this.mapPointInput.longitude);
    } else {
      this.createMarker(mapName, latitude, longitude);
    }

  }


  private initializeMapOptions() {
    this.options = {
      zoom: 12,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'OSM' })
      ]
    };
  }

  private initializeDefaultMapPoint() {
    this.mapPoint = {
      name: 'Hello',
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE
    };
  }

  private setPoint(map: any){
    this.clearMap();
    const mapIcon = this.getDefaultIcon();

    const coordinates = latLng([map.latitude, map.longitude]);
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, this.map.getZoom());
  }

  private createMarker(name: string, latitude: number, longitude: number) {
    const mapIcon = this.getDefaultIcon();
    const coordinates = latLng([latitude, longitude]);
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, this.map.getZoom());
  }

  private getDefaultIcon() {
    return icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png'
    });
  }

  private clearMap() {
    if (this.lastLayer && this.map.hasLayer(this.lastLayer)) {
      this.map.removeLayer(this.lastLayer); }
    }

}

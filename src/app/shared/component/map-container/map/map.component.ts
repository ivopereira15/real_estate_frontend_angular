import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { latLng, MapOptions, Map, tileLayer, Marker, icon, LeafletMouseEvent, marker } from 'leaflet';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from 'src/app/app.constants';
import { NominatimResponse } from 'src/app/shared/models/map/nominatim-response.model';
import { MapPoint } from '../../../models/map/map-point';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  @Input() public mapPointInput: MapPoint;
  @Output() public coordinates: EventEmitter<MapPoint> =
    new EventEmitter<MapPoint>();

  map: Map;
  mapPoint: MapPoint;
  options: MapOptions;
  lastLayer: any;

  results: NominatimResponse[];

  constructor() {
  }

  ngOnInit() {
    this.initializeDefaultMapPoint();
    this.initializeMapOptions();
  }

  ngOnChanges() {
    if (this.map && this.mapPointInput && this.mapPointInput.latitude && this.mapPointInput.longitude) {
      this.updateMapPoint(this.mapPointInput.latitude, this.mapPointInput.longitude, "update");
      this.createMarker();
    }

  }

  initializeMap(map: Map) {
    this.map = map;
    this.createMarker();
  }

  // getAddress(result: NominatimResponse) {
  //   this.updateMapPoint(result.latitude, result.longitude, result.displayName);
  //   this.createMarker();
  // }

  // refreshSearchList(results: NominatimResponse[]) {
  //   this.results = results;
  // }

  onMapClick(e: LeafletMouseEvent) {
    console.log(e);
    this.clearMap();
    this.updateMapPoint(e.latlng.lat, e.latlng.lng);
    this.createMarker();
    this.coordinates.emit(this.mapPoint);
  }

  private initializeMapOptions() {
    this.options = {
      zoom: 12,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'OSM' })
      ]
    }
  }

  private initializeDefaultMapPoint() {
    this.mapPoint = {
      name: 'Hello',
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE
    };
  }

  private updateMapPoint(latitude: number, longitude: number, name?: string) {
    this.mapPoint = {
      latitude,
      longitude,
      name: name ? name : this.mapPoint.name
    };
  }

  private createMarker() {
    this.clearMap();
    const mapIcon = this.getDefaultIcon();
    const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
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
    if (this.map.hasLayer(this.lastLayer)) { this.map.removeLayer(this.lastLayer); }
  }

}

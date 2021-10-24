import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { latLng, MapOptions, Map, tileLayer, Marker, icon, LeafletMouseEvent, marker } from 'leaflet';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from 'src/app/app.constants';
import { NominatimResponse } from 'src/app/shared/models/map/nominatim-response.model';
import { MapPoint } from '../../../models/map/map-point';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss']
})
export class MapSearchComponent implements OnInit, OnChanges {

  @Input() public mapPointInputList: MapPoint[];
  @Output() public coordinates: EventEmitter<MapPoint> =
    new EventEmitter<MapPoint>();

  map: Map;
  // mapPoint: MapPoint;
  options: MapOptions;
  lastLayer: any;
  fullHeight: boolean = false;

  results: NominatimResponse[];

  constructor() {
  }

  ngOnInit() {
    this.initializeMapOptions();
  }

  ngOnChanges() {
    if (this.map) {
      this.clearMap();
      console.log(this.mapPointInputList);
      if (this.mapPointInputList !== undefined) {

        this.mapPointInputList.forEach(a => {
          if (a && a.latitude && a.longitude) {
            this.createMarker('update', a.latitude, a.longitude);
          }
        });
      }
    }
  }

  initializeMap(map: Map) {
    this.map = map;
    const mapName = 'Hello';
    const latitude = DEFAULT_LATITUDE;
    const longitude = DEFAULT_LONGITUDE;
    this.createMarker(mapName, latitude, longitude);
  }
  // getAddress(result: NominatimResponse) {
  //   this.updateMapPoint(result.latitude, result.longitude, result.displayName);
  //   this.createMarker();
  // }

  // refreshSearchList(results: NominatimResponse[]) {
  //   this.results = results;
  // }

  // onMapClick(e: LeafletMouseEvent) {
  //   console.log(e);
  //   // this.clearMap();
  //   this.updateMapPoint(e.latlng.lat, e.latlng.lng);
  //   this.createMarker();
  //   this.coordinates.emit(this.mapPoint);
  // }

  private initializeMapOptions() {
    this.options = {
      zoom: 12,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'OSM' })
      ]
    }
  }

  // private updateMapPoint(latitude: number, longitude: number, name?: string) {
  //   this.mapPoint = {
  //     latitude,
  //     longitude,
  //     name: name ? name : this.mapPoint.name
  //   };
  // }

  private createMarker(name: string, latitude: number, longitude: number) {
    // this.clearMap();
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
    if (this.map.hasLayer(this.lastLayer)) { this.map.removeLayer(this.lastLayer); }
  }

}

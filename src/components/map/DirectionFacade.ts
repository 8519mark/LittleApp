

type latLng = google.maps.LatLngLiteral;
type PinType = {
    id : number
    center : latLng,
    selected : boolean,
}

type RequestType = {
    origin: {
        lat: number;
        lng: number;
    };
    destination: {
        lat: number;
        lng: number;
    };
    travelMode: google.maps.TravelMode;
}

export default class DirectionFacade {

    private service : google.maps.DirectionsService;
    private directions : google.maps.DirectionsResult[];

    constructor() {
        // to be used to route
        this.service = new google.maps.DirectionsService();
        // because we need to bind it to a map
        this.directions = [];
    }

    public async addVertices(pins: PinType[], mode : google.maps.TravelMode) : Promise<google.maps.DirectionsResult[]> {
        const requests : RequestType[] = [];
        const selectedPins : PinType[] = pins.filter((pin) => (pin.selected));
        // handle async 
        const directionsPromises : Promise<google.maps.DirectionsResult | null>[] = [];

        selectedPins.forEach((pin_i, i) => {
            selectedPins.forEach((pin_j, j) => {
                if (i !== j) {
                    requests.push({
                        origin : pin_i.center,
                        destination : pin_j.center,
                        travelMode : mode
                    });
                };
            });
        });

        // routing is async, need to use promise :
        requests.map((request) => {
            directionsPromises.push(new Promise<google.maps.DirectionsResult | null>(
                (resolve, reject) => {
                    this.service.route(request, (result, status) => {
                        if (status === 'OK' && result !== null ) {
                            resolve(result);
                        } else {
                            resolve(null);
                        }
                        // dont need to reject, google seems to be doing well, avoid handling error
                    });
                }))
            return request;
        });

        const directionsResolved = await Promise.all(directionsPromises);
        const directionsFinal = directionsResolved.filter((direction) => direction !== null) as google.maps.DirectionsResult[];
        return directionsFinal;
    }

    public performMST() : google.maps.DirectionsResult[] {
        return this.directions;
    }
}
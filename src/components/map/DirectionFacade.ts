

type latLng = google.maps.LatLngLiteral;
type PinType = {
    id : number
    center : latLng,
    selected : boolean,
}

type RequestType = {
    origin : latLng;
    destination : latLng;
    travelMode : google.maps.TravelMode;
}

type EdgeType = {
    origin : latLng;
    destination : latLng;
    direction : google.maps.DirectionsResult;
    distance : number;
}

export default class DirectionFacade {

    private service : google.maps.DirectionsService;
    private edges : EdgeType[];

    constructor() {
        // to be used to route
        this.service = new google.maps.DirectionsService();
        // because we need to bind it to a map
        this.edges = [];
    }

    public async addVertices(pins: PinType[], mode : google.maps.TravelMode) : Promise<google.maps.DirectionsResult[]> {
        const requests : RequestType[] = [];
        const selectedPins : PinType[] = pins.filter((pin) => (pin.selected));
        // handle async 
        const directionsPromises : Promise<EdgeType | null>[] = [];

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
            directionsPromises.push(new Promise<EdgeType| null>(
                (resolve, reject) => {
                    this.service.route(request, (result, status) => {
                        if (status === 'OK' && result !== null && result.routes[0].legs[0].distance?.value !== undefined) {
                            const edges : EdgeType = {
                                origin : request.origin,
                                destination : request.destination,
                                direction : result,
                                distance : result.routes[0].legs[0].distance?.value
                            }
                            resolve(edges);
                        } else {
                            resolve(null);
                        }
                        // dont need to reject, google seems to be doing well, avoid handling error
                    });
                }))
            return request;
        });

        const directionsResolved = await Promise.all(directionsPromises);
        const directionsFinal = directionsResolved.filter((vertex) => vertex !== null) as EdgeType[];
        this.edges = directionsFinal;
        return this.edges.map((edge)=>(edge.direction));
    }

    public performTSP() : google.maps.DirectionsResult[] {
        // find a ONE-WAY path in a directd graph --> Traveling Salesman Problem (TSP)
        // problem : a NP hard problem, might be slow
        // alternative solution : Nearest Neighbour Heurisitc
        const n = this.edges.length;
        const visitedVertices : Set<latLng> = new Set();
        const result : google.maps.DirectionsResult[] = [];

        // get a starting position --> first one
        let currentVertex = this.edges[0].origin;
        visitedVertices.add(currentVertex);

        // iterate through all edges (n - 1) cuz got vertex added after
        while (result.length < n - 1) {
            // min = inf
            let minDistance = Number.MAX_SAFE_INTEGER;
            let nextEdge : EdgeType | null = null;

            const unvisitedNeighbors : EdgeType[] = this.getUnvisitedNeighbors(currentVertex, visitedVertices);
            // update min
            // cannot use forEach
            for (const unvisitedNeighbor of unvisitedNeighbors) {
                if (unvisitedNeighbor.distance < minDistance) {
                    minDistance = unvisitedNeighbor.distance;
                    nextEdge = unvisitedNeighbor;
                }
            }
            if (nextEdge === null) return result;
            // update result
            visitedVertices.add(nextEdge.destination);
            result.push(nextEdge.direction);

            // Move to the next vertex (destination of the selected edge)
            currentVertex = nextEdge.destination;
        }

        return result;
    }
    

    private getUnvisitedNeighbors(currentVertex: latLng, visitedVertices: Set<latLng>) : EdgeType[] {
        return this.edges.filter((edge) => {
            return edge.origin === currentVertex && !visitedVertices.has(edge.destination);
        });
      }
}
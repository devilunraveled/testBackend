# Using Google Places API for Ratio Assignment

## Controllers
There are three controllers implemented here, all three directly use the Google API. The three controllers are as follows:

### `searchPlaceFromQuery`

**Necessary Params** :
- `queryText` (_Actual text regarding the query, can be the name of the place or a part of it._)
- `fields` (_List of fields to retrieve regarding the place. **Default : ['displayName', 'id', 'formattedAddress']**_)

**Optional Params** :
- `includedType` (_List of types to retrieve regarding the place. **Default : ['restaurant', 'bar', 'cafe']**_)
- `languageCode` (_Language of the search. **Default : en**_)
- `locationBias` (_Check the docs for more info._)
- `locationRestriction` (_Check the docs for more info, you typically need to return a location object with longitude and latitude, shape and dimensions.__)
- `maxResultCount` (_Maximum number of results to retrieve. (Pagination) **Default : 10**_)
- `evOptions` (_Check the docs for more info._)
- `minRating` (_Minimum rating of the place. **Default : 0**_)
- `openNow` (_Whether the place should be open now. **Default : true**_)
- `priceLevels` (_List of price levels of the place. **Default : No Range**_)
- `rankPreference` (_Rank preference of the search. **Default : POPULARITY**_)
- `regionCode` (_Region of the search. **Default : 'us'**_)
- `strictTypeFiltering` (_Whether to use strict filtering. **Default : false**_)

---
### `searchPlacesNearby`

**Necessary Params** :
- `latitute` (_Latitude of the location._)
- `longitude` (_Longitude of the location._)
- `fields` (_List of fields to retrieve regarding the place. **Default : ['displayName', 'location', 'businessStatus']**_)

**Optional Params**
- `radius` (_Radius of the search. **Default : 5000**_)
- `includedTypes` (_List of types to retrieve regarding the place. **Default : 'restaurant'**_)
- `includedPrimaryTypes` (_List of primary types to retrieve regarding the place. **Default : None**_)
- `excludedTypes` (_List of types to exclude regarding the place. **Default : None**_)
- `excludedPrimaryTypes` (_List of primary types to exclude regarding the place. **Default : None**_)
- `languageCode` (_Language of the search. **Default : en**_)
- `maxResultCount` (_Maximum number of results to retrieve. (Pagination) **Default : 10**_)
- `rankPreference` (_Rank preference of the search. **Default : POPULARITY**_)
- `regionCode` (_Region of the search. **Default : 'us'**_)

---
### `getPlaceDetails`

**Necessary Params** :
- `placeId` (_ID of the place._)
- `fields` (_List of fields to retrieve regarding the place. **Default : ['displayName', 'location', 'businessStatus', 'formattedAddress']**_)

**Optional Params** :
- `languageCode` (_Language of the search. **Default : en**_)
- `sessionToken` (_Check the docs for more info._)

---

> _Usage_ : A typical search usage would consist of first calling either of the wuery methods to obtain a list of `place` objects. Then, for a selected restaurant, a call to `getPlaceDetails` should be made along with the required fields to retrieve.

All the Place controllers are implemented in [controllers/places.js](./controllers/places.js).Whereas the corresponfing routes are implemented in [routes/places.js](./routes/places.js).

The `place` routes are prepended in the [index.js](./index.js) with `/places`.

So, all routes are as follows : `/places/searchPlaceFromQuery`, `/places/searchPlacesNearby`, `/places/getPlaceDetails`.

For more information about some of the routes, refer to the [docs](https://developers.google.com/maps/documentation/places/web-service/op-overview).



### Geting it Running.
Open your command line and install the npm packages using `npm install`. Then, run `node index.js` to start the server. Boom! You the server should be up and running. Just take a note of the port the server is running on, by default, it's 3000.

## Sending requests
Since there is no proper backend, we will send curl requests to the locally hosted server, which will be running on port 3000 by default, change the port number in the following curl commands if there has been a change.

- For `searchPlaceFromQuery`

```bash
curl -X GET -H "Content-Type: application/json" http://localhost:3000/places/querySearch\?queryText\=Burger\&maxResultCount\=2 
```

- For `searchPlacesNearby`

```bash
curl -X GET -H "Content-Type: application/json" http://localhost:3000/places/searchNearby\?latitude\=38.8719\&longitude\=-77.0563\&maxResultCount\=2
```

- For `getPlaceDetails`

```bash
curl -X GET -H "Content-Type: application/json" http://localhost:3000/places/getPlaceDetails\?placeID\=ChIJj61dQgK6j4AR4GeTYWZsKWw\&languageCode\=en
```

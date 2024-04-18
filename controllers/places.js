import axios from 'axios'

export const searchPlaceFromQuery = async (req, res) => {
    try {
        console.log("Query Recieved : ", req.query);
        
        const apiKey = process.env.GOOGLE_PLACES_TEXT_API_KEY;
        const baseURL = process.env.GOOGLE_PLACES_API_BASE_URL;
        const apiURL = `${baseURL}:searchText`;
        
        // Extracting all the valid query params from the request.
        // Helpful in setting default values for params.
        const { 
            queryText,
            fields = ['displayName', 'id', 'formattedAddress'],
            includedType,
            langugeCode,
            locationBias,
            locationRestriction,
            maxResultCount,
            evOptions,
            minRating,
            openNow,
            priceLevels,
            rankPreference,
            regionCode,
            strictTypeFiltering,
        } = req.query;
        
        // Creating the request object to be sent over to Google Places API
        const data = {
            textQuery: queryText,
            ...(includedType        && {includedType:       includedType}),
            ...(langugeCode         && {langugeCode:        langugeCode}),
            ...(locationBias        && {locationBias:       locationBias}),
            ...(locationRestriction && {locationRestriction:locationRestriction}),
            ...(maxResultCount      && {maxResultCount:     maxResultCount}),
            ...(evOptions           && {evOptions:          evOptions}),
            ...(minRating           && {minRating:          minRating}),
            ...(openNow             && {openNow:            openNow}),
            ...(priceLevels         && {priceLevels:        priceLevels}),
            ...(rankPreference      && {rankPreference:     rankPreference}),
            ...(regionCode          && {regionCode:         regionCode}),
            ...(strictTypeFiltering && {strictTypeFiltering:strictTypeFiltering}),
        }

        // Header for the request, as mentioned in the official docs.
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                'X-Goog-Api-Key' : apiKey,
                'X-Goog-FieldMask' : fields.map((field) => `places.${field}`).join(','),
            }
        }
        
        axios.post(apiURL, data, config)
          .then((response) => {
            console.log(response.data);
            res.status(200).json(response.data);
          })
          .catch((error) => {
            console.error('Axios Error:', error.message);
            res.status(500).json({ error: error.message });
          });

    } catch(err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
}

export const searchPlacesNearby = async (req, res) => {
    try {
        console.log(req.query);
        
        const apiKey = process.env.GOOGLE_PLACES_NEARBY_API_KEY;
        const baseURL = process.env.GOOGLE_PLACES_API_BASE_URL;
        const apiURL = `${baseURL}:searchNearby`;
        
        const {
            latitude,
            longitude,
            radius = 5000.0,
            fields = ['displayName'],
            includedTypes,
            includedPrimaryTypes,
            excludedTypes,
            excludedPrimaryTypes,
            languageCode,
            maxResultCount,
            rankPreference,
            regionCode,
        } = req.query;

        const data = {
            locationRestriction: {
                circle :{
                    center:  {
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                    },
                radius: radius,
                },
            },
            ...(includedTypes        && {includedTypes:       includedTypes}),
            ...(includedPrimaryTypes && {includedPrimaryTypes:includedPrimaryTypes}),
            ...(excludedTypes        && {excludedTypes:       excludedTypes}),
            ...(excludedPrimaryTypes && {excludedPrimaryTypes:excludedPrimaryTypes}),
            ...(languageCode         && {languageCode:        languageCode}),
            ...(maxResultCount       && {maxResultCount:      maxResultCount}),
            ...(rankPreference       && {rankPreference:      rankPreference}),
            ...(regionCode           && {regionCode:          regionCode}),
        }

        // Header for the request, as mentioned in the official docs.
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                'X-Goog-Api-Key' : apiKey,
                'X-Goog-FieldMask' : fields.map((field) => `places.${field}`).join(','),
            }
        }
        
        axios.post(apiURL, data, config)
          .then((response) => {
            console.log(response.data);
            res.status(200).json(response.data);
          })
          .catch((error) => {
            console.error('Axios Error:', error.message);
            res.status(500).json({ error: error.message });
          });

    } catch(err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
}

export const getPlaceDetails = async (req, res) => {
    try {
        console.log(req.query);

        const {
            placeID,
            fields = ['displayName', 'id'],
            languageCode,
            regionCode,
            sessionToken,
        } = req.query;
        
        const apiKey = process.env.GOOGLE_PLACES_DETAILS_API_KEY;
        const baseURL = process.env.GOOGLE_PLACES_API_BASE_URL;
        const apiURL = `${baseURL}/${placeID}`;


        const data = {
            ...(languageCode  && {languageCode: languageCode}),
            ...(regionCode    && {regionCode:   regionCode}),
            ...(sessionToken  && {sessionToken: sessionToken}),
        }
        
        // Header for the request, as mentioned in the official docs.
        const config = {
            headers : {
                'X-Goog-Api-Key' : apiKey,
                'X-Goog-FieldMask' : 'id,displayName',
            }
        }
        
        console.log(`API-Key : ${apiKey}`)
        console.log(`API-URL : ${apiURL}`)
        console.log(data)

        // Check if data is truthy, then include it in the request
        const requestOptions = data ? { params: data, ...config } : config;

        axios.get(apiURL, requestOptions)
          .then((response) => {
            console.log(response.data);
            res.status(200).json(response.data);
          })
          .catch((error) => {
            console.error('Axios Error:', error.message);
            res.status(500).json({ error: error.message });
          });

    } catch(err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
}

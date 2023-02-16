import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY ? process.env.REACT_APP_GOOGLE_API_KEY : '');
Geocode.setLanguage('ko');
Geocode.setRegion('es');
Geocode.enableDebug();

const GetCoordinateApi = (
  fullAdress: string,
  setCoordinateHandle: (longitude: number, latitude: number) => void,
) =>
  Geocode.fromAddress(fullAdress).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setCoordinateHandle(lng, lat);
    },
    (error) => {
      console.error(error);
    },
  );

export default GetCoordinateApi;
